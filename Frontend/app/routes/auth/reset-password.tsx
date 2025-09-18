import { resetPasswordSchema } from "@/lib/schema";
import {z} from "zod";
import React from "react";

type ResetPasswordFromData = z.infer<typeof resetPasswordSchema>;

function ResetPassword = () => {
  return <div>ResetPassword</div>;
};

export default ResetPassword;
