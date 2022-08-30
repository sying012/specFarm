import React from "react";
import styles from "../../styles/share/list.module.css";
import ShareCard from "./ShareCard";
import searchIcon from "../../images/loupe.png";

const ShareList = ({ shareList }) => {
  return (
    <>
      <div className={styles.shareSearchBar}>
        <form action="" className={styles.search}>
          <input type="text" className={styles.aaaaa}></input>
          <button type="submit" className={styles.searchBtn}>
            <img src={searchIcon} alt="" style={{ width: "100%" }} />
          </button>
        </form>
        <button
          type="button"
          className={styles.newshareBtn}
          onClick={() => {
            window.location = "./share/newShare";
          }}
        >
          글쓰기
        </button>
      </div>
      <div className={styles.shareCardList}>
        {shareList.map((share) => (
          <ShareCard key={share.id} shareItem={share} />
        ))}
      </div>
    </>
  );
};
export default ShareList;
