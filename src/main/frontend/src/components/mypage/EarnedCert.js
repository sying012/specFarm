import { Close } from "@mui/icons-material";
import { Autocomplete, IconButton, TextField } from "@mui/material";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { API_BASE_URL } from "../../app-config";
import styles from "../../styles/mypage/EarnedCert.module.css";

const EarnedCert = ({ countList, setCountList, deleteCertDiv, cert }) => {
  const [singleCert, setSingleCert] = useState({});
  const [certNames, setcertNames] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/cert/getCertList`).then((response) => {
      setcertNames(
        response.data.certList.map((cert) => {
          let newCert = { ...cert, certName: cert.jmfldnm };
          delete newCert.jmfldnm;
          return newCert;
        })
      );
    });
  }, []);

  useEffect(() => {
    if (Object.keys(cert).length !== 0) {
      setSingleCert(cert);
    }
  }, [cert]);

  // 취득한 자격증란 onChange
  const autocompleteChage = (e, text, getCertIdx) => {
    const addCert = {
      ...singleCert,
      certName: text,
    };
    setCountList((prev) =>
      prev.map((cer) =>
        cer.getCertIdx === getCertIdx ? { ...cer, certName: text } : cer
      )
    );
  };

  const handleChange = (getCertIdx, e) => {
    const dateCheck = /^[0-9]+$/;
    // if (e.target.name === "getCertDate" && !dateCheck.test(e.target.value)) {
    // alert("수확일자를 확인해주세요.");
    // } else {
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
    // }
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
          value={singleCert.certName || ""}
          onChange={(e, text) => autocompleteChage(e, text, cert.getCertIdx)}
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
