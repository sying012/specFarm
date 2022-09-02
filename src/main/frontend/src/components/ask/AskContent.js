import React from "react";
import AskListItem from "./AskListItem";
import searchIcon from "../../images/loupe.png";
import { useRef } from "react";
import { NavLink } from "react-router-dom";
import Pagenation from "./Pagenation";
import { Button, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

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
            <TextField
              id="outlined-search"
              type="search"
              InputProps={{
                startAdornment: <SearchIcon color="action" />,
                styles: { fontFamily: "Hahmlet" },
              }}
              size="small"
            ></TextField>
          </form>
          <form id="certSearchBar" action="">
            <input
              id="searchCert"
              type="text"
              name="searchCert"
              onFocus={showCertList}
              onBlur={() => (certList.current.style.display = "none")}
              autoComplete="off"
              placeholder="자격증 검색"
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
        <Button
          className="askRegButton"
          variant="outlined"
          onClick={() => (window.location = "./ask/write")}
        >
          글쓰기
        </Button>
      </div>
      <div id="askList" style={{ marginTop: "20px" }}>
        {asks.map((ask) => (
          <NavLink key={ask.id} to={`/community/ask/${ask.id}`}>
            <AskListItem ask={ask}></AskListItem>
          </NavLink>
        ))}
      </div>
      <Pagenation></Pagenation>
    </div>
  );
};

export default AskContent;
