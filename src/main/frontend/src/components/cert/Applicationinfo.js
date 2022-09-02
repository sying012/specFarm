import React from "react";
import styles from "../../styles/cert/CertFind.module.css";

const Applicationinfo = () => {
  return (
    <div>
      <ui>
        <li className={styles.appInfoTitle}>접수확인 및 수험표 출력기간</li>
        <li className={styles.appInfoCon}>
          접수당일부터 시험시행일까지 출력가능(이외 기간은 조회불가) 합니다.
          또한 출력장애 등을 대비하여 사전에 출력 보관하시기 바랍니다.
        </li>
        <br />
        <li className={styles.appInfoTitle}>
          접수상태(접수완료, 수험표출력, 미결제)를 클릭하면 각 접수상태에 따라
          다음 단계화면으로 이동합니다.
        </li>
        <li className={styles.appInfoCon}>
          접수완료, 수험표출력 : 수험표 출력화면으로 이동
        </li>
        <li className={styles.appInfoCon}>
          미결제 : 원서접수내용 확인 화면으로 이동
        </li>
        <li className={styles.appInfoCon}>입금대기중 : 가상계좌번호 조회</li>
        <br />
        <li className={styles.appInfoTitle}>
          접수 수수료 결제마감 시한(국가기술자격만 해당) : 원서접수 마감일
          18:00시까지 단, 원서작성 완료후 접수수수료 미결제상태인 다음의 경우는
          결제가능.
        </li>
        <li className={styles.appInfoCon}>
          정기검정 - 계좌이체 및 신용카드 결제신청시는 시험응시장소에
          수용여유인원이 있을 경우(다음날 12:00시까지)
        </li>
        <br />
        <li className={styles.appInfoTitle}>
          가상계좌 채번 및 수수료 입금 기한 (정기, 상시 공통)
        </li>
        <li className={styles.appInfoCon}>
          인터넷접수기간 중 가상계좌번호를 부여받은 후 아래 기한까지 인터넷
          수험원서 접수 수수료를 입금하지 않으면 수험원서 제출이 자동취소
          됩니다.
        </li>
        <li className={styles.appInfoCon}>
          가상계좌 입금시 수험자의 주거래은행 신용도 및 창구이용 입금,
          자동화기기 이용입금 시 각각의 은행별로 정해진 입금수수료가 부과될 수
          있습니다.
        </li>
      </ui>
    </div>
  );
};

export default Applicationinfo;
