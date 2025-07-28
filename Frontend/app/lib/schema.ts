import { z } from "zod";

export const signInSchema = z.object({
    email: z.string().email("invalid email address"),
    password: z.string().min(6, "password is required"),
});