import {
  Button,
  createTheme,
  Pagination,
  Stack,
  TextField,
  ThemeProvider,
} from "@mui/material";
import React from "react";
import styles from "../styles/faq/FAQ.module.css";
import SearchIcon from "@mui/icons-material/Search";
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
    <div style={{ padding: "0 20px" }}>
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
          {/* <form>
            <ThemeProvider theme={theme}>
              <TextField
                id="studySearch"
                type="search"
                InputProps={{
                  startAdornment: <SearchIcon color="inherit" />,
                }}
                size="small"
                style={{ width: "300px" }}
                fontFamily="Pretendard-Regular"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#8cbf75",
                    },
                  },
                }}
              ></TextField>
            </ThemeProvider>
          </form> */}
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
