import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../app-config";
import { TextField, Stack, Pagination, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShareCard from "./ShareCard";
import styles from "../../styles/share/container.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

const ShareContainer = () => {
  const [shareList, setShareList] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [update, setUpdate] = useState(false);
  const [count, setCount] = useState(1);
  const [page, setPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");

  //share 리스트
  const getShareList = useCallback(() => {
    axios
      .get(API_BASE_URL + "/community/share", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("ACCESS_TOKEN"),
        },
        params: {
          page: page - 1,
          searchKeyword: searchKeyword,
        },
      })
      .then((response) => {
        console.log(response.data);
        setShareList(response.data.shareList.content);
        setCount(response.data.shareList.totalPages);
        window.scrollTo(0, 0);
      })
      .catch((e) => {
        console.log(e.data.error);
      });
  }, [page, searchKeyword]);

  //페이징 업데이트
  useEffect(() => {
    if (update === true) getShareList();
  }, [page, update]);

  // 검색
  const handleSearchKeyword = (e) => {
    setSearchKeyword(e.target.value);
  };

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
    getShareList();
  };

  return (
    <>
      <div className={styles.search}>
        <form onSubmit={submitSearch}>
          <TextField
            id="outlined-search"
            type="search"
            value={searchKeyword || ""}
            onChange={handleSearchKeyword}
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
            style={{ width: "280px" }}
          ></TextField>
        </form>
        <Link to="./newShare">
          <Button className={styles.newshareBtn} variant="contained">
            글쓰기
          </Button>
        </Link>
      </div>
      <div className={styles.shareCardList}>
        {shareList.map((share) => (
          <div
            key={share.shareIdx}
            onClick={() =>
              navigate(`/community/share/${share.shareIdx}`, {
                state: {
                  searchKeyword: searchKeyword,
                  page: page,
                },
              })
            }
          >
            <ShareCard key={share.shareIdx} shareItem={share} />
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

export default ShareContainer;
