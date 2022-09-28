import {
  Box,
  Button,
  createTheme,
  MobileStepper,
  Tab,
  Tabs,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "../../styles/home/Home.module.css";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import axios from "axios";
import { API_BASE_URL } from "../../app-config";
import { Link } from "react-router-dom";

// mui theme
const buttonTheme = createTheme({
  palette: {
    green: {
      main: "#8cbf75",
    },
  },
});

const Plan = () => {
  let isUser = !!sessionStorage.getItem("ACCESS_TOKEN");
  const [regList, setRegList] = useState([]);
  const [examList, setExamList] = useState([]);
  const [data, setData] = useState([]);
  const [value, setValue] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    axios({
      method: "get",
      url: API_BASE_URL + "/user/getCertPlan",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("ACCESS_TOKEN"),
      },
    }).then((response) => {
      console.log(response.data.regList);
      setRegList(response.data.regList);
      setExamList(response.data.examList);
      setData(response.data.regList.slice(0, 3));
      setValue(0);
    });
  }, [isUser]);

  useEffect(() => {
    setActiveStep(0);
    if (value === 0) {
      setData(regList.slice(0, 3));
    } else {
      setData(examList.slice(0, 3));
    }
  }, [value]);

  // tab content
  function TabPanel(props) {
    const { children, value, index, dataList, ...other } = props;
    const theme = useTheme();
    const LAST_STEP =
      dataList.length % 3 === 0
        ? parseInt(dataList.length / 3)
        : parseInt(dataList.length / 3) + 1;

    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      handleData(activeStep + 1);
    };

    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
      handleData(activeStep - 1);
    };

    const handleData = (step) => {
      if (dataList.length !== 0) {
        setData(dataList.slice(3 * step, 3 * step + 3));
      } else {
        setData([]);
      }
    };

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ pr: 2.5, pt: 2, pl: 2.5, pb: 1 }}>
            <div
              style={{
                height: "250px",
              }}
            >
              {children}
            </div>
            <MobileStepper
              variant="dots"
              steps={LAST_STEP}
              position="static"
              activeStep={activeStep}
              sx={{
                maxWidth: 500,
                flexGrow: 1,
                background: "none",
                "& .MuiMobileStepper-dotActive": {
                  backgroundColor: "#8cbf75",
                },
              }}
              nextButton={
                <Button
                  size="small"
                  onClick={handleNext}
                  disabled={LAST_STEP === 0 || activeStep === LAST_STEP - 1}
                  theme={buttonTheme}
                  color="green"
                >
                  Next
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                  ) : (
                    <KeyboardArrowRight />
                  )}
                </Button>
              }
              backButton={
                <Button
                  size="small"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                  theme={buttonTheme}
                  color="green"
                >
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowRight theme={theme} color="green" />
                  ) : (
                    <KeyboardArrowLeft theme={theme} color="green" />
                  )}
                  Back
                </Button>
              }
            />
          </Box>
        )}
      </div>
    );
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className={styles.certPlan}>
        <p className={styles.certPlanTitle}>수확 일정</p>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="inherit"
              TabIndicatorProps={{
                style: {
                  background: "rgb(140, 191, 117)",
                },
              }}
              aria-label="cert plan"
              variant="fullWidth"
              sx={{
                "& button": {
                  background: "rgba(140, 191, 117, 0.5)",
                },
              }}
            >
              <Tab
                label="접수 일정"
                sx={{
                  borderTopLeftRadius: "10px",
                }}
              />
              <Tab
                label="시험 일정"
                sx={{
                  borderTopRightRadius: "10px",
                }}
              />
            </Tabs>
          </Box>
          <TabPanel
            value={value}
            index={0}
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              borderBottomLeftRadius: "10px",
              borderBottomRightRadius: "10px",
            }}
            dataList={regList}
          >
            {data &&
              data.map((reg) => (
                <Link
                  key={reg.idx}
                  to={reg.jmcd === null ? `/` : `/cert/certFind/${reg.jmcd}`}
                >
                  <p className={styles.certPlanP}>
                    {isUser
                      ? reg.implplannm &&
                        reg.implplannm.substr(0, 5) +
                          reg.implplannm.substr(12, 16)
                      : reg.implplannm}{" "}
                    {reg.jmfldnm}
                    <br />
                    <span style={{ fontSize: "14px" }}>
                      {reg.category} :
                      {reg.startDate &&
                        reg.startDate.replace(
                          /(\d{4})(\d{2})(\d{2})/,
                          " $1.$2.$3 "
                        )}
                      ~
                      {reg.endDate &&
                        reg.endDate.replace(
                          /(\d{4})(\d{2})(\d{2})/,
                          " $1.$2.$3 "
                        )}
                    </span>
                  </p>
                </Link>
              ))}
          </TabPanel>
          <TabPanel
            value={value}
            index={1}
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              borderBottomLeftRadius: "10px",
              borderBottomRightRadius: "10px",
            }}
            dataList={examList}
          >
            {data &&
              data.map((exam) => (
                <Link
                  key={exam.idx}
                  to={exam.jmcd === null ? `/` : `/cert/certFind/${exam.jmcd}`}
                >
                  <p key={exam.idx} className={styles.certPlanP}>
                    {isUser
                      ? exam.implplannm &&
                        exam.implplannm.substr(0, 5) +
                          exam.implplannm.substr(12, 16)
                      : exam.implplannm}{" "}
                    {exam.jmfldnm}
                    <br />
                    <span style={{ fontSize: "14px" }}>
                      {exam.category} :
                      {exam.startDate &&
                        exam.startDate.replace(
                          /(\d{4})(\d{2})(\d{2})/,
                          " $1.$2.$3 "
                        )}
                      {exam.category === "실기시험"
                        ? exam.endDate &&
                          exam.endDate.replace(
                            /(\d{4})(\d{2})(\d{2})/,
                            "~ $1.$2.$3 "
                          )
                        : ""}
                    </span>
                  </p>
                </Link>
              ))}
          </TabPanel>
        </Box>
      </div>
    </>
  );
};

export default Plan;
