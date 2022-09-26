import { Container, Grid } from "@mui/material";
import axios from "axios";
import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { Stack } from "react-bootstrap";
import { API_BASE_URL } from "../../app-config";
import styles from "../../styles/home/Home.module.css";
import Alerts from "./Alerts";
import Plan from "./Plan";

const Main = () => {
  const isUser = !!sessionStorage.getItem("ACCESS_TOKEN");
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: API_BASE_URL + "/user/getAlerts",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("ACCESS_TOKEN"),
      },
    }).then((response) => {
      setAlerts(response.data);
    });
  }, []);

  const onCloseAlert = useCallback(
    (id) => {
      setAlerts(alerts.filter((item) => item.id !== id));
    },
    [alerts]
  );

  // alert timer 10sec
  useEffect(() => {
    let timer = setTimeout(() => {
      setAlerts(
        alerts.map((item) => (item.id ? { ...item, open: false } : item))
      );
    }, 100000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <div>
        <Container
        // style={{ position: "relative", boxSizing: "content-box" }}
        >
          {/* <Container> */}
          {isUser ? (
            <Grid container className={styles.alert}>
              <Stack sx={{ width: "510px" }} spacing={1}>
                <Alerts alerts={alerts} onCloseAlert={onCloseAlert} />
              </Stack>
            </Grid>
          ) : (
            ""
          )}
          <div
            className={styles.homeContent}
            // style={{ position: "relative" }}
          >
            <div className={styles.homeP}>
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
            <Plan />
          </div>
        </Container>
      </div>
    </>
  );
};

export default Main;
