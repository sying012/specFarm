import { Avatar, Badge } from "@mui/material";

import { Link } from "react-router-dom";

import styles from "../../styles/mypage/Profile.module.css";
import { Edit } from "@mui/icons-material";

function Profile({ certs }) {
  const size = 18;
  const badgeArr = [];
  for (let i = 0; i < size; i++) {
    badgeArr.push("/upload/badge/" + (i + 1) + ".png");
  }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.innerContainer}>
        <div className={styles.avatar}>
          <Link to="/mypage/modify">
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={<Edit color="primary" fontSize="large" />}
            >
              <Avatar
                title="프로필 사진을 수정하려면 클릭하세요."
                alt="profile image"
                src="https://as1.ftcdn.net/v2/jpg/03/58/90/78/1000_F_358907879_Vdu96gF4XVhjCZxN2kCG0THTsSQi8IhT.jpg"
                sx={{ width: 140, height: 140 }}
              />
            </Badge>
          </Link>
        </div>
        <div className={styles.profileInfo}>
          <h1 className={styles.nickname}>닉네임</h1>
          <p className={styles.email}>bitcamp801@bitcamp.com</p>
        </div>
        <div>
          <div className={styles.badgeLabel}>
            <p>수확 현황</p>
          </div>
          <div className={styles.badges}>
            {certs.map((cert) => (
              <img
                key={cert.id}
                src={badgeArr[cert.id - 1]}
                title={cert.certName}
                alt={cert.certName}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
