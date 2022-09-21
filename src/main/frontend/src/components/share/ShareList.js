import React from "react";
import ShareCard from "./ShareCard";
import styles from "../../styles/share/list.module.css";
import { useState } from "react";
import { useCallback } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../app-config";
import { useEffect } from "react";

const ShareList = () => {
  const [shareList, setShareList] = useState([]);
  const [page, setPage] = useState(1);

  //share 리스트
  const getShareList = useCallback(() => {
    axios
      .get(API_BASE_URL + "/community/share", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("ACCESS_TOKEN"),
        },
        params: {
          page: page - 1,
        },
      })
      .then((response) => {
        console.log(response);
        setShareList(response.data.shareList.content);
      })
      .catch((e) => {
        console.log(e.data.error);
      });
  }, []);

  useEffect(() => {
    getShareList();
  }, []);

  return (
    <>
      <div className={styles.shareCardList}>
        {shareList.map((share) => (
          <ShareCard key={share.shareIdx} shareItem={share} />
        ))}
      </div>
    </>
  );
};
export default ShareList;
