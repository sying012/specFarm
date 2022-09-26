import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../app-config";
import WrittenItem from "../../components/help/WrittenItem";

import styles from "../../styles/help/WrittenHelp.module.css";

const WrittenHelp = () => {
  const [helpList, setHelpList] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: API_BASE_URL + "/cs/help",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("ACCESS_TOKEN"),
      },
    })
      .then((response) => {
        if (response) {
          console.log(response);
          setHelpList(response.data.helpList);
        }
      })
      .catch((e) => {
        console.log("catch문 " + e);
        window.location.href = "/login";
      });
  }, []);

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <h1 className={styles.helpTitle}>작성한 1:1 문의</h1>
      <div className={styles.mainContainer}>
        {helpList &&
          helpList.map((help) => (
            <WrittenItem
              key={help.helpIdx}
              help={help}
              expanded={expanded}
              handleChange={handleChange}
              setHelpList={setHelpList}
            />
          ))}
      </div>
    </div>
  );
};

export default WrittenHelp;
