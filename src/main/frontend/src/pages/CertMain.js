import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import styles from "../styles/cert/Cert.module.css";
import Grid from "@mui/system/Unstable_Grid";

const CertMain = () => {
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

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1 className={styles.certtitle}>재배할 자격증을 찾아보세요. 🌱</h1>
      <div className={styles.certSearchBar}>
        <input className={styles.certinput} placeholder="검색"></input>
        <SearchIcon
          fontSize="large"
          color="action"
          style={{ position: "absolute", top: "73px", right: "20px" }}
        />
      </div>
      <Grid
        container
        spacing={3}
        style={{
          justifyContent: "space-around",
          margin: "30px auto",
          width: "650px",
        }}
      >
        <Grid xs={3} style={{ width: "200px", padding: "0" }}>
          <FormControl sx={{ minWidth: 200 }} style={{ fontSize: "14px" }}>
            <InputLabel id="certLCat">대분류</InputLabel>
            <Select
              labelId="certLCat"
              id="certLCatSelect"
              value={certL}
              label="대분류"
              onChange={certLCatChange}
              name="certLCat"
            >
              {certLCat.map((certL) => (
                <MenuItem key={certL.id} value={certL.name}>
                  {certL.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid xs={3} style={{ width: "200px", padding: "0" }}>
          <FormControl sx={{ minWidth: 200 }} style={{ fontSize: "14px" }}>
            <InputLabel id="certMCat">중분류</InputLabel>
            <Select
              labelId="certMCat"
              id="certMCatSelect"
              value={certM}
              label="중분류"
              onChange={certMCatChange}
              name="certMCat"
            >
              {certMCat.map((certM) => (
                <MenuItem key={certM.id} value={certM.name}>
                  {certM.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid>
          <Box
            sx={{
              width: 800,
              height: 100,
              border: "1px solid lightgray",
              borderRadius: "5px",
            }}
          >
            <div>
              <Stack
                spacing={2}
                direction="row"
                style={{ justifyContent: "center", margin: "8px auto" }}
              >
                <button
                  className={styles.smallcert1}
                  type="button"
                  onClick={() => {
                    window.location = "/CertFind";
                  }}
                >
                  거푸집기능사
                </button>
                <button type="button" className={styles.smallcert2}>
                  건축구조기술사
                </button>
                <button type="button" className={styles.smallcert2}>
                  건축기사
                </button>
                <button type="button" className={styles.smallcert2}>
                  건축기사
                </button>
                <button type="button" className={styles.smallcert2}>
                  건축기사
                </button>
                <button type="button" className={styles.smallcert2}>
                  건축기사
                </button>
              </Stack>
            </div>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default CertMain;
