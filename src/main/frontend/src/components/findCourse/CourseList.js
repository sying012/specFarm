import React from "react";
import styles from "../../styles/findcourse/courseList.module.css";
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
