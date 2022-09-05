import React, { useState } from "react";
import "../styles/ask/ask.css";
import AskContent from "../components/ask/AskContent";
import AskReg from "../components/ask/AskReg";
import AskDetail from "../components/ask/AskDetail";
import { Routes, Route, NavLink } from "react-router-dom";
import AskEdit from "../components/ask/AskEdit";
import Editer from "../components/Editer";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const Ask = (props) => {
  //리스폰스롤 받아온 데이터를 사용하기위한 state, ask엔티티가 아닌 받변개수가 추가된 DTO로 응답
  const [asks, setAsks] = useState([
    {
      id: 1,
      askTitle:
        "제목1111saddddddddddsdfasdfasdgfdfdgdgsdfjhgfhdfghdfghdfghdfghdfghfdggfdhg fdghdf gdfgdfdsfgfdgfdgfdg fdggsdfdddddddddddddddddddddddddddfsa1111",
      askContent: `<p>서로를 향한 마음이
        우주의 작은 뭉쳐짐이라면
        이 아름다운 기억이 흩어져도
        사라지진 않을 거야
        잠들지 못한 바람은
        고요히 빛나는 너의 바다로
        그 안에 잠겨
        죽어도 좋으니 나
        네 품에 안겨
        너의 이름이 긴 밤을 지나
        찰나가 영원이 될 때
        얼마나 내가 널 좋아하면
        달에 네 목소리가 보여
        오색 빛 하늘 별 숲 사이로
        너라는 꽃이 피어나
        그 세상의 반을 가진다 해도
        그저 네 앞에선
        꽃에 머물고픈
        한 남자일 뿐
        오롯이 나를 비춰요
        어둠이 드리워도 눈이 부시게
        눈물조차
        반짝이는 밤의 기적을 노래하네
        너의 이름이 긴 밤을 지나
        찰나가 영원이 될 때
        얼마나 내가 널 좋아하면
        달에 네 목소리가 보여
        오색 빛 하늘 별 숲 사이로
        너라는 꽃이 피어나
        그 세상의 반을 가진다 해도
        그저 네 앞에선
        꽃에 머물고픈 남자일 뿐
        밤 하늘 수놓인 모든 것들이
        운명 위로 내리는 걸
        내 꿈에 안긴 널
        한 번 더 가득히 안아
        시간을 넘어
        빛이 닿는 세계의 바깥까지 함께
        너의 깊은 미소의
        황홀 속 일렁임은
        영원과 이어질 거야
        얼마나 내가 널 원하는지
        눈을 감아도 너와 마주쳐
        쏟아지는 달빛의 선율을 따라
        자유의 날개로 향하는 봄날엔
        너의 유일한 숨결이 분다
        또 몇 광년의 여정을 걸어도
        여전히 너에겐
        널 사랑하는 
        한 남자일 뿐
        `,
      askRegDate: "2022.08.24 10:56",
      userId: "관리자인 척",
      aCount: 12,
      certName: "정보처리기사",
      userProfileName: "/upload/profile/badge.png",
      askReply: [
        {
          askIdx: 1,
          askReplyIdx: 1,
          userId: "관리자인 척",
          userProfileName: "/upload/profile/badge.png",
          askReplyContent:
            " fdnbvnbhgjsdfghjhgsdgjhfsdfasdfasdfasfjgkhjhdsfsdfgjhsdf sdfadsgf dfgagbjhgfhhdfghdfghdfg",
          askReplyRegDate: "2022.08.21 15:45",
        },
        {
          askIdx: 1,
          askReplyIdx: 2,
          userId: "관리자인 아닌척",
          userProfileName: null,
          askReplyContent:
            " 내ㄴㅇdsfgsdjlfsjdf sdfadsgf dfgagbjhgfhhdfghdfghdfg",
          askReplyRegDate: "2022.08.21 12:32",
        },
        {
          askIdx: 1,
          askReplyIdx: 3,
          userId: "관리자인 아닌척",
          userProfileName: null,
          askReplyContent:
            " 내ㄴㅇdsfgsdjlfsjdf sdfadsgf dfgagbjhgfhhdfghdfghdfg",
          askReplyRegDate: "2022.08.21 12:32",
        },
        {
          askIdx: 1,
          askReplyIdx: 4,
          userId: "관리자인 아닌척",
          userProfileName: null,
          askReplyContent:
            " 내ㄴㅇdsfgsdjlfsjdf sdfadsgf dfgagbjhgfhhdfghdfghdfg",
          askReplyRegDate: "2022.08.21 12:32",
        },
        {
          askIdx: 1,
          askReplyIdx: 5,
          userId: "관리자인 아닌척",
          userProfileName: null,
          askReplyContent:
            " 내ㄴㅇdsfgsdjlfsjdf sdfadsgf dfgagbjhgfhhdfghdfghdfg",
          askReplyRegDate: "2022.08.21 12:32",
        },
        {
          askIdx: 1,
          askReplyIdx: 6,
          userId: "관리자인 아닌척",
          userProfileName: null,
          askReplyContent:
            " 내ㄴㅇdsfgsdjlfsjdf sdfadsgf dfgagbjhgfhhdfghdfghdfg",
          askReplyRegDate: "2022.08.21 12:32",
        },
      ],
    },
    {
      id: 2,
      askTitle: "제123132441111목11",
      askContent: "내ㄴㅇdsfgsdjlfsjdf kdhfs",
      askRegDate: "2022.08.24 10:50",
      userId: "관리자인 아닌척",
      aCount: 32,
      certName: "용접기능사",
      userProfileName: null,
      askReply: [
        {
          askIdx: 2,
          askReplyIdx: 1,
          userId: "관리자인 척",
          userProfileName: "/upload/profile/badge.png",
          askReplyContent:
            " fdnbvnbhgjsdfghjhgsdgjhfsdfasdfasdfasfjgkhjhdsfsdfgjhsdf sdfadsgf dfgagbjhgfhhdfghdfghdfg",
          askReplyRegDate: "2022.08.21 15:45",
        },
        {
          askIdx: 2,
          askReplyIdx: 2,
          userId: "관리자인 아닌척",
          userProfileName: null,
          askReplyContent:
            " 내ㄴㅇdsfgsdjlfsjdf sdfadsgf dfgagbjhgfhhdfghdfghdfg",
          askReplyRegDate: "2022.08.21 12:32",
        },
      ],
    },
  ]);

  const [certNames, setcertNames] = useState([
    { certIdx: 1, certName: "화공기사" },
    { certIdx: 2, certName: "화공기술사" },
    { certIdx: 3, certName: "정밀화학기사" },
    { certIdx: 4, certName: "화학분석기사" },
    { certIdx: 5, certName: "화학분석기능사" },
    { certIdx: 6, certName: "화약류제조기사" },
    { certIdx: 7, certName: "화약류제조산업기사" },
    { certIdx: 8, certName: "바이오화학제품제조기사" },
    { certIdx: 9, certName: "바이오화학제품제조산업기사" },
  ]);

  return (
    <div id="content">
      <div className="titleContainer">
        <div className="titlewrap">마을회관</div>
        <NavigateNextIcon style={{ margin: "auto 5px" }} />
        <NavLink to="/community/ask">
          <div className="subtitlewrap">무엇이든 물어방</div>
        </NavLink>
      </div>
      <Routes>
        <Route
          path="/"
          element={<AskContent asks={asks} certNames={certNames}></AskContent>}
        ></Route>
        <Route
          path="/:askId"
          element={<AskDetail asks={asks}></AskDetail>}
        ></Route>
        <Route
          path="/edit/:askId"
          element={<AskEdit asks={asks} certNames={certNames}></AskEdit>}
        ></Route>
        <Route path="/edit" element={<Editer></Editer>}></Route>
        <Route path="/write" element={<AskReg certNames={certNames} />}></Route>
      </Routes>
    </div>
  );
};

export default Ask;
