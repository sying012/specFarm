import {
  Box,
  Container,
  createTheme,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import logo from "../../images/logo_white1.png";
import styles from "../../styles/home/home.module.css";
import whitelogo1 from "../../images/logo_white1.png";

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    green: {
      main: "rgb(159, 182, 72)",
      contrastText: "#fff",
    },
    brown: {
      main: "rgb(107, 83, 67)",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: [
      "Hahmlet",
      "Segoe UI",
      "Roboto",
      "Oxygen",
      "Ubuntu",
      "Cantarell",
      "Fira Sans",
      "Droid Sans",
      "Helvetica Neue",
    ].join(","),
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Main = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className={styles.homeBackground}>
        <header
          className="header"
          style={{ background: "none", position: "fixed" }}
        >
          <div className="innerheader">
            <a href="/">
              <img className="whitelogo1" src={whitelogo1} alt="logo" />
            </a>
            <div className="tailwrap">
              <div className="loginbtn">
                <a href="/login">로그인</a>
              </div>
              <div className="joinbtn">
                <a href="/join">회원가입</a>
              </div>
            </div>
          </div>
        </header>
        <Container>
          {/* <div style={{ padding: "70px" }}>
            <Stack spacing={1} sx={{ width: "100%" }}>
              <Alert severity="error">
                This is an error alert — check it out!
              </Alert>
              <Alert severity="error">
                This is an error alert — check it out!
              </Alert>
            </Stack>
          </div> */}
          <div className={styles.homeContent}>
            <div>
              <p className={styles.subTitle}>
                자격증을 취득하여,
                <br />
                여러분의 스펙Farm을 완성하세요.
              </p>
              <p className={styles.contentText}>
                혼자는 물론, 목표가 같은 동료 농부들과 함께
                <br />
                자격증 취득의 즐거움을 느낄 수 있습니다.
              </p>
            </div>
            <div className={styles.certPlan}>
              <p className={styles.certPlanTitle}>수확 일정</p>
              <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor="inherit"
                    TabIndicatorProps={{
                      style: { background: "rgb(159, 182, 72)" },
                    }}
                    aria-label="cert plan"
                    variant="fullWidth"
                    sx={{
                      "& button": { background: "rgba(159, 182, 72, 0.5)" },
                    }}
                  >
                    <Tab label="접수 일정" {...a11yProps(0)} theme={theme} />
                    <Tab label="시험 일정" {...a11yProps(1)} theme={theme} />
                  </Tabs>
                </Box>
                <TabPanel
                  value={value}
                  index={0}
                  style={{ background: "rgba(255, 255, 255, 0.05)" }}
                >
                  <p className={styles.certPlanP}>
                    2022년 제 32회 정수시설운영관리사 1,2차 동시
                    <br />
                    접수 : 2022.08.29 ~ 2022.09.02
                  </p>
                  <p className={styles.certPlanP}>
                    2022년 제 32회 정수시설운영관리사 1,2차 동시
                    <br />
                    접수 : 2022.08.29 ~ 2022.09.02
                  </p>
                  <p className={styles.certPlanP}>
                    2022년 제 32회 정수시설운영관리사 1,2차 동시
                    <br />
                    접수 : 2022.08.29 ~ 2022.09.02
                  </p>
                </TabPanel>
                <TabPanel
                  value={value}
                  index={1}
                  style={{ background: "rgba(255, 255, 255, 0.05)" }}
                >
                  <p className={styles.certPlanP}>
                    2022년 제 32회 정수시설운영관리사 1,2차 동시
                    <br />
                    시험 : 2022.08.29 ~ 2022.09.02
                  </p>
                  <p className={styles.certPlanP}>
                    2022년 제 32회 정수시설운영관리사 1,2차 동시
                    <br />
                    시험 : 2022.08.29 ~ 2022.09.02
                  </p>
                  <p className={styles.certPlanP}>
                    2022년 제 32회 정수시설운영관리사 1,2차 동시
                    <br />
                    시험 : 2022.08.29 ~ 2022.09.02
                  </p>
                </TabPanel>
              </Box>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Main;
