import React, { useEffect, useState } from "react";
import styles from "../../styles/findcourse/SelectCommon.module.css";

const AREA_OBJECT = {
  11: "서울",
  26: "부산",
  27: "대구",
  28: "인천",
  29: "광주",
  30: "대전",
  31: "울산",
  36: "세종",
  41: "경기",
  42: "강원",
  43: "충북",
  44: "충남",
  45: "전북",
  46: "전남",
  47: "경북",
  48: "경남",
  50: "제주",
};

const testArr1 = [
  { id: 1, label: "test1-1" },
  { id: 2, label: "test1-2" },
  { id: 3, label: "test1-3" },
  { id: 4, label: "test1-4" },
  { id: 5, label: "test1-5" },
];

const AREA_ARRAY = Object.entries(AREA_OBJECT).map(([k, v]) => ({
  id: k,
  label: v,
}));

const AreaSelect = ({ setArea }) => {
  const [selState, setSelState] = useState({});
  const [selectedArea, setSelectedArea] = useState();
  const [subList, setSubList] = useState([]);

  useEffect(() => {
    // 최초 렌더링 시 State 값이 없는 경우 처리
    if (!selState) {
      return;
    }
    // fetch 함수
    setSubList(testArr1);
  }, [selState]);

  useEffect(() => {
    if (!selectedArea) {
      return;
    }
    setArea(selectedArea);
  }, [selectedArea]);

  return (
    <div className={styles.selectListWrapper}>
      <ul className={styles.upperList}>
        {AREA_ARRAY.map(({ id, label }) => (
          <li key={id}>
            <button
              onClick={() => {
                setSelState({ id: id, label: label });
              }}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
      <ul className={styles.lowerList}>
        {subList.map(({ id, label }) => (
          <li key={id}>
            <button
              onClick={() => {
                setSelectedArea(selState.label + " " + label);
              }}
            >
              {label}
            </button>
          </li>
        ))}
        <>{selectedArea}</>
      </ul>
    </div>
  );
};

export default AreaSelect;
