import { z } from "zod";

import { AUTH_SIGNUP_ERROR } from "@/features/signup-form/text";
const userIdRegex = /^[a-zA-Z0-9._-]+$/;

export const SignupSchema = z
  .object({
    email: z.string().trim().email(AUTH_SIGNUP_ERROR.email),
    userId: z
      .string()
      .trim()
      .min(3, AUTH_SIGNUP_ERROR.userId.min)
      .max(20, AUTH_SIGNUP_ERROR.userId.max)
      .regex(userIdRegex, AUTH_SIGNUP_ERROR.userId.regex),
    password: z
      .string()
      .min(8, AUTH_SIGNUP_ERROR.password.min)
      .regex(/[A-Za-z]/, AUTH_SIGNUP_ERROR.password.alpha)
      .regex(/[0-9]/, AUTH_SIGNUP_ERROR.password.number)
      .regex(/[^A-Za-z0-9]/, AUTH_SIGNUP_ERROR.password.special),
    passwordConfirm: z.string().min(1, AUTH_SIGNUP_ERROR.passwordConfirm.required),
  })
  .superRefine(({ password, passwordConfirm }, ctx) => {
    if (password !== passwordConfirm) {
      ctx.addIssue({
        code: "custom",
        path: ["passwordConfirm"],
        message: AUTH_SIGNUP_ERROR.passwordConfirm.notMatch,
      });
    }
  });

export type SignupInput = z.infer<typeof SignupSchema>;
