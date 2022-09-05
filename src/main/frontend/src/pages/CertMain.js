import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import styles from "../styles/cert/Cert.module.css";
import Grid from "@mui/system/Unstable_Grid";
import TextField from "@mui/material/TextField";
import { ArrowForwardIos } from "@mui/icons-material";
import sprout from "../images/cert_sprout1.png";

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
      <div className={styles.certTitle1}>
        <h1 className={styles.certtitle}>재배할 자격증을 찾아보세요.</h1>
        <img className={styles.certTitleImg} src={sprout} alt="새싹" />
      </div>

      <div className={styles.certSearchBar}>
        <TextField
          id="outlined-search"
          type="search"
          InputProps={{
            startAdornment: <SearchIcon color="action" fontSize="large" />,
            style: {
              width: "650px",
              height: "60px",
              borderRadius: "15px",
              marginTop: "30px",
              padding: "0 10px",
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#8cbf75",
              },
              "&.MuiInputBase-sizeSmall": {
                paddingLeft: "14px",
              },
            },
          }}
        ></TextField>
      </div>
      <Grid
        container
        spacing={3}
        style={{
          justifyContent: "space-around",
          margin: "30px auto",
          width: "500px",
        }}
      >
        <Grid xs={3} style={{ width: "200px", padding: "0" }}>
          <FormControl sx={{ minWidth: 200 }} style={{ fontSize: "14px" }}>
            <InputLabel
              id="certLCat"
              sx={{
                "&.Mui-focused": {
                  color: "#8cbf75",
                },
                lineHeight: "100%",
              }}
            >
              대분류
            </InputLabel>
            <Select
              labelId="certLCat"
              id="certLCatSelect"
              value={certL}
              label="대분류"
              onChange={certLCatChange}
              name="certLCat"
              sx={{
                "&.MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#8cbf75",
                  },
                },
              }}
            >
              {certLCat.map((certL) => (
                <MenuItem key={certL.id} value={certL.name}>
                  {certL.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid
          item
          xs={1}
          style={{
            paddingLeft: "15px",
            paddingTop: "15px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ArrowForwardIos color="action" />
        </Grid>
        <Grid xs={3} style={{ width: "200px", padding: "0" }}>
          <FormControl sx={{ minWidth: 200 }} style={{ fontSize: "14px" }}>
            <InputLabel
              id="certMCat"
              sx={{
                "&.Mui-focused": {
                  color: "#8cbf75",
                },
                lineHeight: "100%",
              }}
            >
              중분류
            </InputLabel>
            <Select
              labelId="certMCat"
              id="certMCatSelect"
              value={certM}
              label="중분류"
              onChange={certMCatChange}
              name="certMCat"
              sx={{
                "&.MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#8cbf75",
                  },
                },
              }}
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

      <div className={styles.certMainCard}>
        <div className={styles.certMainBody}>
          <div>
            <button
              className={styles.smallcert}
              type="button"
              onClick={() => {
                window.location = "/certfind";
              }}
            >
              거푸집기능사
            </button>
            <button type="button" className={styles.smallcert}>
              건축구조기술사
            </button>
            <button type="button" className={styles.smallcert}>
              건축기사
            </button>
            <button type="button" className={styles.smallcert}>
              건축기사
            </button>
            <button type="button" className={styles.smallcert}>
              건축기사
            </button>
            <button type="button" className={styles.smallcert}>
              건축기사
            </button>
            <button type="button" className={styles.smallcert}>
              건축기사
            </button>
            <button type="button" className={styles.smallcert}>
              건축기사
            </button>
            <button type="button" className={styles.smallcert}>
              건축기사
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertMain;
