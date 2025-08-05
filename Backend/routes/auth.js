import bodyParser from "body-parser";
import express from "express";

import { z } from "zod";
import { validateRequest } from "zod-express-middleware";
import { loginSchema, registerSchema, verificationSchema } from "../libs/validate.schema.js";
import { loginUser, registerUser, verifyEmail } from "../controllers/auth-controller.js";


const router = express.Router();

router.post(
  "/register",
  validateRequest({
    body: registerSchema,
  }),
  registerUser
);
router.post(
  "/login",
  validateRequest({
    body: loginSchema,
  }),
  loginUser
);

router.post(
  "/verify-email",
  validateRequest({
    body: verificationSchema
  }),
  verifyEmail
)

export default router;
