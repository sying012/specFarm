import { Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "../../styles/findcourse/CourseList.module.css";
import CourseCard from "./CourseCard";

const CourseList = ({ searchList }) => {
  // console.log(searchList);

  const LAST_PAGE =
    searchList !== undefined
      ? searchList.length % 9 === 0
        ? parseInt(searchList.length / 9)
        : parseInt(searchList.length / 9) + 1
      : 1; // 마지막 페이지
  const [page, setPage] = useState(1); // 처음 페이지는 1이다.
  const [data, setData] = useState(searchList);

  useEffect(() => {
    // setData(/* fetch(또는 전체 데이터에서 slice)로 현재 page의 데이터를 가져온다. */);
    // 한 페이지에 9개씩 보여준다.
    if (searchList !== undefined) {
      if (page === LAST_PAGE) {
        // 마지막 페이지는 데이터가 9개보다 부족할 수도 있다.
        setData(searchList.slice(9 * (page - 1)));
      } else {
        setData(searchList.slice(9 * (page - 1), 9 * (page - 1) + 9));
      }
    } else {
      setData();
    }
  }, [searchList, page]);

  const handlePage = (event) => {
    const nowPageInt = parseInt(event.target.outerText);
    setPage(nowPageInt);
  };

  return (
    <>
      <div className={styles.courseList}>
        {data !== undefined
          ? data.map((card, index) => {
              return <CourseCard key={index} index={index} card={card} />;
            })
          : null}
      </div>
      <div className={styles.pageNation}>
        <Pagination
          count={LAST_PAGE}
          defaultPage={1}
          siblingCount={3}
          boundaryCount={1}
          onChange={(e) => handlePage(e)}
        />
      </div>
    </>
  );
};

export default CourseList;
