import type { User } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import { queryClient } from "./react-query-provider";
import { useLocation, useNavigate } from "react-router";
import { publicRoutes } from "@/lib";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: any) => Promise<void>;
   logout: () => Promise<void>; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();
  const currentPath = useLocation().pathname;
  const isPublicRoute = publicRoutes.includes(currentPath);

  // check is user authenticated

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      const userInfo = localStorage.getItem("user");

      if (userInfo) {
        setUser(JSON.parse(userInfo));
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        if (!isPublicRoute) {
          navigate("/sign-in");
        }
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    const handleLogOut = () => {
      logout();
      navigate("/sign-in");
    };
    window.addEventListener("force-logout", handleLogOut);
    return () => window.removeEventListener("force-logout", handleLogOut)
  })

  const login = async (data: any) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    setUser(data.user);
    setIsAuthenticated(true);
  };
  const logout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setIsAuthenticated(false);
    queryClient.clear();
  };

  const values = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
