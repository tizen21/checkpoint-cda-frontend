import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import NavBar from "./NavBar";

export function PageLayout() {
  return (
    <body>
      <Header />
      <NavBar />
      <main>
        <Outlet />
      </main>
    </body>
  );
}
