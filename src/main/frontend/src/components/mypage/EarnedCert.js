import { Close } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import styles from "../../styles/mypage/EarnedCert.module.css";

const EarnedCert = ({
  countList,
  setCountList,
  deleteCertDiv,
  cert,
}) => {
  const [singleCert, setSingleCert] = useState({});

  useEffect(() => {
    if (Object.keys(cert).length !== 0) {
      setSingleCert(cert);
    }
  }, [cert]);

  // 취득한 자격증란 onChange
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
        <TextField
          variant="outlined"
          label="자격증 명"
          value={singleCert.certName || ""}
          onChange={(e) => handleChange(cert.getCertIdx, e)}
          name="certName"
          style={{ marginBottom: "5px" }}
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
        <TextField
          variant="outlined"
          label="취득 일자(YYYY.MM.DD)"
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
