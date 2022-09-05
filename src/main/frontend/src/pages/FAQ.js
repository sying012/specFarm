import {
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

const FAQ = () => {
  const theme = createTheme({
    typography: {
      fontFamily: ["Pretendard-Regular"],
    },
  });

  return (
    <div>
      <div className="titleContainer">
        <div className="titlewrap">마을소식</div>
        <div className="subtitlewrap">자주 묻는 질문🤷‍♀️</div>
      </div>
      <div className={styles.faqcontainer}>
        <div className={styles.searchFieldWrapper}>
          <form>
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
          </form>
        </div>
        <div className={styles.accordionContainer}>
          <div className={styles.accordionHead}></div>
          <ThemeProvider theme={theme}>
            <FaqAccordion></FaqAccordion>
          </ThemeProvider>
        </div>
        <div className={styles.pageNation}>
          <Stack spacing={2}>
            <Pagination count={10} />
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
