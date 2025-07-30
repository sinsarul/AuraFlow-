import type { User } from "@/types";
import { createContext } from "react"

interface AuthContextType {
    user: User | null ;
   
}