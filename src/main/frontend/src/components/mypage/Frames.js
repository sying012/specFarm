import { ArrowForwardIos, Close, Person, PhoneIphone } from "@mui/icons-material";
import { IconButton } from "@mui/material";

import "../../styles/mypage/Frame.css";

function Frames() {
  function deleteHandler() {
    // DB에서 날리기
  }

  return (
    <div>
      <div className="singleContainer">
        <div className="frameTitle">
          <h2>나의 텃밭</h2>
          <IconButton aria-label="details">
            <ArrowForwardIos className="detals" />
          </IconButton>
        </div>
        <div className="frameContent">
          <div className="userInfo">
            <h5>회원정보</h5>
            <div className="userContent">
              <Person color="action" inheritViewBox />
              <p className="userDetail">조유미</p>
            </div>
            <div className="userContent">
              <PhoneIphone color="action" inheritViewBox />
              <p className="userDetail">010-2***-1***</p>
            </div>
          </div>
          <div className="earned">
            <h5>취득한 자격증</h5>
            <div className="earnedContent">
              <p className="earnedCertName">정보처리기사</p>
              <p className="earnedCertDate">
                취득일: <span>2022.08.01</span>
              </p>
            </div>
            <div className="earnedContent">
              <p className="earnedCertName">전기어쩌구</p>
              <p className="earnedCertDate">
                취득일: <span>2022.08.01</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="singleContainer">
        <div className="frameTitle">
          <h2>내가 쓴 글</h2>
          <IconButton aria-label="details">
            <ArrowForwardIos className="detals" />
          </IconButton>
        </div>
        <div className="frameContent">
          <div>
            <div className="writtenTab">
              <li>
                <input type="radio" name="tab" id="ask" checked />
                <label className="tabs" for="ask">
                  무물방
                </label>
              </li>
              <li>
                <input type="radio" name="tab" id="share" />
                <label className="tabs" for="share">
                  나눔
                </label>
              </li>
            </div>
          </div>
          <div className="writtenContent">
            <h1>TitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitle</h1>
            <p>
              내가 썼던 글 내가 썼던 글 내가 썼던 글 내가 썼던 글 내가 썼던 글
              내가 썼던 글 내가 썼던 글 내가 썼던 글 내가 썼던 글 내가 썼던 글 내가 썼던 글 내가 썼던 글 내가 썼던 글
            </p>
          </div>
        </div>
      </div>

      <div className="singleContainer">
        <div className="frameTitle">
          <h2>관심 자격증</h2>
        </div>
        <div className="frameContent">
          <div className="attactive">
            <div className="attractiveCert">
              <h1>어쩌구자격증</h1>
              <IconButton aria-label="delete" className="deleteBtn" onClick={deleteHandler}>
                <Close fontSize="small" className="deleteBtn" />
              </IconButton>
            </div>
            <div className="attractiveCert">
              <h1>어쩌구자격증증증증증</h1>
              <IconButton aria-label="delete" className="deleteBtn">
                <Close fontSize="small" className="deleteBtn" />
              </IconButton>
            </div>
            <div className="attractiveCert">
              <h1>어쩌구자격증</h1>
              <IconButton aria-label="delete" className="deleteBtn">
                <Close fontSize="small" className="deleteBtn" />
              </IconButton>
            </div>
            <div className="attractiveCert">
              <h1>어쩌구자격증wmdwmdwmddddddddddddd</h1>
              <IconButton aria-label="delete" className="deleteBtn">
                <Close fontSize="small" className="deleteBtn" />
              </IconButton>
            </div>
            <div className="attractiveCert">
              <h1>어쩌구자격증</h1>
              <IconButton aria-label="delete" className="deleteBtn">
                <Close fontSize="small" className="deleteBtn" />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Frames;
