import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import styles from "../../styles/findcourse/SelectCommon.module.css";
import { API_BASE_URL } from "../../app-config";

const AreaSelect = ({ selectedItem, getSelectedItem }) => {
  const [selState, setSelState] = useState({});
  const [upperList, setUpperList] = useState([]);
  const [lowerList, setLowerList] = useState([]);

  const reqUpperList = () => {
    axios({
      url: API_BASE_URL + "/skills/conditionRequest",
      method: "get",
      params: { code: "00" },
    }).then((response) => {
      // 제주 코드가 49, 50 두가지로 들어와서 필요없는 49 리스트는
      // 제외하고 지역들을 리스트에 추가
      response.data.HRDNet.srchList.scn_list.forEach((element) => {
        if (element.rsltCode !== 49) {
          // console.log(element.rsltCode);
          setUpperList((prevList) => [...prevList, element]);
        }
      });
    });
  };

  const reqLowerList = () => {
    axios({
      url: API_BASE_URL + "/skills/conditionRequest",
      method: "get",
      params: { code: "01" },
    }).then((response) => {
      setLowerList(response.data.HRDNet.srchList.scn_list);
    });
  };

  useEffect(() => {
    reqUpperList();
  }, []);

  useEffect(() => {
    if (upperList.length > 0) reqLowerList();
  }, [upperList, selState]);

  return (
    <div className={styles.selectListWrapper}>
      <ul className={styles.upperList}>
        {upperList.map(({ rsltCode, rsltName }) => (
          <li key={rsltCode}>
            <button
              onClick={() => {
                setSelState({ code: rsltCode, name: rsltName });
              }}
            >
              {rsltName}
            </button>
          </li>
        ))}
      </ul>
      <ul className={styles.lowerList}>
        {lowerList.map(({ rsltCode, rsltName }) => {
          let result;

          // 중분류 코드 앞 두자리가 대분류 코드와 같을 경우 리스트에 추가
          if (selState.code == rsltCode.toString().substr(0, 2)) {
            result = (
              <li key={rsltCode}>
                <button
                  onClick={() => {
                    if (selectedItem.length === 0) {
                      // 선택된 아이템이 없는 경우 바로 추가
                      getSelectedItem({
                        code: rsltCode + "",
                        name: selState.name + " " + rsltName,
                        which: "area",
                      });
                    } else {
                      // 선택된 아이템들을 순회하며 같은 코드가 있는지 비교 후 없으면 추가
                      if (
                        selectedItem.findIndex(
                          (item) => item.code == rsltCode
                        ) === -1
                      ) {
                        getSelectedItem({
                          code: rsltCode + "",
                          name: selState.name + " " + rsltName,
                          which: "area",
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
        })}
      </ul>
    </div>
  );
};

export default AreaSelect;
