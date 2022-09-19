import { Close } from "@mui/icons-material";
import { Autocomplete, IconButton, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import styles from "../../styles/mypage/EarnedCert.module.css";

const EarnedCert = ({ countList, setCountList, deleteCertDiv, cert }) => {
  const [singleCert, setSingleCert] = useState({});

  const [certNames, setcertNames] = useState([
    { certIdx: 1, certName: "화공기사" },
    { certIdx: 2, certName: "화공기술사" },
    { certIdx: 3, certName: "정밀화학기사" },
    { certIdx: 4, certName: "화학분석기사" },
    { certIdx: 5, certName: "화학분석기능사" },
    { certIdx: 6, certName: "화약류제조기사" },
    { certIdx: 7, certName: "화약류제조산업기사" },
    { certIdx: 8, certName: "바이오화학제품제조기사" },
    { certIdx: 9, certName: "바이오화학제품제조산업기사" },
  ]);

  useEffect(() => {
    if (Object.keys(cert).length !== 0) {
      setSingleCert(cert);
    }
  }, [cert]);

  // 취득한 자격증란 onChange
  const autocompleteChage = (e, text) => {
    const addCert = {
      ...singleCert,
      certName: text,
    };
    setSingleCert(addCert);
  };
  
  const handleChange = (getCertIdx, e) => {
    const addCert = {
      ...singleCert,
      [e.target.name]: e.target.value,
    };
    setSingleCert(addCert);

    setCountList(
      countList.map((cer) =>
        cer.getCertIdx === getCertIdx
          ? {
              ...cer,
              certName: addCert.certName,
              getCertDate: addCert.getCertDate.replace(
                /(\d{4})(\d{2})(\d{2})/,
                "$1.$2.$3"
              ),
            }
          : cer
      )
    );
  };

  return (
    <div>
      <div
        className={styles.certContainer}
        id={"newCertContainer" + cert.getCertIdx}
      >
        <Autocomplete
          freeSolo
          // id="free-solo-2-demo"
          disableClearable
          options={certNames.map((option) => option.certName)}
          renderInput={(params) => (
            <TextField
              {...params}
              InputProps={{
                ...params.InputProps,
              }}
              label="자격증 명"
              name="certName"
              style={{ marginBottom: "5px", width: "200px" }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#8cbf75",
                  },
                },
                "& .MuiInputLabel-root": {
                  "&.Mui-focused": {
                    color: "#1d5902",
                  },
                },
              }}
              value={singleCert.certName || ""}
              onChange={(e) => handleChange(cert.getCertIdx, e)}
            />
          )}
          value={singleCert.certName || ""}
          onChange={autocompleteChage}
        />
        <TextField
          variant="outlined"
          label="수확 일자(YYYY.MM.DD)"
          value={singleCert.getCertDate || ""}
          onChange={(e) => handleChange(cert.getCertIdx, e)}
          name="getCertDate"
          inputProps={{ maxLength: 10 }}
          style={{ marginLeft: "5px", marginBottom: "5px" }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#8cbf75",
              },
            },
            "& .MuiInputLabel-root": {
              "&.Mui-focused": {
                color: "#1d5902",
              },
            },
          }}
        />
        <IconButton
          aria-label="details"
          onClick={() => deleteCertDiv(cert.getCertIdx)}
          style={{ padding: 0, height: "min-content" }}
        >
          <Close fontSize="medium" style={{ color: "#666" }} />
        </IconButton>
      </div>
    </div>
  );
};

export default EarnedCert;
