import React, { useState } from "react";
import styles from "../../styles/cert/CertFind.module.css";
import Grid from "@mui/system/Unstable_Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ApplicationCaution from "./ApplicationCaution";
import ApplicationInfo from "./ApplicationInfo";
import BasicsInfo from "./BasicsInfo";
import TestSchedule from "./TestSchedule";
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

const CertFind = () => {
  const [value, setValue] = React.useState(0);
  const [certLCat, setCertLCat] = useState([{ id: 1, name: "사업관리" }]);
  const [certL, setCertL] = useState("");
  const [certMCat, setCertMCat] = useState([{ id: 1, name: "사업관리" }]);
  const [certM, setCertM] = useState("");

  const certLCatChange = (e) => {
    console.log(e.target.value);
    setCertL(e.target.value);
  };

  const certMCatChange = (e) => {
    console.log(e.target.value);
    setCertM(e.target.value);
  };

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
          <div className={styles.certFindSearchBar}>
            <input className={styles.certfindinput} placeholder="검색"></input>
            <SearchIcon
              fontSize="large"
              color="action"
              style={{ position: "absolute", top: "305px", right: "1120px" }}
            />
          </div>
          <Grid xs={6} style={{ width: "150px", padding: "20px 40px" }}>
            <FormControl sx={{ minWidth: 200 }} style={{ fontSize: "10px" }}>
              <InputLabel id="certLCat" style={{ fontSize: "14px" }}>
                대분류
              </InputLabel>
              <Select
                labelId="certLCat"
                id="certLCatSelect"
                value={certL}
                label="대분류"
                onChange={certLCatChange}
                name="certLCat"
                style={{ borderRadius: "15px" }}
              >
                {certLCat.map((certL) => (
                  <MenuItem key={certL.id} value={certL.name}>
                    {certL.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={6} style={{ width: "150px", padding: "10px 40px" }}>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel id="certMCat" style={{ fontSize: "14px" }}>
                중분류
              </InputLabel>
              <Select
                labelId="certMCat"
                id="certMCatSelect"
                value={certM}
                label="중분류"
                onChange={certMCatChange}
                name="certMCat"
                style={{ borderRadius: "15px" }}
              >
                {certMCat.map((certM) => (
                  <MenuItem key={certM.id} value={certM.name}>
                    {certM.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <div style={{ margin: "20px" }}>
            <button type="button" className={styles.smallFindCert}>
              거푸집기능사
            </button>
            <button type="button" className={styles.smallFindCert}>
              건축구조기술사
            </button>
            <button type="button" className={styles.smallFindCert}>
              건축기사
            </button>
            <button type="button" className={styles.smallFindCert}>
              건축기사
            </button>
            <button type="button" className={styles.smallFindCert}>
              건축기사
            </button>
            <button type="button" className={styles.smallFindCert}>
              건축기사
            </button>
            <button type="button" className={styles.smallFindCert}>
              건축기사
            </button>
            <button type="button" className={styles.smallFindCert}>
              건축기사
            </button>
            <button type="button" className={styles.smallFindCert}>
              건축기사
            </button>
            <button type="button" className={styles.smallFindCert}>
              길게하면 어디까지 나올까 정말 궁금
            </button>
          </div>
        </div>
        <div className={styles.certFind}>
          <div className={styles.certFindTitle}>
            사회조사분석사1급{" "}
            <Checkbox
              {...label}
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite />}
              classes={{ root: "custom-checkbox-root" }}
            />{" "}
          </div>
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
              <TestSchedule />
            </TabPanel>
            <TabPanel
              value={value}
              index={1}
              style={{ background: "rgba(255, 255, 255, 0.05)" }}
            >
              <ApplicationInfo />
            </TabPanel>
            <TabPanel
              value={value}
              index={2}
              style={{ background: "rgba(255, 255, 255, 0.05)" }}
            >
              <ApplicationCaution />
            </TabPanel>
            <TabPanel
              value={value}
              index={3}
              style={{ background: "rgba(255, 255, 255, 0.05)" }}
            >
              <BasicsInfo />
            </TabPanel>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default CertFind;
