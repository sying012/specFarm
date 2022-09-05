import Header from "./Header";
import Footer from "./Footer";
import "../styles/layouts/Layout.css";
import { Outlet } from "react-router";
import { useBeforeRender } from "../utils";

const Layout = () => {
  useBeforeRender(() => {
    window.scrollTo({ top: 0 });
    document.getElementsByTagName("body")[0].style.overflowY = "auto";
  }, []);

  return (
    <div className="layout">
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
