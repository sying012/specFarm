import { useRef, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import styles from "../../styles/cert/CertFind.module.css";

const ApplicationCaution = () => {
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
            <Typography>원서접수시 유의사항</Typography>
          </AccordionSummary>
          <AccordionDetails
            style={{ background: "#eee", borderRadius: "15px" }}
          >
            <Typography>
              <p>원서접수는 온라인(인터넷, 모바일앱)에서만 가능합니다.</p>
              <p>
                스마트폰, 태블릿PC 사용자는 모바일앱 프로그램을 설치한 후 접수
                및 취소/환불 서비스를 이용하시기 바랍니다.
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
            <Typography>접수가능한 사진 범위 등 변경사항</Typography>
          </AccordionSummary>
          <AccordionDetails
            style={{ background: "#eee", borderRadius: "15px" }}
          >
            <Typography>
              <p>
                필기시험 사진상이자는 신분확인 시까지 실기원서접수가 불가합니다.
                원서접수 지부(사)로 본인이 신분증 및 규격사진(화일)을 지참 후
                확인 받으시기 바랍니다
              </p>
              <p>
                장애인 수험자는 원서접수 시 장애유형 및 편의요청사항을 선택하여
                접수하고, 장애인 증빙서류를 제출해야 편의제공을 받으실 수
                있습니다.
              </p>
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
            <Typography>국가자격검정 전자통신기기 관리운영 기준</Typography>
          </AccordionSummary>
          <AccordionDetails
            style={{ background: "#eee", borderRadius: "15px" }}
          >
            <Typography>
              <p>
                전자·통신기기(전자계산기, 수험자지참공구 등 우리 공단에서 사전
                소지를 지정한 물품은 제외)의 시험장 반입은 원칙적으로 금지함
              </p>
              <p>
                소지품 정리시간(입실시간 이후, 수험자교육 시작 이전) 이후 전자
                통신기기 등 소지불가 물품을 소지 착용하고 있는 경우에는
                당해시험이 정지(퇴실) 및 무효 처리됨.
              </p>
              <p>국가전문자격(변리사, 감정평가사 등)은 적용 제외</p>
              <p>허용군 내 기종번호 말미의 영어 표기(ES, MS, EX 등)은 무관</p>
              <p>사칙연산만 가능한 일반계산기는 기종 상관없이 사용 가능</p>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default ApplicationCaution;
