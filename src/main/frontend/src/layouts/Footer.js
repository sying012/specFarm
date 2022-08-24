import "../styles/layouts/Footer.css";
import whitelogo1 from "../images/logo_white1.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="innerfooter">
        <img className="footlogo" src={whitelogo1} alt="" />
        <p>© Designed by Spec Farm 2022</p>
      </div>
    </footer>
  );
};

export default Footer;
