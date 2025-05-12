import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="header flex flex-col bg-red-400 text-white p-12 justify-center items-center gap-8 w-full">
      <h1 className="text-4xl font-bold text-center">Checkpoint : frontend</h1>
      <Link to="/" className="text-3xl">
        Countries
      </Link>
    </header>
  );
}
