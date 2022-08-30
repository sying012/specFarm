import { useState } from "react";
import AskListItem from "../ask/AskListItem";

import styles from "../../styles/mypage/Written.module.css";

function Written({ asks, shares }) {
  console.log(asks);
  const [isVisible, setIsVisible] = useState(true);

  const handleClick = (e) => {
    setIsVisible((current) => !current);
  };

  return (
    <div>
      <div className={styles.frameContent}>
        <div>
          <div className={styles.writtenTab}>
            <li>
              <input
                className={styles.radioBtn}
                type="radio"
                name="tab"
                id="ask"
                defaultChecked
                hidden
                onClick={handleClick}
              />
              <label className={styles.tabs} htmlFor="ask">
                무물방
              </label>
            </li>
            <li>
              <input
                className={styles.radioBtn}
                type="radio"
                name="tab"
                id="share"
                hidden
                onClick={handleClick}
              />
              <label className={styles.tabs} htmlFor="share">
                나눔
              </label>
            </li>
          </div>
        </div>

        {isVisible && (
          <div className={styles.askList}>
            {asks.map((ask) => (
              <AskListItem key={ask.id} ask={ask} />
            ))}
          </div>
        )}

        {!isVisible && (
          <div>
            {shares.map((share) => (
              <div className={styles.shareList} key={share.id}>
                <img
                  src={share.shareFilePath}
                  alt="나눔이미지 파일"
                  className={styles.shareFile}
                />
                <div>
                  <div className={styles.shareListHeader}>
                    <h1 className={styles.writtenTitle}>{share.shareTitle}</h1>
                    <p>{share.shareRegDate}</p>
                  </div>
                  <p>{share.shareContent}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Written;
