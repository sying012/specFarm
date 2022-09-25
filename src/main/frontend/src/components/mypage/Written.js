import { useState } from "react";
import AskListItem from "../ask/AskListItem";
import { NavLink } from "react-router-dom";
import WrittenShare from "./WrittenShare";

import styles from "../../styles/mypage/Written.module.css";

function Written({ asks, shares }) {
  const [isVisible, setIsVisible] = useState(true);

  const handleClick = (e) => {
    if (e.target.id === "share") {
      setIsVisible(false);
    }
    if (e.target.id === "ask") {
      setIsVisible(true);
    }
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

        {Object.keys(asks).length !== 0
          ? isVisible && (
              <div className={styles.askList}>
                {asks.map((ask) => (
                  <NavLink key={ask.askIdx} to={`/community/ask/${ask.askIdx}`}>
                    <AskListItem ask={ask} />
                  </NavLink>
                ))}
              </div>
            )
          : isVisible && (
              <div className={styles.nothingWritten}>
                작성한 물어방글이 없습니다.
              </div>
            )}

        {Object.keys(shares).length !== 0
          ? !isVisible && (
              <div>
                {shares.map((share) => (
                  <NavLink
                    key={share.shareIdx}
                    to={`/community/share/${share.shareIdx}`}
                  >
                    <WrittenShare share={share} />
                  </NavLink>
                ))}
              </div>
            )
          : !isVisible && (
              <div className={styles.nothingWritten}>
                작성한 나눔글이 없습니다.
              </div>
            )}
      </div>
    </div>
  );
}

export default Written;
