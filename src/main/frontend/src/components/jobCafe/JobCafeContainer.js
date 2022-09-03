import React from "react";
import { createTheme, Stack, Pagination } from "@mui/material";
import styles from "../../styles/skills/jobCafeContainer.module.css";
import JobCafeSearch from "./JobCafeSearch";
import JobCafeList from "./JobCafeList";
import JobCafeType from "./JobCafeType";

const JobCafeContainer = ({ jobCafeList }) => {
  //   const theme = createTheme({
  //     status: {
  //       danger: "#e53e3e",
  //     },
  //     palette: {
  //       brown: {
  //         main: "rgb(107, 83, 67)",
  //         contrastText: "#fff",
  //       },
  //       primary: {
  //         main: "rgb(187, 205, 110)",
  //         contrastText: "#fff",
  //       },
  //       secondary: {
  //         main: "#555",
  //       },
  //     },
  //   });
  return (
    <>
      <div>
        <JobCafeType />
      </div>
      <JobCafeSearch />
      <JobCafeList jobCafeList={jobCafeList} />
      <div className={styles.pageNation}>
        <Stack spacing={2}>
          <Pagination count={10} />
        </Stack>
      </div>
    </>
  );
};

export default JobCafeContainer;
