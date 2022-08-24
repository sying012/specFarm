import "../styles/layouts/Header.css";
import whitelogo1 from "../images/logo_white1.png";
import { useNavigate } from "react-router";

const Header = () => {
  // const navigate = useNavigate();

  // const goCertMain = () => {
  //   navigate("/SearchCert");
  // };

  // const goSeminarMain = () => {
  //   navigate("/SearchCert");
  // };

  // const go = () => {
  //   navigate("/SearchCert");
  // };

  // const toSearchCert = () => {
  //   navigate("/SearchCert");
  // };

  return (
    <header className="header">
      <img className="whitelogo1" src={whitelogo1} alt="" />
      <nav>
        <p>자격증 찾기</p>
        <p>세미나</p>
        <p>마을회관</p>
        <p>공지사항</p>
      </nav>
      <div>
        <p>로그인</p>
        <p>회원가입</p>
      </div>
    </header>
  );
};

export default Header;
