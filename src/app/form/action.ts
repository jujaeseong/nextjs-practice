"use server";

import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  USERNAME_MIN_LENGTH,
  EMAIL_DOMAIN,
  EMAIL_DOMAIN_ERROR,
  USERNAME_MIN_LENGTH_ERROR,
  PASSWORD_MIN_LENGTH_ERROR,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";
import { z } from "zod";

const formSchema = z.object({
  email: z
    .string()
    .email()
    .refine((email) => email.endsWith(EMAIL_DOMAIN), EMAIL_DOMAIN_ERROR),
  username: z
    .string()
    .trim()
    .min(USERNAME_MIN_LENGTH, USERNAME_MIN_LENGTH_ERROR),
  password: z
    .string()
    .min(PASSWORD_MIN_LENGTH, PASSWORD_MIN_LENGTH_ERROR)
    .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

export async function handleForm(previousState: any, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };
  const result = formSchema.safeParse(data);
  if (!result.success) {
    return {
      isValidate: false,
      errors: result.error.flatten(),
    };
  } else {
    return {
      isValidate: true,
      error: [],
    };
  }
}
