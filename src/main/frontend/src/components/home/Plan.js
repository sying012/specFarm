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

// mui theme
const buttonTheme = createTheme({
  palette: {
    green: {
      main: "#8cbf75",
    },
  },
});

const Plan = ({ favCertList }) => {
  let isUser = !!sessionStorage.getItem("ACCESS_TOKEN");
  const [tests, setTests] = useState([]);
  const [data, setData] = useState([]);
  const [value, setValue] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    axios({
      method: "get",
      url: API_BASE_URL + "/user/getFavCert",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("ACCESS_TOKEN"),
      },
    }).then((response) => {
      setTests(response.data);
      setData(response.data.slice(0, 3));
    });
  }, [isUser]);

  useEffect(() => {
    setActiveStep(0);
    setData(tests.slice(0, 3));
  }, [value]);

  // tab content
  function TabPanel(props) {
    const { children, value, index, ...other } = props;
    const theme = useTheme();
    const LAST_STEP =
      tests.length % 3 === 0
        ? parseInt(tests.length / 3)
        : parseInt(tests.length / 3) + 1;

    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      handleData(activeStep + 1);
    };

    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
      handleData(activeStep - 1);
    };

    const handleData = (step) => {
      if (tests.length !== 0) {
        setData(tests.slice(3 * step, 3 * step + 3));
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
          <Box sx={{ pr: 2.5, pt: 1, pl: 2.5, pb: 1 }}>
            <div
              style={{
                height: "240px",
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
          >
            {data &&
              data.map((accept) => (
                <p key={accept.certTestIdx} className={styles.certPlanP}>
                  {accept.implplannm} {accept.certName}
                  <br />
                  <span style={{ fontSize: "14px" }}>
                    접수 :
                    {accept.docregstartdt &&
                      accept.docregstartdt.replace(
                        /(\d{4})(\d{2})(\d{2})/,
                        " $1.$2.$3 "
                      )}
                    ~
                    {accept.docregenddt &&
                      accept.docregenddt.replace(
                        /(\d{4})(\d{2})(\d{2})/,
                        " $1.$2.$3 "
                      )}
                  </span>
                </p>
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
          >
            {data &&
              data.map((test) => (
                <p key={test.certTestIdx} className={styles.certPlanP}>
                  {test.implplannm} {test.certName}
                  <br />
                  <span style={{ fontSize: "14px" }}>
                    필기 :
                    {test.docregstartdt &&
                      test.docregstartdt.replace(
                        /(\d{4})(\d{2})(\d{2})/,
                        " $1.$2.$3 "
                      )}
                    ~
                    {test.docregenddt &&
                      test.docregenddt.replace(
                        /(\d{4})(\d{2})(\d{2})/,
                        " $1.$2.$3 "
                      )}
                    / 실기 :
                    {test.docregstartdt &&
                      test.docregstartdt.replace(
                        /(\d{4})(\d{2})(\d{2})/,
                        " $1.$2.$3 "
                      )}
                    ~
                    {test.docregenddt &&
                      test.docregenddt.replace(
                        /(\d{4})(\d{2})(\d{2})/,
                        " $1.$2.$3 "
                      )}
                  </span>
                </p>
              ))}
          </TabPanel>
        </Box>
      </div>
    </>
  );
};

export default Plan;
