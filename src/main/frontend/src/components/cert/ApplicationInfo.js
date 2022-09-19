import { useRef, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import styles from "../../styles/cert/CertFind.module.css";

const ApplicationInfo = () => {
  return (
    <div>
      <div className={styles.infoHead}>
        <Accordion style={{ borderRadius: "15px", background: "#eee" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            style={{ background: "#eee", borderRadius: "15px" }}
          >
            <Typography style={{ fontSize: "18px" }}>
              접수확인 및 수험표 출력기간
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            style={{ background: "#eee", borderRadius: "15px" }}
          >
            <Typography>
              <p>
                접수당일부터 시험시행일까지 출력가능(이외 기간은 조회불가)
                합니다. 또한 출력장애 등을 대비하여 사전에 출력 보관하시기
                바랍니다.
              </p>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
      <div className={styles.infoHead}>
        <Accordion style={{ borderRadius: "15px", background: "#eee" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            style={{ background: "#eee", borderRadius: "15px" }}
          >
            <Typography style={{ fontSize: "18px" }}>
              접수상태(접수완료, 수험표출력, 미결제)를 클릭하면 각 접수상태에
              따라 다음 단계화면으로 이동합니다.
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            style={{ background: "#eee", borderRadius: "15px" }}
          >
            <Typography>
              <p>접수완료, 수험표출력 : 수험표 출력화면으로 이동</p>
              <br />
              <p>미결제 : 원서접수내용 확인 화면으로 이동</p>
              <br />
              <p>입금대기중 : 가상계좌번호 조회</p>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
      <div className={styles.infoHead}>
        <Accordion style={{ borderRadius: "15px", background: "#eee" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
            style={{ background: "#eee", borderRadius: "15px" }}
          >
            <Typography style={{ fontSize: "18px" }}>
              접수 수수료 결제마감 시한(국가기술자격만 해당) : 원서접수 마감일
              18:00시까지 단, 원서작성 완료후 접수수수료 미결제상태인 다음의
              경우는 결제가능.
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            style={{ background: "#eee", borderRadius: "15px" }}
          >
            <Typography>
              <p>
                계좌이체 및 신용카드 결제신청시는 시험응시장소에 수용여유인원이
                있을 경우(다음날 12:00시까지)
              </p>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default ApplicationInfo;
