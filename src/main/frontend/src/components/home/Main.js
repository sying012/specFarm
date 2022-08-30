import {
  Box,
  Container,
  createTheme,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React from "react";
import logo from "../../images/logo_white1.png";
import styles from "../../styles/home/home.module.css";

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
          <Typography>{children}</Typography>
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
        <Container>
          <div className={styles.homeHeader}>
            <div className={styles.homeHeaderDiv}>
              <a href="/">
                <img src={logo} className={styles.homeLogo} alt="" />
              </a>
              <div>
                <div className={styles.tailwrap}>
                  <div className="loginbtn">
                    <a href="/login">로그인</a>
                  </div>
                  <div className="joinbtn">
                    <a href="/join">회원가입</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
                    <Tab label="접수 일정" {...a11yProps(0)} />
                    <Tab label="시험 일정" {...a11yProps(1)} />
                  </Tabs>
                </Box>
                <TabPanel
                  value={value}
                  index={0}
                  style={{ background: "rgba(255, 255, 255, 0.05)" }}
                >
                  <div className={styles.certPlanDiv}>
                    2022년 제 32회 정수시설운영관리사 1,2차 동시
                    <br />
                    접수 : 2022.08.29 ~ 2022.09.02
                  </div>
                  <div className={styles.certPlanDiv}>
                    2022년 제 32회 정수시설운영관리사 1,2차 동시
                    <br />
                    접수 : 2022.08.29 ~ 2022.09.02
                  </div>
                  <div className={styles.certPlanDiv}>
                    2022년 제 32회 정수시설운영관리사 1,2차 동시
                    <br />
                    접수 : 2022.08.29 ~ 2022.09.02
                  </div>
                </TabPanel>
                <TabPanel
                  value={value}
                  index={1}
                  style={{ background: "rgba(255, 255, 255, 0.05)" }}
                >
                  <div className={styles.certPlanDiv}>
                    2022년 제 32회 정수시설운영관리사 1,2차 동시
                    <br />
                    시험 : 2022.08.29 ~ 2022.09.02
                  </div>
                  <div className={styles.certPlanDiv}>
                    2022년 제 32회 정수시설운영관리사 1,2차 동시
                    <br />
                    시험 : 2022.08.29 ~ 2022.09.02
                  </div>
                  <div className={styles.certPlanDiv}>
                    2022년 제 32회 정수시설운영관리사 1,2차 동시
                    <br />
                    시험 : 2022.08.29 ~ 2022.09.02
                  </div>
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
