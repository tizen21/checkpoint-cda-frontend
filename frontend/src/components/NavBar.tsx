import { Link, useLocation } from "react-router-dom";

export default function NavBar() {
  const { pathname } = useLocation();

  const linkClass = (path: string) =>
    `px-3 py-2 rounded hover:bg-red-100 ${
      pathname === path ? "bg-red-200 font-semibold" : ""
    }`;

  return (
    <nav className="shadow mb- flex justify-center items-center gap-4">
      <div className="mx-auto px-4 py-2 flex justify-center items-center gap-4">
        <Link to="/" className={linkClass("/")}>
          Home
        </Link>
        <Link to="/add" className={linkClass("/add")}>
          Add Country
        </Link>
      </div>
    </nav>
  );
}
