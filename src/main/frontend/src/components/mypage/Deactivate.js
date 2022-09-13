import { Check } from "@mui/icons-material";
import { Button, createTheme, IconButton } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../app-config";

import styles from "../../styles/mypage/Deactivate.module.css";

function Deactivate() {
  const [userId, setUserId] = useState();

  useEffect(() => {
    axios({
      method: "get",
      url: API_BASE_URL + "/mypage/modify",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("ACCESS_TOKEN"),
      },
    })
      .then((response) => {
        if (response.data) {
          setUserId(response.data.userId);
        }
      })
      .catch((e) => {
        console.log("catch문 " + e);
        window.location.href = "/login";
      });
  }, []);

  // mui button 테마 지정
  const theme = createTheme({
    palette: {
      primary: {
        main: "#1d5902",
        contrastText: "#fff",
      },
    },
  });

  // 탈퇴 버튼 클릭 시 체크박스 미체크시 alert창 및 포커스
  const [checked, setChecked] = useState(false);
  const deactivateCheckbox = () => {
    setChecked(!checked);
  };

  const deactivate = (e) => {
    if (!checked) {
      e.preventDefault();
      alert("안내 사항에 동의해주세요.");
    }
  };

  return (
    <div>
      <div className={styles.mdfContainer}>
        <h1 className={styles.mdfTitle}>회원 탈퇴</h1>
        <p className={styles.deactivateSub}>
          회원탈퇴를 신청하기 전에 안내 사항을 꼭 확인해주세요.
        </p>

        <div className={styles.conditions}>
          <IconButton aria-label="details" style={{ padding: 2 }}>
            <Check fontSize="small" />
          </IconButton>
          <div>
            <p>
              사용하고 계신 아이디({userId})는 탈퇴할 경우 재사용 및 복구가
              불가능합니다.
            </p>
            <p className={styles.fontColorGray}>
              <span className={styles.fontColorRed}>
                탈퇴한 아이디는 본인과 타인 모두 재사용 및 복구가 불가
              </span>
              하오니 신중하게 선택하시기 바랍니다.
            </p>
          </div>
        </div>
        <div className={styles.conditions}>
          <IconButton aria-label="details" style={{ padding: 2 }}>
            <Check fontSize="small" />
          </IconButton>
          <div>
            <p>
              탈퇴 후 회원정보 및 개인형 서비스 이용기록은 모두 삭제 됩니다.
            </p>
            <p className={styles.fontColorGray}>
              회원정보 등 개인형 서비스 이용기록은 모두 삭제되며, 삭제된
              데이터는 복구되지 않습니다.
            </p>
            <p className={styles.fontColorGray}>
              삭제되는 내용을 확인하시고 필요한 데이터는 미리 백업을 해주세요.
            </p>
          </div>
        </div>
        <div className={styles.conditions}>
          <IconButton aria-label="details" style={{ padding: 2 }}>
            <Check fontSize="small" />
          </IconButton>
          <div>
            <p>
              탈퇴 후에도 게시판형 서비스에 등록한 게시물은 그대로 남아
              있습니다.
            </p>
            <p className={styles.fontColorGray}>
              게시글 및 댓글은 탈퇴 시 자동 삭제되지 않고 그대로 남아 있습니다.
            </p>
            <p className={styles.fontColorGray}>
              삭제를 원하는 게시글이 있다면{" "}
              <span className={styles.fontColorRed}>
                반드시 탈퇴 전 비공개 처리하거나 삭제하시기 바랍니다.
              </span>
            </p>
            <p className={styles.fontColorGray}>
              탈퇴 후에는 회원정보가 삭제되어 본인 여부를 확인할 수 있는 방법이
              없어, 게시글을 임의로 삭제해드릴 수 없습니다.
            </p>
          </div>
        </div>
        <hr className={styles.decativateHr} />

        <div className={styles.fontWeightBold}>
          <p className={styles.fontColorRed}>
            탈퇴 후에는 아이디{" "}
            <span className={styles.fontColorGreen}>{userId}</span>로 다시
            가입할 수 없으며 아이디와 데이터는 복구할 수 없습니다.
          </p>
          <p className={styles.fontColorRed}>
            게시판형 서비스에 남아 있는 게시글은 탈퇴 후 삭제할 수 없습니다.
          </p>
        </div>
        <div className={styles.conditionCheck}>
          <input
            type="checkbox"
            id="deactivateCheckbox"
            onClick={deactivateCheckbox}
          />
          <label htmlFor="deactivateCheckbox">
            안내 사항을 모두 확인하였으며, 이에 동의합니다.
          </label>
        </div>

        <div className={styles.deactivateBtns}>
          <Button
            variant="outlined"
            color="primary"
            className={styles.profileCancelBtn}
            href="/mypage/userinfo"
            theme={theme}
          >
            취소
          </Button>
          <Button
            color="primary"
            variant="contained"
            theme={theme}
            id={styles.profileApplyBtn}
            onClick={deactivate}
            href="/mypage/pwcheck"
          >
            탈퇴
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Deactivate;
