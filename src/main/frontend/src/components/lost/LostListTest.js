import {
  Box,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="left">{row.calories}</TableCell>
        <TableCell align="center">{row.fat}</TableCell>
        <TableCell align="center">{row.carbs}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} unmountOnExit>
            <Box sx={{ margin: 3 }}>
              <Table size="small" aria-label="purchases">
                {row.history.map((historyRow) => (
                  <TableRow key={historyRow.date}>
                    <TableCell component="th" scope="row">
                      {historyRow.date}
                    </TableCell>
                    <TableCell>{historyRow.customerId}</TableCell>
                  </TableRow>
                ))}
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const rows = [
  createData(
    "서울",
    "[MP3/전자제품/게임기 등] USB",
    "서울여자고등학교",
    "2022.00.00"
  ),
  createData(
    "서울",
    "[MP3/전자제품/게임기 등] USB",
    "서울여자고등학교",
    "2022.00.00"
  ),
  createData(
    "서울",
    "[MP3/전자제품/게임기 등] USB",
    "서울여자고등학교",
    "2022.00.00"
  ),
  createData(
    "서울",
    "[MP3/전자제품/게임기 등] USB",
    "서울여자고등학교",
    "2022.00.00"
  ),
];

const LostListTest = () => {
  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table" size="small">
          <TableHead>
            <TableRow style={{ background: "lightgray", height: "45px" }}>
              <TableCell />
              <TableCell align="center">지사</TableCell>
              <TableCell align="center">분실 품목</TableCell>
              <TableCell align="center">분실 장소</TableCell>
              <TableCell align="center">분실 일자</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default LostListTest;
