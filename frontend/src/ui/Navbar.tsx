import Link from "next/link";

export default async function Navbar() {
  return (
    <header>
      <nav className="navbar navbar-light bg-light px-4">
        <Link href={"/"} className="navbar-brand mb-0 h1">
          HAS
        </Link>
      </nav>
    </header>
  );
}
