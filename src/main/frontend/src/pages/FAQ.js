import { Button, createTheme, ThemeProvider } from "@mui/material";
import React from "react";
import styles from "../styles/faq/FAQ.module.css";
import FaqAccordion from "../components/faq/FaqAccordion";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { NavLink } from "react-router-dom";

const FAQ = () => {
  const theme = createTheme({
    typography: {
      fontFamily: ["Pretendard-Regular"],
    },
    palette: {
      green: {
        main: "#8cbf75",
        contrastText: "#fff",
      },
    },
  });

  return (
    <div>
      <div className="titleContainer">
        <div className="titlewrap">마을소식</div>
        <NavigateNextIcon style={{ margin: "auto 5px" }} />
        <NavLink to="/cs/faq">
          <div className="subtitlewrap">자주묻는질문</div>
        </NavLink>
      </div>
      <div className={styles.faqcontainer}>
        <div className={styles.searchFieldWrapper}>
          <Button
            theme={theme}
            color="green"
            variant="contained"
            onClick={() => (window.location = "./help")}
          >
            1:1 문의 작성
          </Button>
        </div>
        <div className={styles.accordionContainer}>
          <div className={styles.accordionHead}></div>
          <ThemeProvider theme={theme}>
            <FaqAccordion></FaqAccordion>
          </ThemeProvider>
        </div>
        <div className={styles.pageNation}>
          {/* <Stack spacing={2}>
            <Pagination count={10} />
          </Stack> */}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
