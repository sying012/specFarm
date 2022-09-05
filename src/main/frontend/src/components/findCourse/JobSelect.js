import React, { useEffect, useState } from "react";
import styles from "../../styles/findcourse/SelectCommon.module.css";

const JOB_OBJECT = {
  1: "사업관리",
  2: "경영/회계/사무",
  3: "금융/보험",
  4: "교육/자연/사회과학",
  5: "법률/경찰/소방/교도/국방",
  6: "보건/의료",
  7: "사회복지/종교",
  8: "문화/예술/디자인/방송",
  9: "운전/운송",
  10: "영업판매",
  11: "경비/청소",
  12: "이용/숙박/여행/오락/스포츠",
  13: "음식서비스",
  14: "건설",
  15: "기계",
  16: "재료",
  17: "화학",
  18: "섬유/의복",
  19: "전기/전자",
  20: "정보통신",
  21: "식품가공",
  22: "인쇄/목재/가구/공예",
  23: "환경/에너지/안전",
  24: "농림어업",
};

// fetch 반환 값 state에 저장

const testArr1 = [
  { id: 1, label: "test1-1" },
  { id: 2, label: "test1-2" },
  { id: 3, label: "test1-3" },
  { id: 4, label: "test1-4" },
  { id: 5, label: "test1-5" },
];

const testArr2 = [
  { id: 1, label: "test2-1" },
  { id: 2, label: "test2-2" },
  { id: 3, label: "test2-3" },
  { id: 4, label: "test2-4" },
  { id: 5, label: "test2-5" },
];

const testArr3 = [
  { id: 1, label: "test3-1" },
  { id: 2, label: "test3-2" },
  { id: 3, label: "test3-3" },
  { id: 4, label: "test3-4" },
  { id: 5, label: "test3-5" },
];

const testArr4 = [
  { id: 1, label: "test4-1" },
  { id: 2, label: "test4-2" },
  { id: 3, label: "test4-3" },
  { id: 4, label: "test4-4" },
  { id: 5, label: "test4-5" },
];

const JOB_ARRAY = Object.entries(JOB_OBJECT).map(([k, v]) => ({
  id: k,
  label: v,
}));

const JobSelect = () => {
  const [selectedJob, setSelectedJob] = useState();
  const [active, setActive] = useState(0);

  const [selState1, setSelState1] = useState();
  const [selState2, setSelState2] = useState();
  const [selState3, setSelState3] = useState();

  const liArray = [
    testArr1.map(({ id, label }) => (
      <li key={id}>
        <button
          onClick={() => {
            setActive(0);
            setSelState1(id);
          }}
        >
          {label}
        </button>
      </li>
    )),

    testArr2.map(({ id, label }) => (
      <li key={id}>
        <button
          onClick={() => {
            setActive(1);
            setSelState2(id);
          }}
        >
          {label}
        </button>
      </li>
    )),

    testArr3.map(({ id, label }) => (
      <li key={id}>
        <button
          onClick={() => {
            setActive(2);
            setSelState3(id);
          }}
        >
          {label}
        </button>
      </li>
    )),

    testArr4.map(({ id, label }) => (
      <li key={id}>
        <button
          onClick={() => {
            setSelectedJob(label);
          }}
        >
          {label}
        </button>
      </li>
    )),
  ];

  //   useEffect(() => {
  //     if (!selectedJob) {
  //       return;
  //     }

  //     // fetch

  //     setSubList(testArr1);
  //   }, [selectedJob]);

  return (
    <>
      <div className={styles.selectListWrapper}>
        <ul className={styles.upperList}>{liArray[active]}</ul>
        {selState1 ? (
          <ul className={styles.lowerList}>{liArray[active + 1]}</ul>
        ) : (
          ""
        )}
      </div>
      <button onClick={() => setActive(Math.max(0, active - 1))}>뒤로</button>
      <div>{selState1}</div>
      <div>{selState2}</div>
      <div>{selState3}</div>
      <div>{selectedJob}</div>
    </>
  );
};

export default JobSelect;
