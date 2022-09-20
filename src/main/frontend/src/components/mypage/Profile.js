import { Avatar, Badge } from "@mui/material";

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
                  !user.userProfileName
                    ? "/upload/profile/farmer.png"
                    : "/upload/profile/" + user.userProfileName
                }
                sx={{ width: 140, height: 140 }}
              />
            </Badge>
          </Link>
        </div>
        <div className={styles.profileInfo}>
          <h1 className={styles.nickname}>{user.userNick}</h1>
          <p className={styles.email}>
            {user.userEmail || "이메일을 등록해주세요."}
          </p>
        </div>
        <div>
          <div className={styles.badgeLabel}>
            <p>수확 현황</p>
          </div>
          <div className={styles.badges}>
            {Object.keys(certs).length !== 0 ? (
              certs.map((cert) => (
                <img
                  key={cert.getCertIdx}
                  src={badgeArr[cert.getCertIdx]}
                  title={cert.certName}
                  alt={cert.certName}
                />
              ))
            ) : (
              <div className={styles.nothingCerts}>
                자격증 수확하러 갈까요?!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
