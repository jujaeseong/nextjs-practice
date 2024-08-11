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
  CONFIRM_PASSWORD_ERROR,
  USERNAME_DUPLICATE_ERROR,
  EMAIL_DUPLICATE_ERROR,
} from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import getSession from "@/lib/session";

const checkPassword = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;

const formSchema = z
  .object({
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
    confirm_password: z.string().min(PASSWORD_MIN_LENGTH),
  })
  .superRefine(async ({ email }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: EMAIL_DUPLICATE_ERROR,
        path: ["email"],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .superRefine(async ({ username }, ctx) => {
    const user = await db.user.findUnique({
      where: { username },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: USERNAME_DUPLICATE_ERROR,
        path: ["username"],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .refine(checkPassword, {
    message: CONFIRM_PASSWORD_ERROR,
    path: ["confirm_password"],
  });

export async function createAccount(prevState: any, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };
  const result = await formSchema.spa(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });

    const session = await getSession();
    session.id = user.id;
    await session.save();
    redirect("/profile");
  }
}
