import React from "react";
import styles from "../../styles/findcourse/InsertItem.module.css";
import ClearIcon from "@mui/icons-material/Clear";

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
      <ClearIcon sx={{ marginLeft: "auto", width: "20px" }} />
    </button>
  ));
};

export default InsertItem;
