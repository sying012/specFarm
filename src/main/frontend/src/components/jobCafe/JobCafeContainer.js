import { Stack, Pagination, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import styles from "../../styles/skills/jobCafeContainer.module.css";
import JobCafeCard from "./JobCafeCard";
import { useLocation, useNavigate } from "react-router";
import { useState } from "react";
import { useEffect } from "react";

const JobCafeContainer = ({ jobCafeList, categories, onSelectCategory }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [update, setUpdate] = useState(false);
  const [count, setCount] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [page, setPage] = useState(1);

  //검색
  const handleSearchKeyword = (e) => {
    setSearchKeyword(e.target.value);
  };

  //페이징 업데이트
  useEffect(() => {
    //if (update === true) //jobCafeList;
  }, [page, update]);

  useEffect(() => {
    setUpdate(false);
    if (location.state == null) {
      setSearchKeyword("");
      setPage(1);
    } else {
      setPage(location.state.page);
      setSearchKeyword(location.state.searchKeyword);
      setUpdate(true);
    }
  }, [location.key]);

  useEffect(() => {
    setUpdate(true);
  }, [searchKeyword]);

  const submitSearch = (e) => {
    setPage(1);
    e.preventDefault();
    //jobCafeList();
  };

  //onSelectCategory: 카테고리별로 분류된 리스트 반환
  const onClickCategory = (e, category) => {
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
            <a href={"/"} onClick={() => onClickCategory(category)}>
              {category}
            </a>
          </div>
        ))}
      </div>
      <div className={styles.search}>
        <TextField
          id="outlined-search"
          type="search"
          InputProps={{
            startAdornment: <SearchIcon color="action" />,
          }}
          size="small"
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#8cbf75",
              },
            },
          }}
          style={{ width: "288px" }}
        ></TextField>
      </div>
      <div className={styles.jobCafeList}>
        {jobCafeList.map((jobCafe, index) => (
          <div
            key={jobCafe.jobCafeIdx}
            onClick={() =>
              navigate(`/skills/jobCafe/${jobCafe.jobCafeIdx}`, {
                state: {
                  searchKeyword: searchKeyword,
                  page: page,
                },
              })
            }
          >
            <JobCafeCard key={index} index={index} jobCafeItem={jobCafe} />
          </div>
        ))}
      </div>
      <div className={styles.pageNation}>
        <Stack spacing={2}>
          <Pagination
            count={count} //총 페이지 수
            page={page} //현재 페이지
            onChange={(e, p) => {
              setPage(p);
            }}
          />
        </Stack>
      </div>
    </>
  );
};

export default JobCafeContainer;
