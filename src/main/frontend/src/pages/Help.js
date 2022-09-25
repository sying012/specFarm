import { useState } from "react";
import HelpWrite from "../components/help/HelpWrite";
import WrittenHelp from "../components/help/WrittenHelp";

import styles from "../styles/help/Help.module.css";

const Help = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClick = (e) => {
    if (e.target.id === "written") {
      setIsVisible(false);
    }
    if (e.target.id === "write") {
      setIsVisible(true);
    }
  };

  return (
    <div>
      <div className={styles.mainContainer}>
        <div className={styles.subContainer1}>
          <h1 className={styles.helpTitle}>1:1 문의</h1>
          <p className={styles.helpSubTitle}>
            스펙팜에 대해 궁금한 점을 질문해 주세요.
          </p>
          <div className={styles.helpSmallBtn}>
            <li className={styles.helpBtns}>
              <input
                className={styles.radioBtn}
                type="radio"
                name="tab"
                hidden
                id="write"
                onClick={handleClick}
                defaultChecked
              />
              <label className={styles.tabs} htmlFor="write">
                문의 작성
              </label>
            </li>
            <li className={styles.helpBtns}>
              <input
                className={styles.radioBtn}
                type="radio"
                name="tab"
                hidden
                id="written"
                onClick={handleClick}
              />
              <label className={styles.tabs} htmlFor="written">
                작성한 글
              </label>
            </li>
          </div>
          <div className={styles.helpImgBox}>
            <img
              src="/upload/cs/help/technical-support.png"
              alt="grawth"
              className={styles.helpImg}
            />
          </div>
        </div>

        <div className={styles.subContainer2}>
          {isVisible && <HelpWrite />}

          {!isVisible && <WrittenHelp />}
        </div>
      </div>
    </div>
  );
};

export default Help;
