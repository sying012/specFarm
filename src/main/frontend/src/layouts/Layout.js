import Header from "./Header";
import Footer from "./Footer";
import "../styles/layouts/Layout.css";
import { Outlet } from "react-router";

const Layout = (props) => {
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
