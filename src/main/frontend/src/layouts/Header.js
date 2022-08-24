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
      <div className="innerheader">
        <img className="whitelogo1" src={whitelogo1} alt="" />
        <nav className="catwrap">
          <div>
            <a href="/cert">자격증 찾기</a>
          </div>
          <div style={{ marginLeft: "10px" }}>
            <a href="/seminar">세미나</a>
          </div>
          <div>
            <a href="/community">마을회관</a>
          </div>
          <div>
            <a href="/notice">공지사항</a>
          </div>
        </nav>
        <div className="tailwrap">
          <div>
            <a href="/login">로그인</a>
          </div>
          <div>
            <a href="/join">회원가입</a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
