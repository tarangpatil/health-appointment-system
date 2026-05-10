import Navbar from "@/ui/Navbar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DoctorRegForm from "./DoctorRegForm";

type Props = {};

export default async function DoctorRegister({}: Props) {
  const cookieJar = await cookies();
  if (!cookieJar.get("access_token")?.value) redirect("/user/register");
  const jwt = cookieJar.get("access_token")?.value;

  const jwtPayload = JSON.parse(atob(jwt!.split(".")[1]));

  return (
    <>
      <Navbar />
      <main className="container my-4" style={{ minHeight: "50vh" }}>
        <h1 className="mb-2">
          Hey, <span>Dr.</span>
          &nbsp;
          <em>
            {jwtPayload.firstName} {jwtPayload.lastName || ""}
          </em>
        </h1>
        <p>Fill the rest of your details to get started</p>
        <DoctorRegForm {...{ ...jwtPayload, userId: jwtPayload.sub }} />
      </main>
    </>
  );
}
