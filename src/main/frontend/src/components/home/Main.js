import { Container, Grid } from "@mui/material";
import React from "react";
import { Stack } from "react-bootstrap";
import styles from "../../styles/home/Home.module.css";
import Alerts from "./Alerts";
import Plan from "./Plan";

const Main = ({ acceptances, tests, open }) => {
  // const [alertH, setAlertH] = useState("-50");

  return (
    <>
      <div className={styles.homeBackground}>
        <Container style={{ position: "relative", boxSizing: "content-box" }}>
          <Grid container className={styles.alert}>
            <Stack sx={{ width: "510px" }} spacing={1}>
              <Alerts open={open} />
            </Stack>
          </Grid>
          <div className={styles.homeContent} style={{ position: "relative" }}>
            <div>
              <p className={styles.subTitle}>
                자격증을 취득하여,
                <br />
                여러분의 스펙Farm을 완성하세요.
              </p>
              <p className={styles.contentText}>
                혼자는 물론, 목표가 같은 동료 농부들과 함께
                <br />
                자격증 취득의 즐거움을 느낄 수 있습니다.
              </p>
            </div>
            <Plan acceptances={acceptances} tests={tests} />
          </div>
        </Container>
      </div>
    </>
  );
};

export default Main;
