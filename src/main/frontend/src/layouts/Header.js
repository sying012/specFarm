import "../styles/layouts/Header.css";
import whitelogo1 from "../images/logo_white1.png";

import { makeStyles } from "@material-ui/core";

import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const useStyles = makeStyles({
  home: {
    backgroundColor: "black",
    color: "white",
  },
});

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const classes = useStyles();

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
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            Dashboard
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            className={classes.home}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
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
