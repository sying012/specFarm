import React from "react";
import AskListItem from "./AskListItem";
import searchIcon from "../../images/loupe.png";
import { useRef } from "react";

const AskContent = ({ asks }) => {
  const certList = useRef();

  const showCertList = () => {
    certList.current.style.display = "block";
  };
  return (
    <div id="container">
      <div id="boardTop">
        <div id="searchBar">
          <form id="keywordSearchBar" action="">
            <input type="text" name="searchKeyword" />
            <button id="search" type="submit">
              <img src={searchIcon} alt="" style={{ width: "100%" }} />
            </button>
          </form>
          <form id="certSearchBar" action="">
            <input
              id="searchCert"
              type="text"
              name="searchCert"
              onFocus={showCertList}
              onBlur={() => (certList.current.style.display = "none")}
              autoComplete="off"
            />
            <div id="selectCert" ref={certList}>
              <ul>
                <li>정보처리기사</li>
                <li>기계설계기사</li>
                <li>용접기능사</li>
                <li>용접기능사</li>
              </ul>
            </div>
          </form>
        </div>
        <button type="button" onClick={() => (window.location = "./ask/write")}>
          글쓰기
        </button>
      </div>
      <div id="askList" style={{ marginTop: "20px" }}>
        {asks.map((ask) => (
          <AskListItem key={ask.id} ask={ask}></AskListItem>
        ))}
      </div>
      <div id="pagenation">
        <button type="button" className="page">
          ↑
        </button>
        <button type="button" className="page active">
          1
        </button>
        <button type="button" className="page">
          2
        </button>
        <button type="button" className="page">
          3
        </button>
        <button type="button" className="page">
          4
        </button>
        <button type="button" className="page">
          ↓
        </button>
      </div>
    </div>
  );
};

export default AskContent;
