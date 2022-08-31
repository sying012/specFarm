import React from "react";
import styles from "../../styles/cert/CertFind.module.css";
import Grid from "@mui/system/Unstable_Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Applicationcaution from "./Applicationcaution";
import Applicationinfo from "./Applicationinfo";
import Basicsinfo from "./Basicsinfo";
import Testchedule from "./Testschedule";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Checkbox from "@mui/material/Checkbox";
import "../../styles/cert/info.css";

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

const CertFind = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  return (
    <div>
      <div className="titleContainer">
        <div className="titlewrap">자격증 찾기</div>
      </div>
      <div className={styles.certFindInfo}>
        <div className={styles.certContainer}>
          <input className={styles.certfindinput} placeholder="검색"></input>
          <SearchIcon
            fontSize="large"
            sx={{ marginLeft: "-30px", marginTop: "65px" }}
          />
          <Grid
            item
            xs={6}
            style={{ paddingLeft: "380px", paddingTop: "30px" }}
          >
            <FormControl
              sx={{ minWidth: 220 }}
              Width
              style={{
                fontSize: "14px",
                marginLeft: "-605px",
                marginTop: "100px",
              }}
            >
              <InputLabel id="demo-select-small" style={{ fontSize: "14px" }}>
                대분류
              </InputLabel>
              <Select
                labelId="demo-select-small"
                id="certLCat"
                label="관심분야(대분류)"
                style={{ fontSize: "14px" }}
                name="certLCat"
              >
                <MenuItem value="" style={{ fontSize: "14px" }}>
                  대분류
                </MenuItem>
                <MenuItem value={10} style={{ fontSize: "14px" }}>
                  사업관리
                </MenuItem>
                <MenuItem value={20} style={{ fontSize: "14px" }}>
                  경영.회계.세무
                </MenuItem>
                <MenuItem value={30} style={{ fontSize: "14px" }}>
                  금융.보험
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            xs={6}
            style={{
              paddingLeft: "580px",
              paddingBottom: "30px",
              marginTop: "-62px",
            }}
          >
            <FormControl
              sx={{ minWidth: 220 }}
              Width
              style={{
                fontSize: "14px",
                marginTop: "270px",
                marginLeft: "-1185px",
              }}
            >
              <InputLabel id="certMCat" style={{ fontSize: "14px" }}>
                중분류
              </InputLabel>
              <Select
                labelId="certMCat"
                id="demo-select-small"
                label="관심분야(중분류)"
                style={{ fontSize: "14px" }}
                name="certMCat"
              >
                <MenuItem value="" style={{ fontSize: "14px" }}>
                  관심분야
                </MenuItem>
                <MenuItem value={10} style={{ fontSize: "14px" }}>
                  사업관리
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <div className={styles.smallfindcert}>
            <Button variant="text" sx={{ color: "#6b5343" }}>
              거푸집기능사
            </Button>
            <Button variant="text" sx={{ color: "#6b5343" }}>
              건축구조기술사
            </Button>
            <Button variant="text" sx={{ color: "#6b5343" }}>
              건축기사
            </Button>
            <Button variant="text" sx={{ color: "#6b5343" }}>
              건축기사
            </Button>
            <Button variant="text" sx={{ color: "#6b5343" }}>
              건축기사
            </Button>
            <Button variant="text" sx={{ color: "#6b5343" }}>
              qqqqqqqqqqqq
            </Button>
          </div>
        </div>
        <div className={styles.certFind}>
          <p className={styles.certFindTitle}>
            사회조사분석사1급{" "}
            <Checkbox
              {...label}
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite />}
              classes={{ root: "custom-checkbox-root" }}
            />{" "}
          </p>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 0, borderColor: "divider" }}>
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
                <Tab label="시험 일정" {...a11yProps(0)} />
                <Tab label="원서접수 안내" {...a11yProps(1)} />
                <Tab label="원서접수 유의사항" {...a11yProps(2)} />
                <Tab label="기본 안내사항" {...a11yProps(3)} />
              </Tabs>
            </Box>
            <TabPanel
              value={value}
              index={0}
              style={{ background: "rgba(255, 255, 255, 0.05)" }}
            >
              <Testchedule></Testchedule>
            </TabPanel>
            <TabPanel
              value={value}
              index={1}
              style={{ background: "rgba(255, 255, 255, 0.05)" }}
            >
              <Applicationinfo />
            </TabPanel>
            <TabPanel
              value={value}
              index={2}
              style={{ background: "rgba(255, 255, 255, 0.05)" }}
            >
              <Applicationcaution />
            </TabPanel>
            <TabPanel
              value={value}
              index={3}
              style={{ background: "rgba(255, 255, 255, 0.05)" }}
            >
              <Basicsinfo />
            </TabPanel>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default CertFind;
