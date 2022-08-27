import {
  ArrowForwardIos,
  Close,
  Person,
  PhoneIphone,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";

import styles from "../../styles/mypage/Frames.module.css";

function Frames() {
  function deleteHandler() {
    // DB에서 날리기
  }

  return (
    <div>
      <div className={styles.mypageInnerContainer}>
        <div className={styles.frameTitle}>
          <h2>나의 텃밭</h2>
          <Link to="/mypage/userinfo">
            <IconButton aria-label="details">
              <ArrowForwardIos className={styles.details} />
            </IconButton>
          </Link>
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
            <div className={styles.earnedContent}>
              <p className={styles.earnedCertName}>정보처리기사</p>
              <p className={styles.earnedCertDate}>
                취득일: <span>2022.08.01</span>
              </p>
            </div>
            <div className={styles.earnedContent}>
              <p className={styles.earnedCertName}>전기어쩌구</p>
              <p className={styles.earnedCertDate}>
                취득일: <span>2022.08.01</span>
              </p>
            </div>
            <div className={styles.earnedContent}>
              <p className={styles.earnedCertName}>전기어쩌구</p>
              <p className={styles.earnedCertDate}>
                취득일: <span>2022.08.01</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.mypageInnerContainer}>
        <div className={styles.frameTitle}>
          <h2>내가 쓴 글</h2>
          <Link to="/mypage/written">
            <IconButton aria-label="details">
              <ArrowForwardIos className={styles.details} />
            </IconButton>
          </Link>
        </div>
        <div className={styles.frameContent}>
          <div>
            <div className={styles.writtenTab}>
              <li>
                <input className={styles.radioBtn} type="radio" name="tab" id="ask" defaultChecked hidden />
                <label className={styles.tabs} htmlFor="ask">
                  무물방
                </label>
              </li>
              <li>
                <input className={styles.radioBtn} type="radio" name="tab" id="share" hidden />
                <label className={styles.tabs} htmlFor="share">
                  나눔
                </label>
              </li>
            </div>
          </div>
          <div className={styles.writtenContent}>
            <h1 className={styles.writtenTitle}>
              TitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitle
            </h1>
            <p>
              내가 썼던 글 내가 썼던 글 내가 썼던 글 내가 썼던 글 내가 썼던 글
              내가 썼던 글 내가 썼던 글 내가 썼던 글 내가 썼던 글 내가 썼던 글
              내가 썼던 글 내가 썼던 글 내가 썼던 글
            </p>
          </div>
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
