import { useRef, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import styles from "../../styles/cert/CertFind.module.css";

const BasicsInfo = () => {
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
            <Typography>필기시험 시험자 유의사항</Typography>
          </AccordionSummary>
          <AccordionDetails
            style={{ background: "#eee", borderRadius: "15px" }}
          >
            <Typography>
              <p>
                1. 답안카드는 반드시 검정색 사인펜으로 기재하고 마킹하시기
                바랍니다.
              </p>
              <p>
                2. 답안카드 채점은 전산 판독결과에 따르며 문제지 형별 및 답안
                란의 마킹누락, 마킹착오로 인한 불이익은 전적으로 수험자의
                귀책사유입니다.
              </p>
              <p>
                3. 답안카드 오작성 시 교체 또는 수정테이프를 사용하여 수정
                가능하나, 불완전한 수정처리로 인해 발생하는 채점결과는 수험자
                귀책사유이므로 주의하시기 바랍니다.
              </p>
              <p>4. 감독위원 확인이 없는 답안카드는 무효 처리됩니다.</p>
              <p>
                5. 부정행위 예방을 위해 문제지에도 수험번호 및 성명을 기재하여야
                합니다.
              </p>
              <p>
                6. 시험시간이 종료되면 즉시 답안작성을 멈춰야 하며, 종료시간
                이후 계속 답안을 작성하거나 감독위원의 답안제출 지시에 불응할
                때에는 채점대상에서 제외될 수 있습니다.
              </p>
              <p>
                7. 시험 중에는 통신기기 및 전자기기(휴대전화기 등)의 소지 또는
                사용이 불가합니다.
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
            <Typography>실기시험 시험자 유의사항</Typography>
          </AccordionSummary>
          <AccordionDetails
            style={{ background: "#eee", borderRadius: "15px" }}
          >
            <Typography>
              <p>
                1. 수험자지참준비물을 반드시 확인 후 준비해오셔야 응시
                가능합니다.
              </p>
              <p>
                2. 수험자는 시험위원의 지시에 따라야 하며 시험실 출입 시 부정한
                물품 소지여부 확인을 위해 시험위원의 검사를 받아야 합니다.
              </p>
              <p>
                3. 시험시간 중 전자·통신기기를 비롯한 불허물품 소지가 적발되는
                경우 퇴실조치 및 당해시험은 무효처리 됩니다.
              </p>
              <p>
                4. 수험자는 답안 작성 시 검정색 필기구만 사용하여야 합니다.(그
                외 연필류, 유색 필기구 등을 사용한 답항은 채점하지않으며 0점
                처리됩니다.)
              </p>
              <p>
                5. 수험자는 시험시작 전에 지급된 재료의 이상 유무를 확인하고
                이상이 있을 경우에는 시험위원으로 부터 조치를 받아야
                합니다.(시험시작 후 재료교환 및 추가지급 불가)
              </p>
              <p>
                6. 수험자는 시험 종료후 문제지와 작품(답안지)을 시험위원에게
                제출하여야 합니다.(단, 문제지 제공 지정종목은 시험 종료 후
                문제지를 회수하지 아니함)
              </p>
              <p>
                7. 복합형(필답형+작업형)으로 시행되는 종목은 전 과정을 응시하지
                않는 경우 채점대상에서 제외 됩니다.
              </p>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default BasicsInfo;
