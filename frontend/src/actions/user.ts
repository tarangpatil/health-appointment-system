"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import z from "zod";

const UserSchema = z
  .object({
    firstName: z
      .string({ error: "First name is required" })
      .min(1, "First name is required")
      .max(127, "Name too long"),
    email: z.email({ error: "Email required" }),
    password: z
      .string({ error: "Password required" })
      .min(8, "Password too small")
      .max(64, "Password longer than 64 characters")
      .regex(/[A-Z]/, "Password must contain one uppercase letter")
      .regex(/[a-z]/, "Password must contain one lowercase letter")
      .regex(/[0-9]/, "Password must contain one numeric digit"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // 👈 attaches error to this field
  });

export type UserActionState = {
  message?: string | null;
  values?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  };
  error?: {
    errors: string[];
    properties?: {
      firstName?: {
        errors: string[];
      };
      email?: {
        errors: string[];
      };
      password?: {
        errors: string[];
      };
      confirmPassword?: {
        errors: string[];
      };
    };
  };
};

export default async function registerUser(
  _prevState: UserActionState,
  formData: FormData,
): Promise<UserActionState> {
  const validatedFields = UserSchema.safeParse({
    firstName: formData.get("first-name"),
    lastName: formData.get("last-name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirm-password"),
  });
  if (!validatedFields.success) {
    return {
      message: "failed",
      error: z.treeifyError(validatedFields.error),
      values: {
        firstName: formData.get("first-name") as string,
        lastName: formData.get("last-name") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        confirmPassword: formData.get("confirm-password") as string,
      },
    };
  }
  const registerResponse = await fetch(
    "http://localhost:8080/api/user/register",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: formData.get("first-name") as string,
        lastName: formData.get("last-name") as string,
        email: formData.get("email") as string,
        passwordHash: formData.get("password") as string,
      }),
      cache: "no-store",
    },
  );
  if (!registerResponse.ok)
    return {
      message: "failed",
      error: {
        errors: ["Failed to register, please try again later"],
      },
      values: {
        firstName: formData.get("first-name") as string,
        lastName: formData.get("last-name") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        confirmPassword: formData.get("confirm-password") as string,
      },
    };
  const loginResponse = await fetch("http://localhost:8080/api/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName: formData.get("first-name") as string,
      lastName: formData.get("last-name") as string,
      email: formData.get("email") as string,
      passwordHash: formData.get("password") as string,
    }),
    cache: "no-store",
  });
  if (!loginResponse.ok) redirect("/user/login");
  const jwt = await loginResponse.text();

  const jwtPayload = JSON.parse(atob(jwt.split(".")[1]));

  const cookieJar = await cookies();
  cookieJar.set("access_token", jwt, {
    httpOnly: true,
    sameSite: "strict",
    expires: jwtPayload.exp * 1000,
  });

  redirect(
    formData.get("next")
      ? (formData.get("next") as string)
      : "/patient/register",
  );
}
