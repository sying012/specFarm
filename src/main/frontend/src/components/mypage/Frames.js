import {
  ArrowForwardIos,
  Close,
  Person,
  PhoneIphone,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useState } from "react";

import AskListItem from "../ask/AskListItem";

import styles from "../../styles/mypage/Frames.module.css";

function Frames({ certs, asks, shares }) {
  function deleteHandler() {
    // DB에서 날리기
  }

  const [isVisible, setIsVisible] = useState(true);

  const handleClick = (e) => {
    setIsVisible((current) => !current);
  };

  return (
    <div>
      <div className={styles.mypageInnerContainer}>
        <div className={styles.frameTitle}>
          <h2>나의 텃밭</h2>
          <IconButton aria-label="details" href="/mypage/userinfo">
            <ArrowForwardIos className={styles.details} />
          </IconButton>
        </div>
        <div className={styles.frameContent}>
          <div className={styles.userInfo}>
            <h5>회원정보</h5>
            <div className={styles.userContent}>
              <Person color="action" inheritViewBox />
              <p className={styles.userDetail}>조유미</p>
            </div>
            <div className={styles.userContent}>
              <PhoneIphone color="action" inheritViewBox />
              <p className={styles.userDetail}>010-2***-1***</p>
            </div>
          </div>
          <div className={styles.earned}>
            <h5>취득한 자격증</h5>

            {certs.map((cert) => (
              <div className={styles.earnedContent} key={cert.id}>
                <p className={styles.earnedCertName}>{cert.certName}</p>
                <p className={styles.earnedCertDate}>
                  취득일: {cert.earnedDate}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.mypageInnerContainer}>
        <div className={styles.frameTitle}>
          <h2>내가 쓴 글</h2>
          <IconButton aria-label="details" href="/mypage/written">
            <ArrowForwardIos className={styles.details} />
          </IconButton>
        </div>

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
              {asks.map(
                (ask) => ask.id === 1 && <AskListItem key={ask.id} ask={ask} />
              )}
            </div>
          )}

          {!isVisible && (
            <div>
              {shares.map(
                (share) =>
                  share.id === 1 && (
                    <div className={styles.shareList} key={share.id}>
                      <img
                        src={share.shareFilePath}
                        alt="나눔이미지 파일"
                        className={styles.shareFile}
                      />
                      <div>
                        <div className={styles.shareListHeader}>
                          <h1 className={styles.writtenTitle}>
                            {share.shareTitle}
                          </h1>
                          <p>{share.shareRegDate}</p>
                        </div>
                        <p>{share.shareContent}</p>
                      </div>
                    </div>
                  )
              )}
            </div>
          )}
        </div>
      </div>

      <div className={styles.mypageInnerContainer}>
        <div className={styles.frameTitle}>
          <h2>관심 자격증</h2>
        </div>
        <div className={styles.frameContent}>
          <div className={styles.attactive}>
            <div className={styles.attractiveCert}>
              <h1>어쩌구자격증</h1>
              <IconButton
                aria-label="delete"
                className="deleteBtn"
                onClick={deleteHandler}
              >
                <Close fontSize="small" className={styles.deleteBtn} />
              </IconButton>
            </div>
            <div className={styles.attractiveCert}>
              <h1>어쩌구저쩌구어쩌구저쩌구자격증</h1>
              <IconButton
                aria-label="delete"
                className="deleteBtn"
                onClick={deleteHandler}
              >
                <Close fontSize="small" className={styles.deleteBtn} />
              </IconButton>
            </div>
            <div className={styles.attractiveCert}>
              <h1>어쩌구저쩌구자격증</h1>
              <IconButton
                aria-label="delete"
                className="deleteBtn"
                onClick={deleteHandler}
              >
                <Close fontSize="small" className={styles.deleteBtn} />
              </IconButton>
            </div>
            <div className={styles.attractiveCert}>
              <h1>어쩌구저쩌구자격증</h1>
              <IconButton
                aria-label="delete"
                className="deleteBtn"
                onClick={deleteHandler}
              >
                <Close fontSize="small" className={styles.deleteBtn} />
              </IconButton>
            </div>
            <div className={styles.attractiveCert}>
              <h1>어쩌구자격증</h1>
              <IconButton
                aria-label="delete"
                className="deleteBtn"
                onClick={deleteHandler}
              >
                <Close fontSize="small" className={styles.deleteBtn} />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Frames;
