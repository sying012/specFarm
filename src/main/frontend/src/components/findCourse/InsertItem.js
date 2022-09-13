import React from "react";
import styles from "../../styles/findcourse/InsertItem.module.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const InsertItem = ({ selectedItem, deleteItem }) => {
  return selectedItem.map(({ name, code, which }) => (
    <button
      key={code}
      className={styles.selectedItem}
      onClick={() => {
        deleteItem(code, which);
      }}
    >
      <div>{name}</div>
      <HighlightOffIcon sx={{ marginLeft: "auto" }} />
    </button>
  ));
};

export default InsertItem;
