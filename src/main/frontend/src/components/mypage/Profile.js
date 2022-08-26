import { Avatar } from "@mui/material";

import { Link } from "react-router-dom";

import avocado from "../../images/avocado.png";
import apple from "../../images/apple.png";

import styles from "../../styles/mypage/Profile.module.css";

function Profile() {
  return (
    <div className={styles.profileContainer}>
      <div className={styles.innerContainer}>
        <Link to="/mypage/modify">
          <Avatar
            title="이미지를 수정하려면 클릭하세요."
            alt="profile image"
            src="https://as1.ftcdn.net/v2/jpg/03/58/90/78/1000_F_358907879_Vdu96gF4XVhjCZxN2kCG0THTsSQi8IhT.jpg"
            sx={{ width: 140, height: 140 }}
            className={styles.avatar}
          />
        </Link>
        <div className={styles.profileInfo}>
          <h1 className={styles.nickname}>닉네임</h1>
          <p className={styles.email}>bitcamp801@bitcamp.com</p>
        </div>
        <div className={styles.badgeLabel}>
          <p>수확 현황</p>
        </div>
        <div className={styles.badges}>
          <img src={avocado} title="정보처리기사" alt="badge" />
          <img src={apple} title="전기어쩌구" alt="badge" />
        </div>
      </div>
    </div>
  );
}

export default Profile;
