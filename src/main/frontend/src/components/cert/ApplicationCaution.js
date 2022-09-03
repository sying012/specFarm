import React from "react";
import styles from "../../styles/cert/CertFind.module.css";

const ApplicationCaution = () => {
  return (
    <div>
      <ui>
        <li className={styles.appInfoTitle}>원서접수시 유의사항</li>
        <li className={styles.appInfoCon}>
          원서접수는 온라인(인터넷, 모바일앱)에서만 가능합니다.
        </li>
        <li className={styles.appInfoCon}>
          스마트폰, 태블릿PC 사용자는 모바일앱 프로그램을 설치한 후 접수 및
          취소/환불 서비스를 이용하시기 바랍니다.
        </li>
        <br />
        <li className={styles.appInfoTitle}>
          접수가능한 사진 범위 등 변경사항
        </li>
        <li className={styles.appInfoCon}>
          필기시험 사진상이자는 신분확인 시까지 실기원서접수가 불가합니다.
          원서접수 지부(사)로 본인이 신분증 및 규격사진(화일)을 지참 후 확인
          받으시기 바랍니다
        </li>
        <li className={styles.appInfoCon}>
          장애인 수험자는 원서접수 시 장애유형 및 편의요청사항을 선택하여
          접수하고, 장애인 증빙서류를 제출해야 편의제공을 받으실 수 있습니다.
        </li>
      </ui>
    </div>
  );
};

export default ApplicationCaution;
