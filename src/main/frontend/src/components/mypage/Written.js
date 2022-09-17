import { useState } from "react";
import AskListItem from "../ask/AskListItem";

import styles from "../../styles/mypage/Written.module.css";
import { NavLink } from "react-router-dom";

function Written({ asks, shares }) {
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
              <NavLink key={ask.askIdx} to={`/community/ask/${ask.askIdx}`}>
                <AskListItem ask={ask} />
              </NavLink>
            ))}
          </div>
        )}

        {!isVisible && (
          <div>
            {shares.map((share) => (
              <NavLink
                key={share.shareIdx}
                to={`/community/share/${share.shareIdx}`}
              >
                <div className={styles.shareList}>
                  <img
                    src={share.itemImg}
                    alt="나눔이미지 파일"
                    className={styles.shareFile}
                  />
                  <div className={styles.shareContainer}>
                    <div className={styles.shareListHeader}>
                      <h1 className={styles.writtenTitle}>
                        {share.shareTitle}
                      </h1>
                      <p className={styles.shareRegDate}>{share.regDate}</p>
                    </div>
                    <p className={styles.shareContent}>{share.content}</p>
                  </div>
                </div>
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Written;
