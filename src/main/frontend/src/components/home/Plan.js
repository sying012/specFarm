import {
  Box,
  Button,
  createTheme,
  MobileStepper,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import styles from "../../styles/home/Home.module.css";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

// mui theme
const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    green: {
      main: "#8cbf75",
      contrastText: "#fff",
    },
    brown: {
      main: "rgb(107, 83, 67)",
      contrastText: "#fff",
    },
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
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
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
          <MobileStepper
            variant="dots"
            steps={6}
            position="static"
            activeStep={activeStep}
            sx={{ maxWidth: 500, flexGrow: 1, background: "none" }}
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
                disabled={activeStep === 5}
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
              >
                {theme.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
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

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <div>{children}</div>
//         </Box>
//       )}
//     </div>
//   );
// }

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Plan = ({ acceptances, tests }) => {
  const [value, setValue] = useState(0);

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
                style: { background: "rgb(140, 191, 117)" },
              }}
              aria-label="cert plan"
              variant="fullWidth"
              sx={{
                "& button": { background: "rgba(140, 191, 117, 0.5)" },
              }}
            >
              <Tab label="접수 일정" />
              <Tab label="시험 일정" />
            </Tabs>
          </Box>
          <TabPanel
            value={value}
            index={0}
            style={{ background: "rgba(255, 255, 255, 0.05)" }}
          >
            {acceptances.map((accept) => (
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
            style={{ background: "rgba(255, 255, 255, 0.05)" }}
          >
            {tests.map((test) => (
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
