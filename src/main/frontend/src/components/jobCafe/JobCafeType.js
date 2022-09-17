import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import styles from "../../styles/skills/jobCafeType.module.css";

//onSelectCategory: 카테고리별로 분류된 리스트 반환
const JobCafeType = ({ categories, onSelectCategory }) => {
  const onClickCategory = (category, e) => {
    e.preventDefault();
    onSelectCategory(category);
    //category === CAFE_TYPE_NM list 생성(id 생성 후)
  };

  return (
    <>
      <div className={styles.typeBox}>
        <div className={styles.allTypeBtn} active={true}>
          <a href={"/"} onClick={(e) => onClickCategory("전체", e)}>
            전체
          </a>
        </div>
        {categories.map((category, index) => (
          <div key={category + index} className={styles.typeBtns}>
            <a href={"/"} onClick={(e) => onClickCategory(category, e)}>
              {category}
            </a>
          </div>
        ))}
      </div>
    </>
  );
};

export default JobCafeType;
