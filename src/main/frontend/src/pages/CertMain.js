import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import styles from "../styles/cert/Cert.module.css";
import Grid from "@mui/system/Unstable_Grid";

const CertMain = () => {
  return (
    <div>
      <h1 className={styles.certtitle}>재배할 자격증을 찾아보세요. 🌱</h1>
      <input className={styles.certinput} placeholder="검색"></input>
      <SearchIcon
        fontSize="large"
        sx={{ marginLeft: "-3%", marginBottom: "-1%" }}
      />
      <Grid item xs={6} style={{ paddingLeft: "380px", paddingTop: "30px" }}>
        <FormControl sx={{ minWidth: 150 }} Width style={{ fontSize: "14px" }}>
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
      {
        <Grid
          item
          xs={1}
          style={{
            paddingLeft: "0px",
            paddingTop: "10px",
            display: "flex",
            justifyContent: "center",
          }}
        ></Grid>
      }
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
          sx={{ minWidth: 150 }}
          Width
          style={{
            fontSize: "14px",
            marginBottom: "30px",
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
              관심분야(중분류)
            </MenuItem>
            <MenuItem value={10} style={{ fontSize: "14px" }}>
              사업관리
            </MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Box
        sx={{
          width: 800,
          height: 100,
          backgroundColor: "primary",
          border: "1px solid black",
          marginLeft: "200px",
          borderRadius: "18px",
        }}
      />
      <div className={styles.smallcert}>
        <Stack spacing={2} direction="row">
          <Button
            variant="text"
            sx={{ color: "#6b5343" }}
            onClick={() => {
              window.location = "/CertFind";
            }}
          >
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
        </Stack>
      </div>
    </div>
  );
};

export default CertMain;
