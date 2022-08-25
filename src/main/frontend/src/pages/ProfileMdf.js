import { Close, PhotoCamera } from "@mui/icons-material";
import {
  Avatar,
  Button,
  createTheme,
  IconButton,
  ThemeProvider,
} from "@mui/material";
import "../styles/mypage/ProfileMdf.css";

function ProfileMdf() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "rgb(187, 205, 110)"
      },
    },
  });
  return (
    <div>
      <div className="mdfContainer">
        <h1 className="mdfTitle">프로필 수정</h1>
        <Avatar
          alt="profile image"
          src="https://as1.ftcdn.net/v2/jpg/03/58/90/78/1000_F_358907879_Vdu96gF4XVhjCZxN2kCG0THTsSQi8IhT.jpg"
          sx={{ width: 160, height: 160 }}
          className="avatar"
        />
        <div className="profilePicMdfBtns">
          <Button variant="outlined" startIcon={<PhotoCamera />}>
            사진 올리기
          </Button>
          <Button variant="outlined">삭제</Button>
        </div>
        <div className="nickname">
          <h2 className="nicknameTitle">닉네임</h2>
        </div>
        <div>
          <input type="text" value="공부하자" />
          <IconButton aria-label="delete" className="deleteBtn">
            <Close fontSize="small" className="deleteBtn" />
          </IconButton>
        </div>
        <div className="profileMdfBtns">
          <Button variant="outlined" className="profileCancelBtn">
            취소
          </Button>
          <ThemeProvider theme={theme}>
            <Button
              color="primary"
              variant="contained"
              className="profileApplyBtn"
            >
              적용
            </Button>
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
}

export default ProfileMdf;
