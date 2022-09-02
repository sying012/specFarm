import { useRef, useState } from "react";
import { styled, ThemeProvider } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import styles from "../../styles/faq/FaqAccordion.module.css";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function FaqAccordion({ test }) {
  const [expanded, setExpanded] = useState("");
  const headerRef = useRef([]);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
    const index = panel.substring(5, panel.length);

    if (newExpanded) {
      for (let i = 0; i < headerRef.current.length; i++) {
        headerRef.current[i].style.fontWeight = "unset";
      }
      headerRef.current[index - 1].style.fontWeight = "bold";
      //   event.target.style.fontWeight = "bold";
    } else {
      headerRef.current[index - 1].style.fontWeight = "unset";
      //   event.target.style.fontWeight = "unset";
    }
  };

  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography ref={(elem) => (headerRef.current[0] = elem)}>
            비방/비하, 명예훼손 등을 당했어요.
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <div className={styles.faqContent}>
            <p>신고센터를 통해 명예훼손 등의 신고를 진행할 수 있습니다.</p>
            <p>
              스펙팜 서비스에 등록된 게시물 중 비방/비하, 명예훼손 등 문제 되는
              게시물의 URL을 입력해 주세요.
            </p>

            <p>보다 자세한 절차는 다음과 같습니다.</p>
            <br></br>
            <p>1. 로그인을 진행해 주세요.</p>
            <br />
            <p>
              2. 스펙팜 최하단 카테고리 중 고객센터 ▶ 신고센터를 통해 신고하실
              수 있습니다.
            </p>
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography ref={(elem) => (headerRef.current[1] = elem)}>
            정보를 제대로 입력했는데도 실명인증이 되지 않아요.
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <div className={styles.faqContent}>
              <p>
                실명인증은 회원님께서 입력한 정보와 실명인증기관에 등록된 정보가
                일치하는지 확인하는 절차입니다.
              </p>
              <p>
                실명인증기관이란, 은행연합회에서 집중되는 금융권의 신용 정보와
                한국신용평가정보 신용정보 회사인 비금융권정보가 결합된 실명인증
                정보입니다.
              </p>
              <p>
                그러므로 실명인증이 되지 않는 경우는 회원님의 정보가
                실명인증기관에 등록되지 않았거나,혹은 등록되었더라도 내용이 잘못
                기입되어 있는 경우 발생할 수 있습니다.
              </p>
              <p>
                번거롭더라도 회원님께서 직접 실명인증기관을 통해 정정신청을
                해주셔야 정상적으로 인증이 가능합니다.
              </p>
              <p>
                아래 실명인증기관을 통해 회원님의 실명정보를 등록한 후
                2~3일(영업일 기준) 정도가 지나면정상적으로 실명확인이
                가능합니다.
              </p>
              <br />
              <p>
                ▶ NICE신용평가정보㈜ ▶ 서울신용평가정보㈜ ▶ 코리아크레딧뷰로㈜
              </p>
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography ref={(elem) => (headerRef.current[2] = elem)}>
            아이디와 비밀번호를 분실하였습니다. 어떻게 하나요?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <div className={styles.faqContent}>
              <p>
                아이디와 비밀번호를 분실 하였을 경우 로그인을 클릭하신 후 하단의
                아이디/비밀번호 찾기를 이용하시면 됩니다.
              </p>
              <p>
                이름과 등록하신 이메일주소 또는 이름과 등록하신 휴대폰 번호를
                입력하시면 찾으실 수 있습니다.
              </p>
              <p>
                그래도 문제가 있을 경우 고객지원팀 (help@specfarmer.com)으로
                문의 해주시기 바랍니다.
              </p>
              <br />
              <a href="/findUser">아이디/비밀번호 찾기</a>
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
          <Typography ref={(elem) => (headerRef.current[3] = elem)}>
            도용이 의심되는 경우 어떻게 해야하나요?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <div className={styles.faqContent}>
              <h2>∙ 도용이 의심되는 경우</h2>
              <p>- 직접 이용하지 않은 로그인 기록이 확인되는 경우</p>
              <p>
                - 접속하지 않은 해외 / 타지역에서 로그인을 시도하여 로그인 차단
                알림을 받은 경우
              </p>
              <p>- 타인에 의해 비밀번호가 변경되어 로그인이 안되는 경우</p>
              <p>
                - 카페/블로그/쪽지 등 내가 이용하지 않은 서비스 이용 내역이
                확인되는 경우
              </p>
              <p>
                - 이용하지 않은 이력으로 아이디가 제한된 경우
                (보호조치/이용제한)
              </p>
              <p>
                - 평소에 사용하던 환경이 아닌 새로운 환경에서 로그인이 되어
                알림을 받은 경우
              </p>
              <br></br>
              <h2>
                ∙ 도용 발생 시 대처 방법 스펙팜은 여러가지 방법으로 고객님의
                소중한 아이디를 보호하기 위해 노력하고 있습니다.
              </h2>
              <p>
                이와 함께 고객님 스스로 본인의 개인정보를 안전하게 관리해 주시기
                바라며, 도용이 의심되는 경우 지체 없이 해당 내용을 스펙팜
                신고센터를 통해 신고해주시기 바랍니다.
              </p>
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
      >
        <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
          <Typography ref={(elem) => (headerRef.current[4] = elem)}>
            이름을 개명하였는데 어떻게 하나요?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <div className={styles.faqContent}>
              <p>
                회원가입 후 실명인증을 하지 않은 경우라면, 실명인증을 통하여
                개명 후 이름을 변경하실 수 있으며, 실명인증을 한 경우라면,
              </p>
              <p>
                이름변경 버튼을 클릭하시어 다시 실명인증을 해주시면 개명 후
                이름으로 변경하실 수 있습니다.
              </p>
              <p>
                단, 회원님의 개명 후 이름이 신용평가기관에 등록되어 있는 경우,
                즉시 이름이 변경됩니다.
              </p>
              <p>
                신용평가기관에 아직 등록이 되지 않았다면 아래 사이트를 참고하여
                등록 후 변경 가능합니다.
              </p>
              <br />
              <p>
                [신용평가기관] ▶ NICE신용평가정보㈜ ▶ 서울신용평가정보㈜ ▶
                코리아크레딧뷰로㈜
              </p>
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel6"}
        onChange={handleChange("panel6")}
      >
        <AccordionSummary aria-controls="panel6d-content" id="panel6d-header">
          <Typography ref={(elem) => (headerRef.current[5] = elem)}>
            회원정보에서 아이디와 이름변경이 안됩니다.
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <div className={styles.faqContent}>
              <p>
                회원님의 아이디 및 이름변경은 사이트 내에서 직접 수정이
                어렵습니다.
              </p>
              <p>
                회원가입시 오타 등으로 성함이 잘못 저장되었다면, 고객센터로
                연락주시면 확인 후 수정 도와드릴 수 있습니다.
              </p>
              <p>
                (단, 아이디는 고객센터에서도 수정이 어려운 회원정보이기 때문에
                최초 생성된 아이디로만 로그인 가능합니다.)
              </p>
              <p>
                고객센터 : 1600-6700 (평일 : 09:00~21:00 / 주말, 공휴일 :
                09:00~17:00)
              </p>
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel7"}
        onChange={handleChange("panel7")}
      >
        <AccordionSummary aria-controls="panel7d-content" id="panel7d-header">
          <Typography ref={(elem) => (headerRef.current[6] = elem)}>
            로그인이 안돼요. 어떻게 하나요?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <div className={styles.faqContent}>
              <p>
                1. 이메일 계정 메일 계정을 올바르게 입력하셨는지 다시 한번
                확인해주시기 바랍니다.
              </p>
              <p>
                참고 : 가입하지 않은 경우 회원가입 을 클릭하여 회원가입을
                해주시기 바랍니다.
              </p>
              <p>
                이외 메일 계정이 잘못되지 않은 경우에도 로그인이 되지 않는다면
                고객지원팀(help@specfarmer.com)으로 문의 해주시기 바랍니다.
              </p>
              <br />
              <p>
                2. 비밀번호 비밀번호를 올바르게 입력하셨는지 다시 한번
                확인해주시기 바랍니다.
              </p>
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel8"}
        onChange={handleChange("panel8")}
      >
        <AccordionSummary aria-controls="panel8d-content" id="panel8d-header">
          <Typography ref={(elem) => (headerRef.current[7] = elem)}>
            휴대폰 인증 문자가 오지 않는데 어떻게 해야 하나요?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <div className={styles.faqContent}>
              <p>문자 수신이 안될 경우에는 아래 두 가지 사항을 확인해주세요.</p>
              <br />
              <p>
                1. 휴대폰 재부팅 문자 수신 문제는 통신사와 디바이스간 연결에
                문제가 있을 수 있습니다.
              </p>
              <p>
                휴대폰 재부팅을 진행하시면 문자 수신이 정상화 되는 경우도 있으니
                우선 휴대폰 재부팅 먼저 진행해주시기 바랍니다.
              </p>
              <br />
              <p>
                2. 스팸차단 설정 확인 인증 문자가 수신되지 않는다면 인증 문자
                발송 번호가 스팸번호로 등록되어 있지 않은지 확인해주시길
                바랍니다.
              </p>
              <p>
                두 가지 사항을 확인하고도 문제가 해결되지 않는다면, 아래로 문의
                바랍니다.
              </p>
              <br />
              <p>※ 문의방법 : help@specfarmer.com</p>
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel9"}
        onChange={handleChange("panel9")}
      >
        <AccordionSummary aria-controls="panel9d-content" id="panel9d-header">
          <Typography ref={(elem) => (headerRef.current[8] = elem)}>
            회원가입은 어떻게 하나요?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <div className={styles.faqContent}>
              <p>
                스펙팜은 회원 콘텐츠 서비스를 모두 무료로 제공하고 있습니다.
              </p>
              <br />
              <p>
                ∙ 스펙팜 회원가입 방법 회원가입은 아래의 링크를 통해 진행하실 수
                있습니다.
              </p>
              <p>
                아래의 내용을 참고하여 하단의 링크를 통해 회원가입을
                진행해주세요.
              </p>
              <br />
              <a href="/join">스펙팜 회원가입 바로가기</a>
              <p></p>
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
