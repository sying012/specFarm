import { Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "../../styles/findcourse/CourseList.module.css";
import CourseCard from "./CourseCard";

const CourseList = ({ searchList }) => {
  // console.log(searchList);
  let id = 0;

  const LAST_PAGE =
    searchList.length % 9 === 0
      ? parseInt(searchList.length / 9)
      : parseInt(searchList.length / 9) + 1; // 마지막 페이지
  const [page, setPage] = useState(1); // 처음 페이지는 1이다.
  const [data, setData] = useState(searchList);

  useEffect(() => {
    // setData(/* fetch(또는 전체 데이터에서 slice)로 현재 page의 데이터를 가져온다. */);
    // 한 페이지에 9개씩 보여준다.
    if (page === LAST_PAGE) {
      // 마지막 페이지는 데이터가 9개보다 부족할 수도 있다.
      setData(searchList.slice(9 * (page - 1)));
    } else {
      setData(searchList.slice(9 * (page - 1), 10 * (page - 1) + 9));
    }
  }, [searchList, page]);

  const handlePage = (event) => {
    const nowPageInt = parseInt(event.target.outerText);
    setPage(nowPageInt);
  };

  return (
    <>
      <div className={styles.courseList}>
        {data.map((card) => {
          return <CourseCard key={id++} card={card} />;
        })}
      </div>
      <div className={styles.pageNation}>
        <Pagination
          count={LAST_PAGE}
          defaultPage={1}
          boundaryCount={2}
          onChange={(e) => handlePage(e)}
        />
      </div>
    </>
  );
};

export default CourseList;
