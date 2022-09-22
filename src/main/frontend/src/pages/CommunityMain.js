import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import AskListItem from "../components/ask/AskListItem";
import "../styles/community/CommunityMain.css";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import StudyCard from "../components/study/StudyCard";
import ShareCard from "../components/share/ShareCard";
import axios from "axios";
import { API_BASE_URL } from "../app-config";

const CommunityMain = () => {
  const [studyList, setStudyList] = useState([]);
  const [askList, setAskList] = useState([]);
  const [shareList, setShareList] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: API_BASE_URL + "/community",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("ACCESS_TOKEN"),
      },
    })
      .then((response) => {
        if (response) {
          console.log(response.data);
          setStudyList(response.data.popularStudys);
          setAskList(response.data.popularAsks);
          setShareList(response.data.popularShares);
        }
      })
      .catch((e) => {
        console.log("catch문 " + e);
        // window.location.href = "/login";
      });
  }, []);

  return (
    <div>
      <div className="titleContainer">
        <div className="titlewrap">마을회관</div>
        <NavigateNextIcon style={{ margin: "auto 5px" }} />
        <NavLink to=".">
          <div className="subtitlewrap">입구</div>
        </NavLink>
      </div>

      <NavLink to="study">
        <div className="commSubtitle">
          <p>인기 품앗이👨‍👨‍👧‍👧</p>
        </div>
      </NavLink>
      <div className="popStudyContainer">
        {studyList &&
          studyList.map((studyItem) => (
            <StudyCard key={studyItem.studyIdx} studyItem={studyItem} />
          ))}
      </div>

      <NavLink to="ask">
        <div className="commSubtitle">
          <p>물어방 인기글🙋‍♀️</p>
        </div>
      </NavLink>
      <div className="popAskContainer">
        {askList &&
          askList.map((ask) => (
            <Link to={`/community/ask/${ask.askIdx}`}>
              <AskListItem key={ask.askIdx} ask={ask} />
            </Link>
          ))}
      </div>

      <NavLink to="share">
        <div className="commSubtitle">
          <p>나눔장터 인기글🧚‍♀️</p>
        </div>
      </NavLink>
      <div className="popShareContainer">
        {shareList &&
          shareList.map((shareItem) => (
            <ShareCard key={shareItem.shareIdx} shareItem={shareItem} />
          ))}
      </div>
    </div>
  );
};

export default CommunityMain;
