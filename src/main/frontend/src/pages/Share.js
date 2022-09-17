import React, { useState } from "react";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import NewShare from "../components/share/NewShare";
import ShareDetail from "../components/share/ShareDetail";
import ShareContainer from "../components/share/ShareContainer";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import axios from "axios";
import { API_BASE_URL } from "../app-config";
import PrivateRoute from "../lib/PrivateRoute";

const Share = () => {
  const navigate = useNavigate();

  const insertShare = (share) => {
    axios({
      method: "post",
      url: API_BASE_URL + "/community/share/newShare",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer" + sessionStorage.getItem("ACCESS_TOKEN"),
      },
      data: share,
    }).then((response) => {
      navigate(`${response.data.shareIdx}`);
    });
  };

  const [shareList, setShareList] = useState([
    // {
    //   id: 1,
    //   shareTitle: "나눔해요1111111111111111111111111111111111111",
    //   userId: "당근",
    //   userProfileName: null,
    //   regDate: "2022.08.01",
    //   content: "aaaa",
    //   itemImg:
    //     "https://cdn.pixabay.com/photo/2021/07/29/11/59/ocean-6507058__340.jpg",
    //   shareState: 0,
    //   shareReply: [
    //     {
    //       shareIdx: 1,
    //       shareReplyIdx: 1,
    //       userId: "감자",
    //       userProfileName: null,
    //       shareReplyContent: "저요 저요 저요 저요 저요 저요 저요",
    //       shareReplyDate: "2022.01.01",
    //     },
    //     {
    //       shareIdx: 1,
    //       shareReplyIdx: 2,
    //       userId: "고구마",
    //       userProfileName: null,
    //       shareReplyContent: "저요 저요 저요 저요 저요 저요 저요",
    //       shareReplyDate: "2022.01.01",
    //     },
    //     {
    //       shareIdx: 1,
    //       shareReplyIdx: 3,
    //       userId: "사과",
    //       userProfileName: null,
    //       shareReplyContent: "저요 저요 저요 저요 저요 저요 저요",
    //       shareReplyDate: "2022.01.01",
    //     },
    //     {
    //       shareIdx: 1,
    //       shareReplyIdx: 4,
    //       userId: "포도",
    //       userProfileName: null,
    //       shareReplyContent: "저요 저요 저요 저요 저요 저요 저요",
    //       shareReplyDate: "2022.01.01",
    //     },
    //   ],
    // },
    // {
    //   id: 2,
    //   shareTitle: "나눔해요2",
    //   userId: "당근",
    //   userProfileName: null,
    //   regDate: "2022.08.02",
    //   content: "aaaa",
    //   itemImg:
    //     "https://cdn.pixabay.com/photo/2021/07/29/11/59/ocean-6507058__340.jpg",
    //   shareState: 1,
    //   shareReply: [
    //     {
    //       shareIdx: 2,
    //       shareReplyIdx: 1,
    //       userId: "수박",
    //       userProfileName: null,
    //       shareReplyContent: "저요 저요 저요 저요 저요 저요 저요",
    //       shareReplyDate: "2022.01.01",
    //     },
    //     {
    //       shareIdx: 2,
    //       shareReplyIdx: 2,
    //       userId: "망고",
    //       userProfileName: null,
    //       shareReplyContent: "저요 저요 저요 저요 저요 저요 저요",
    //       shareReplyDate: "2022.01.01",
    //     },
    //   ],
    // },
    // {
    //   id: 3,
    //   shareTitle: "나눔해요3",
    //   userId: "당근",
    //   userProfileName: null,
    //   regDate: "2022.08.03",
    //   content: "aaaa",
    //   itemImg:
    //     "https://cdn.pixabay.com/photo/2021/07/29/11/59/ocean-6507058__340.jpg",
    //   shareState: 0,
    // },
    // {
    //   id: 4,
    //   shareTitle: "나눔해요4",
    //   userId: "당근",
    //   userProfileName: null,
    //   regDate: "2022.08.04",
    //   content: "aaaa",
    //   itemImg:
    //     "https://cdn.pixabay.com/photo/2021/07/29/11/59/ocean-6507058__340.jpg",
    //   shareState: 1,
    // },
    // {
    //   id: 1,
    //   shareTitle: "나눔해요1",
    //   userId: "당근",
    //   userProfileName: null,
    //   regDate: "2022.08.01",
    //   content: "aaaa",
    //   itemImg:
    //     "https://cdn.pixabay.com/photo/2021/07/29/11/59/ocean-6507058__340.jpg",
    //   shareState: 0,
    // },
    // {
    //   id: 2,
    //   shareTitle: "나눔해요2",
    //   userId: "당근",
    //   userProfileName: null,
    //   regDate: "2022.08.02",
    //   content: "aaaa",
    //   itemImg:
    //     "https://cdn.pixabay.com/photo/2021/07/29/11/59/ocean-6507058__340.jpg",
    //   shareState: 1,
    // },
    // {
    //   id: 3,
    //   shareTitle: "나눔해요3",
    //   userId: "당근",
    //   userProfileName: null,
    //   regDate: "2022.08.03",
    //   content: "aaaa",
    //   itemImg:
    //     "https://cdn.pixabay.com/photo/2021/07/29/11/59/ocean-6507058__340.jpg",
    //   shareState: 0,
    // },
    // {
    //   id: 4,
    //   shareTitle: "나눔해요4",
    //   userId: "당근",
    //   userProfileName: null,
    //   regDate: "2022.08.04",
    //   content: "aaaa",
    //   itemImg:
    //     "https://cdn.pixabay.com/photo/2021/07/29/11/59/ocean-6507058__340.jpg",
    //   shareState: 1,
    // },
  ]);
  return (
    <div>
      <div className="titleContainer">
        <div className="titlewrap">마을회관</div>
        <NavigateNextIcon style={{ margin: "auto 5px" }} />
        <NavLink to="/community/share">
          <div className="subtitlewrap">나눔 장터</div>
        </NavLink>
      </div>
      <Routes>
        <Route
          path="/"
          element={<ShareContainer shareList={shareList} />}
        ></Route>
        <Route
          path="/newShare"
          element={
            <PrivateRoute component={NewShare} insertShare={insertShare} />
          }
        ></Route>
        <Route path="/:shareIdx" element={<ShareDetail />}></Route>
      </Routes>
    </div>
  );
};

export default Share;
