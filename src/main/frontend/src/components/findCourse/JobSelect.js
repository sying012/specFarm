import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "../../styles/findcourse/SelectCommon.module.css";
import { API_BASE_URL } from "../../app-config";

const JobSelect = ({ selectedItem, getSelectedItem, active, setActive }) => {
  const [selState1, setSelState1] = useState({});
  const [selState2, setSelState2] = useState({});
  const [selState3, setSelState3] = useState({});

  const [list1, setList1] = useState([]);
  const [list2, setList2] = useState([]);
  const [list3, setList3] = useState([]);
  const [list4, setList4] = useState([]);

  const reqList1 = () => {
    axios({
      method: "get",
      url: API_BASE_URL + "/skills/conditionRequest",
      // 대분류 코드 스프링에 전달
      params: { code: "05" },
    }).then((response) => {
      // 요청한 상위 리스트를 스프링에서 받아 리스트 State에 저장
      setList1(response.data.HRDNet.srchList.scn_list);
      // console.log(response.data.HRDNet.srchList.scn_list);
    });
  };

  const reqList2 = () => {
    axios({
      method: "get",
      url: API_BASE_URL + "/skills/conditionRequest",
      // 중분류 코드 스프링에 전달
      params: { code: "06" },
    }).then((response) => {
      // 요청한 상위 리스트를 스프링에서 받아 리스트 State에 저장
      setList2(response.data.HRDNet.srchList.scn_list);
    });
  };

  const reqList3 = () => {
    axios({
      method: "get",
      url: API_BASE_URL + "/skills/conditionRequest",
      // 소분류 코드 스프링에 전달
      params: { code: "07" },
    }).then((response) => {
      // 요청한 상위 리스트를 스프링에서 받아 리스트 State에 저장
      setList3(response.data.HRDNet.srchList.scn_list);
    });
  };

  const reqList4 = () => {
    axios({
      method: "get",
      url: API_BASE_URL + "/skills/conditionRequest",
      // 중분류 코드 스프링에 전달
      params: { code: "08" },
    }).then((response) => {
      // 요청한 상위 리스트를 스프링에서 받아 리스트 State에 저장
      setList4(response.data.HRDNet.srchList.scn_list);
    });
  };

  useEffect(() => {
    reqList1();
  }, []);

  useEffect(() => {
    if (list1.length > 0) reqList2();
  }, [list1, selState1]);

  useEffect(() => {
    if (list2.length > 0) reqList3();
  }, [list2]);

  useEffect(() => {
    if (list3.length > 0) reqList4();
  }, [list3]);

  const liArray = [
    list1.map(({ rsltCode, rsltName }) => (
      <li key={rsltCode}>
        <button
          onClick={() => {
            setActive(0);
            setSelState1({ code: rsltCode, name: rsltName });
          }}
        >
          {rsltName}
        </button>
      </li>
    )),

    list2.map(({ rsltCode, rsltName }) => {
      let result;

      // 중분류 코드 앞 2자리가 대분류 코드와 같을 경우 리스트에 추가
      if (selState1.code == rsltCode.toString().substr(0, 2)) {
        result = (
          <li key={rsltCode}>
            <button
              onClick={() => {
                setActive(1);
                setSelState2({ code: rsltCode, name: rsltName });
              }}
            >
              {rsltName}
            </button>
          </li>
        );
      }
      return result;
    }),

    list3.map(({ rsltCode, rsltName }) => {
      let result;

      // 소분류 코드 앞 4자리가 중분류 코드와 같을 경우 리스트에 추가
      if (selState2.code == rsltCode.toString().substr(0, 4)) {
        result = (
          <li key={rsltCode}>
            <button
              onClick={() => {
                setActive(2);
                setSelState3({ code: rsltCode, name: rsltName });
              }}
            >
              {rsltName}
            </button>
          </li>
        );
      }
      return result;
    }),

    list4.map(({ rsltCode, rsltName }) => {
      let result;

      // 세분류 코드 앞 6자리가 소분류 코드와 같을 경우 리스트에 추가
      if (selState3.code == rsltCode.toString().substr(0, 6)) {
        result = (
          <li key={rsltCode}>
            <button
              onClick={() => {
                if (selectedItem.length === 0) {
                  // 선택된 아이템이 없는 경우 바로 추가
                  getSelectedItem({
                    code: rsltCode,
                    name: rsltName,
                    which: "job",
                  });
                } else {
                  // 선택된 아이템들을 순회하며 같은 코드가 있는지 비교 후 없으면 추가
                  if (
                    selectedItem.findIndex((item) => item.code == rsltCode) ===
                    -1
                  ) {
                    getSelectedItem({
                      code: rsltCode,
                      name: rsltName,
                      which: "job",
                    });
                  } else {
                    alert("이미 있음");
                  }
                }
              }}
            >
              {rsltName}
            </button>
          </li>
        );
      }
      return result;
    }),
  ];

  return (
    <div className={styles.selectListWrapper}>
      <ul className={styles.selectList}>{liArray[active + 1]}</ul>
    </div>
  );
};

export default JobSelect;
