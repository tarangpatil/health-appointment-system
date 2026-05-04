import Navbar from "@/ui/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar />
      <main
        className="container d-flex flex-column justify-content-center align-items-center text-center"
        style={{ minHeight: "75vh" }}
      >
        <h1 className="display-3 fw-bold mb-3 ">
          Smart health
          <br />
          appointment system
        </h1>

        <p className="lead mb-5">See your doctor like you've never before</p>

        <div className="d-flex gap-3 mb-5">
          <Link
            href="/user/register?next=/doctor/register"
            className="btn btn-primary btn-lg"
          >
            Register as Doctor
          </Link>

          <Link
            href="/user/register?next=/patient/"
            className="btn btn-outline-secondary btn-lg"
          >
            Sign up as Patient
          </Link>
        </div>
        <div className="d-flex flex-column gap-3">
          <p className="lead mb-0">Already have an account?</p>
          <Link href="/user/login" className="btn btn-outline-success btn-lg">
            Click here to login
          </Link>
        </div>
      </main>
    </>
  );
}
