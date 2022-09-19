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

// mui theme
const buttonTheme = createTheme({
  palette: {
    green: {
      main: "#8cbf75",
    },
  },
});

const Plan = ({ acceptances, tests }) => {
  const [data, setData] = useState(acceptances.slice(0, 3));
  const [value, setValue] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (value === 0) {
      setData(acceptances.slice(0, 3));
    } else {
      setData(tests.slice(0, 3));
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
      console.log(step);
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
          <Box sx={{ pr: 3, pt: 3, pl: 3, pb: 2 }}>
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
                  disabled={activeStep === LAST_STEP - 1}
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
            dataList={acceptances}
          >
            {data.map((accept) => (
              <p key={accept.id} className={styles.certPlanP}>
                {accept.title}
                <br />
                접수 : {accept.startDate} ~ {accept.endDate}
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
            dataList={tests}
          >
            {data.map((test) => (
              <p key={test.id} className={styles.certPlanP}>
                {test.title}
                <br />
                시험 : {test.startDate} ~ {test.endDate}
              </p>
            ))}
          </TabPanel>
        </Box>
      </div>
    </>
  );
};

export default Plan;
