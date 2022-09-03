import { Stack, Alert, Slide } from "@mui/material";
import React, { useEffect, useState } from "react";

const Alerts = () => {
  const [open, setOpen] = useState(true);

  // alert timer 10sec
  useEffect(() => {
    let timer = setTimeout(() => {
      setOpen(false);
    }, 10000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      style={{
        paddingTop: "70px",
        display: "flex",
        justifyContent: "flex-end",
        position: "relative",
        zIndex: "2",
      }}
    >
      <Stack sx={{ width: "510px" }} spacing={1}>
        <Slide in={open} direction="down">
          <Alert
            severity="error"
            onClose={() => {
              setOpen(false);
            }}
          >
            [ 정보처리기사 ] 원서접수 D-3 씨앗 심을 준비하세요!
          </Alert>
        </Slide>
        <Slide in={open} direction="down">
          <Alert
            severity="error"
            onClose={() => {
              setOpen(false);
            }}
          >
            [ 정보처리기사 ] 필기시험 D-7
          </Alert>
        </Slide>
      </Stack>
    </div>
  );
};

export default Alerts;
