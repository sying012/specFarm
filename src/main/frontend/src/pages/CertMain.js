import React, { useEffect, useState } from "react";
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
import { API_BASE_URL } from "../app-config";
import axios from "axios";
// import CertFind from "../components/cert/CertFind";
// import { Route, Routes } from "react-router";
import { Link } from "react-router-dom";

const CertMain = () => {
  const [certLList, setCertLList] = useState([]);
  const [certL, setCertL] = useState("");
  const [certMList, setCertMList] = useState([]);
  const [certM, setCertM] = useState("");
  const [certSList, setCertSList] = useState([]);
  const [certS, setCertS] = useState("");
  const [testList, setTestList] = useState([]);
  const [certSearchList, setCertSearchList] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleClick = (e) => {
    axios({
      url: API_BASE_URL + "/cert/getCertTest",
      method: "get",
      params: { jmcd: e.target.value },
    }).then((response) => {
      setTestList(response.data.testList);
    });
  };

  const certLCatChange = (e) => {
    setCertL((prev) => e.target.value);
  };

  useEffect(() => {
    console.log(certL);
    if (certL !== "" && typeof certL !== "undefined") {
      axios({
        url: API_BASE_URL + "/cert/getCertMList",
        method: "get",
        params: { obligfldnm: certL },
      }).then((response) => {
        setCertMList(response.data.certMList);
      });
    }
  }, [certL]);

  const certMCatChange = (e) => {
    setCertM(e.target.value);
  };

  useEffect(() => {
    console.log(certM);
    if (certM !== "" && typeof certM !== "undefined") {
      axios({
        url: API_BASE_URL + "/cert/getCertSList",
        method: "get",
        params: { mdobligfldnm: certM },
      }).then((response) => {
        setCertSList(response.data.certSList);
      });
    }
  }, [certM]);

  useEffect(() => {
    console.log(certS);
    if (certS !== "" && typeof certS !== "undefined") {
      axios({
        url: API_BASE_URL + "/cert/getCertSList",
        method: "get",
        params: { mdobligfldnm: certS },
      }).then((response) => {
        setCertSList(response.data.certSList);
      });
    }
  }, [certS]);

  //const handleClick = (e) => {
  //   axios({
  //     url: API_BASE_URL + "/cert/getCertList",
  //     method: "get",
  //     params: { jmcd: e.target.value },
  //   }).then((response) => {
  //     setTestList((prev) => response.data.testList);
  //   });
  // };

  useEffect(() => {
    axios({
      url: API_BASE_URL + "/cert/getCertLList",
      method: "get",
    }).then((response) => {
      setCertLList(response.data.certLList);
    });
  }, []);

  const searchTest = (e) => {
    if (e.keyCode === 13) {
      axios({
        url: API_BASE_URL + "/cert/getCertSearch",
        method: "get",
        params: { searchKeyword: searchKeyword },
      }).then((response) => {
        console.log(response.data);
        setCertSList(response.data.certSearchList);
      });
    }
  };

  const handleSearchKeyword = (e) => {
    setSearchKeyword(e.target.value);
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
          id="certSearch"
          type="search"
          value={searchKeyword}
          onChange={handleSearchKeyword}
          onKeyDown={searchTest}
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
        >
          {certSearchList &&
            certSearchList.map((item) => (
              <MenuItem key={item.jmcd}>{item.jmfldnm}</MenuItem>
            ))}
        </TextField>
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
              {certLList &&
                certLList.map((item) => (
                  <MenuItem key={item.obligfldcd} value={item.obligfldnm}>
                    {item.obligfldnm}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid
          xs={1}
          style={{
            padding: "15px 50px",
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
              {certMList.map((item) => (
                <MenuItem key={item.mdobligfldcd} value={item.mdobligfldnm}>
                  {item.mdobligfldnm}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <div className={styles.certMainCard}>
        <div className={styles.certMainBody}>
          <div style={{ display: "inline-block", width: "100%" }}>
            {certSList &&
              certSList.map((certS) => (
                <Link to={`/cert/certFind/${certS.jmcd}`} key={certS.jmcd}>
                  <button
                    type="button"
                    key={certS.jmcd}
                    // onClick={() => handleClick(certS.jmcd)}
                    className={styles.smallcert}
                  >
                    {certS.jmfldnm}
                  </button>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertMain;
