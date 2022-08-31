import React from "react";
import ShareCard from "./ShareCard";
import styles from "../../styles/share/list.module.css";

const ShareList = ({ shareList }) => {
  return (
    <>
      <div className={styles.shareCardList}>
        {shareList.map((share) => (
          <ShareCard key={share.id} shareItem={share} />
        ))}
      </div>
    </>
  );
};
export default ShareList;
