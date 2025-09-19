import { z } from "zod";

import { AUTH_LOGIN_TEXT } from "@/features/login-form/text";

export const LoginSchema = z.object({
  id: z.string().trim().min(3, AUTH_LOGIN_TEXT.vaildate.id),
  password: z.string().min(8, AUTH_LOGIN_TEXT.vaildate.pw),
});

export type LoginInput = z.infer<typeof LoginSchema>;
