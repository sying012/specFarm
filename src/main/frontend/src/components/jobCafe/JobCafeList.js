import React from "react";
import JobCafeCard from "./JobCafeCard";
import styles from "../../styles/skills/jobCafeList.module.css";

const JobCafeList = ({ jobCafeList }) => {
  return (
    <>
      <div className={styles.jobCafeList}>
        {jobCafeList.map((jobCafe) => (
          <JobCafeCard key={jobCafe.id} jobCafeItem={jobCafe} />
        ))}
      </div>
    </>
  );
};

export default JobCafeList;
