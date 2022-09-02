import React from "react";
import styles from "../../styles/cert/CertFind.module.css";

const Basicsinfo = () => {
  return (
    <div>
      <ui>
        <li className={styles.appInfoTitle}>
          시험 시작시간 이후 입실 및 응시가 불가하며, 수험표 및 접수내역
          사전확인을 통한 시험장 위치, 시험장 입실가능 시간을 숙지하시기
          바랍니다.
        </li>
        <li className={styles.appInfoCon}>
          시험 준비물 - 공단인정 신분증(바로가기), 수험표, 흑색 사인펜(PBT시험),
          수정테이프 , 계산기[필요시], 흑색 볼펜류 필기구(필답, 기술사 필기),
          계산기[필요시], 공학용계산기는 일부 등급에서 제한된 모델로만 사용이
          가능하므로 사전에 필히 확인 후 지참 바랍니다.
        </li>
        <li className={styles.appInfoCon}>
          부정행위 관련 유의사항 - 시험 중 다음과 같은 행위를 하는 자는
          국가기술자격법 제10조 제6항의 규정에 따라 당해 검정을 중지 또는 무효로
          하고 3년간 국가기술자격법에 의한 검정을 받을 자격이 정지됩니다.
        </li>
        <li className={styles.appInfoCon}>
          부정행위 관련 유의사항 - 시험 중 다음과 같은 행위를 하는 자는
          국가기술자격법 제10조 제6항의 규정에 따라 당해 검정을 중지 또는 무효로
          하고 3년간 국가기술자격법에 의한 검정을 받을 자격이 정지됩니다.
        </li>
      </ui>
    </div>
  );
};

export default Basicsinfo;
