import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../app-config";
import styles from "../../styles/mypage/SmallInfo.module.css";

const SmallInfo = ({ user }) => {
  const [certs, setCerts] = useState();
  const [attrCerts, setAttrCerts] = useState();
  const badgeArr = [];
  for (let i = 0; i < 10; i++) {
    badgeArr.push("/upload/badge/" + (i + 1) + ".png");
  }

  useEffect(() => {
    axios({
      method: "post",
      url: API_BASE_URL + "/mypage/smInfo",
      data: { userId: user.userId },
    })
      .then((response) => {
        if (response) {
          console.log(response);
          setCerts(response.data.earnedCert);
          setAttrCerts(response.data.favCerts);
        }
      })
      .catch((e) => {
        console.log("catch문 " + e);
        window.location.href = "/login";
      });
  }, [user.userId]);

  return (
    <div className={styles.mainContainer}>
      <div>
        <div className={styles.innerContainer}>
          <h1>농부ID</h1>
          <p>{user.userId}</p>
        </div>
        <div className={styles.underContainer}>
          <h1>수확한 자격증</h1>
          {certs !== null && certs !== undefined
            ? Object.keys(certs).length !== 0
              ? certs.map((cert) => (
                  <img
                    key={cert.getCertIdx}
                    src={badgeArr[cert.getCertIdx]}
                    title={cert.certName + "\n" + cert.getCertDate}
                    alt={cert.certName}
                    className={styles.getCertImg}
                  />
                ))
              : "수확한 자격증이 없습니다."
            : null}
        </div>
        <div className={styles.underContainer}>
          <h1>관심자격증</h1>
          <div className={styles.attactive}>
            {attrCerts !== null && attrCerts !== undefined
              ? Object.keys(attrCerts).length !== 0
                ? attrCerts.map((attrCert) => (
                    <div
                      key={attrCert.favCertIdx}
                      className={styles.attractiveCert}
                    >
                      <a href={`/cert/certFind/${attrCert.jmcd}`}>
                        {attrCert.certName}
                      </a>
                    </div>
                  ))
                : "관심 자격증이 없습니다."
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmallInfo;
