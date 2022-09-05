import { Avatar, Badge, TextField } from "@mui/material";

import { Link } from "react-router-dom";

import styles from "../../styles/mypage/Profile.module.css";
import { Edit } from "@mui/icons-material";

function Profile({ certs, user }) {
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
                src={
                  user.profilePath === ""
                    ? "/upload/profile/farmer.png"
                    : user.profilePath
                }
                sx={{ width: 140, height: 140 }}
              />
            </Badge>
          </Link>
        </div>
        <div className={styles.profileInfo}>
          <h1 className={styles.nickname}>{user.nickname}</h1>
          <p className={styles.email}>{user.userEmail}</p>
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
