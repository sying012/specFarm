import { Stack, Pagination } from "@mui/material";
import styles from "../../styles/skills/jobCafeContainer.module.css";
import JobCafeSearch from "./JobCafeSearch";
import JobCafeList from "./JobCafeList";
import JobCafeType from "./JobCafeType";

const JobCafeContainer = ({ jobCafeList, categories, onSelectCategory }) => {
  return (
    <>
      <div>
        <JobCafeType
          categories={categories}
          onSelectCategory={onSelectCategory}
        />
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
