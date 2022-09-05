import React from "react";
import styles from "../../styles/findcourse/CourseList.module.css";
import CourseCard from "./CourseCard";

const CourseList = () => {
  return (
    <div className={styles.courseList}>
      <CourseCard />
      <CourseCard />
      <CourseCard />
      <CourseCard />
      <CourseCard />
      <CourseCard />
      <CourseCard />
      <CourseCard />
      <CourseCard />
    </div>
  );
};

export default CourseList;
