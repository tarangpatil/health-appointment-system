import Navbar from "@/ui/Navbar";
import RegistrationForm from "./RegistrationForm";

type Props = {
  searchParams: Promise<{ next: string }>;
};

export default async function Register({ searchParams }: Props) {
  const { next } = await searchParams;
  return (
    <>
      <Navbar />
      <main className="container" style={{ minHeight: "50vh" }}>
        <h3 className="text-center my-5">
          Give your clinic a boost <br />
          by registering yourself on SHAS
        </h3>
        <RegistrationForm next={next} />
      </main>
    </>
  );
}
