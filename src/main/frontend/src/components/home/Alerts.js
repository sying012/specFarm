import React from "react";
import { Alert, Slide } from "@mui/material";
import CampaignIcon from "@mui/icons-material/Campaign";

const Alerts = ({ alerts, onCloseAlert }) => {
  return alerts.map((alert) => (
    <div style={{ marginBottom: "5px" }} key={alert.id}>
      <Slide in={true}>
        {alert.dDay === 0 || alert.dDay === 1 ? (
          <Alert
            icon={<CampaignIcon fontSize="inherit" />}
            severity="error"
            onClose={() => onCloseAlert(alert.id)}
            style={{ width: "350px" }}
          >
            [ {alert.certName} ]{" "}
            <strong
              style={{ color: "rgb(240, 99 ,96)", textDecoration: "underline" }}
            >
              D-{alert.dDay}
            </strong>{" "}
            {alert.cat}
          </Alert>
        ) : alert.dDay === 2 || alert.dDay === 3 || alert.dDay === 4 ? (
          <Alert
            icon={<CampaignIcon fontSize="inherit" />}
            severity="warning"
            onClose={() => onCloseAlert(alert.id)}
            style={{ width: "350px" }}
          >
            [ {alert.certName} ]{" "}
            <strong style={{ color: "rgb(255, 161, 23)" }}>
              D-{alert.dDay}
            </strong>{" "}
            {alert.cat}
          </Alert>
        ) : (
          <Alert
            icon={<CampaignIcon fontSize="inherit" />}
            onClose={() => onCloseAlert(alert.id)}
            style={{ width: "350px" }}
          >
            [ {alert.certName} ]{" "}
            <strong style={{ color: "rgb(92, 182 ,96)" }}>
              D-{alert.dDay}
            </strong>{" "}
            {alert.cat}
          </Alert>
        )}
      </Slide>
    </div>
  ));
};

export default Alerts;
