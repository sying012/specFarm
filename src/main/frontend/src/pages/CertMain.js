import React from "react";
import "../styles/Cert.css";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const CertMain = () => {
  const [cert, setCert] = useState("");
  const [cert1, setCert1] = useState("");

  const handleChange = (e) => {
    setCert(e.target.value);
    setCert1(e.target.value);
  };

  return (
    <div>
      <h2 className="title">재배할 자격증을 찾아보세요. 🌱</h2>
      <input placeholder="검색"></input>
      <SearchIcon
        fontSize="large"
        sx={{ marginLeft: "-3%", marginBottom: "-1%" }}
      />
      <Box sx={{ Width: "20%" }}>
        <FormControl
          sx={{ m: 1, width: 200, marginLeft: "30%", marginTop: "50px" }}
          size="medium"
        >
          <InputLabel id="demo-simple-select-label">대분류</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={cert}
            label="Cert"
            onChange={handleChange}
          >
            <MenuItem value={10}>건설</MenuItem>
            <MenuItem value={20}>기계</MenuItem>
            <MenuItem value={30}>전기</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ Width: "20%" }}>
        <FormControl
          sx={{ m: 1, width: 200, marginLeft: "50%", marginTop: "-65px" }}
          size="medium"
        >
          <InputLabel id="demo-simple-select-label">중분류</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={cert1}
            label="Cert1"
            onChange={handleChange}
          >
            <MenuItem value={10}>건축</MenuItem>
            <MenuItem value={20}>철도</MenuItem>
            <MenuItem value={30}>자동차</MenuItem>
          </Select>
        </FormControl>
      </Box>
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
      <div className="smallcert">
        <Stack spacing={2} direction="row">
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
        </Stack>
      </div>
    </div>
  );
};

export default CertMain;
