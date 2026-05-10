"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import z from "zod";

const DoctorSchema = z.object({
  qualification: z
    .string({ error: "Qualification is required" })
    .min(2, "Qualification has to be atleast two characters")
    .max(6, "Qualification has to be atmost 6 characters"),
  specialization: z
    .string({ error: "Specialization is required" })
    .min(3, "Specialization has to be atleast three characters")
    .max(127, "Specialization too long"),
  medicalLicenseNumber: z
    .string({ error: "Medical License Number is required" })
    .min(4, "Invalid Medical License Number")
    .max(127, "Medical License Number too long"),
});

type DoctorRegStateAction = {
  message?: string | null;
  values?: {
    qualification: string;
    specialization: string;
    medicalLicenseNumber: string;
  };
  error?: {
    errors: string[];
    properties?: {
      qualification?: { errors: string[] };
      specialization?: { errors: string[] };
      medicalLicenseNumber?: { errors: string[] };
    };
  };
};

export async function DoctorRegister(
  _prevState: DoctorRegStateAction,
  formData: FormData,
): Promise<DoctorRegStateAction> {
  const validatedFields = DoctorSchema.safeParse({
    qualification: formData.get("qualification"),
    specialization: formData.get("specialization"),
    medicalLicenseNumber: formData.get("medical-license-number"),
  });

  if (!validatedFields.success)
    return {
      message: "failed",
      values: {
        qualification: formData.get("qualification") as string,
        specialization: formData.get("specialization") as string,
        medicalLicenseNumber: formData.get("medical-license-number") as string,
      },
      error: z.treeifyError(validatedFields.error),
    };

  const cookieJar = await cookies();
  const jwt = cookieJar.get("access_token")!.value;
  const userId = JSON.parse(atob(jwt.split(".")[1])).sub;
  const docRegRes = await fetch(`http://localhost:8080/api/doctor/register`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({
      userId: parseInt(userId),
      qualification: formData.get("qualification") as string,
      specialization: formData.get("specialization") as string,
      medicalLicenseNumber: formData.get("medical-license-number") as string,
    }),
  });

  if (!docRegRes.ok)
    return {
      message: "failed",
      error: {
        errors: ["Something went wrong, please try again in a few minutes!"],
      },
    };

  const newJwt = await fetch(
    `http://localhost:8080/api/user/refresh-token/${userId}`,
    { headers: { Authorization: `Bearer ${jwt}` } },
  ).then((res) => res.text());

  console.log({ newJwt });

  const jwtPayload = JSON.parse(atob(newJwt.split(".")[1]));

  cookieJar.set("access_token", newJwt, {
    httpOnly: true,
    sameSite: "strict",
    expires: jwtPayload.exp * 1000,
  });

  redirect("/doctor/dashboard");
}
