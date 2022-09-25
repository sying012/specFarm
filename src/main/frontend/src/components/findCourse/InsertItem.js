import React from "react";
import styles from "../../styles/findcourse/InsertItem.module.css";
import ClearIcon from "@mui/icons-material/Clear";

const InsertItem = ({ selectedItem, deleteItem }) => {
  return selectedItem.map(({ name, code, which }) => (
    <button key={code} className={styles.selectedItem}>
      <div>{name}</div>
      <ClearIcon
        sx={{ marginLeft: "auto", width: "20px", cursor: "pointer" }}
        onClick={() => {
          deleteItem(code, which);
        }}
      />
    </button>
  ));
};

export default InsertItem;
