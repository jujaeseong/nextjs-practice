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
  EMAIL_NOT_FOUND_ERROR,
  INCORRECT_PASSWORD_ERROR,
} from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

const checkEmailExists = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return Boolean(user);
};

const formSchema = z.object({
  email: z
    .string()
    .email()
    .refine((email) => email.endsWith(EMAIL_DOMAIN), EMAIL_DOMAIN_ERROR)
    .refine(checkEmailExists, EMAIL_NOT_FOUND_ERROR),
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
  const result = await formSchema.spa(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });
    const ok = await bcrypt.compare(result.data.password, user!.password);
    if (ok) {
      const session = await getSession();
      session.id = user!.id;
      await session.save();
      redirect("/profile");
    } else {
      return {
        fieldErrors: {
          password: [INCORRECT_PASSWORD_ERROR],
          email: [],
          username: [],
        },
      };
    }
  }
}
