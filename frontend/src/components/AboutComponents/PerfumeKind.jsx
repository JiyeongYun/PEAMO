import React from 'react';
import './PerfumeKind.css';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
});

function createData(name, pf, edp, edt, edc) {
  return { name, pf, edp, edt, edc };
}

const rows = [
  createData('영어 표기 (약어)', 'Perfume', 'Eau De Perfume (EDP)', 'Eau De Toilett (EDT)', 'Eau De Cologne (EDC)'),
  createData('향료 농도 (%)', '20 ~ 30', '15 ~ 20', '5 ~ 15', '2 ~ 4'),
  createData('지속력 (시간)', '6 ~ 8', '4 ~ 6', '2 ~ 4', '1 ~ 2'),

];

export default function BasicTable() {
  const classes = useStyles();

  return (
    <TableContainer className="table" component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead className="table_head">
          <TableRow className="table_row">
            <TableCell className="table_head_cell">  </TableCell>
            <TableCell className="table_head_cell">퍼퓸</TableCell>
            <TableCell className="table_head_cell">오드퍼퓸</TableCell>
            <TableCell className="table_head_cell">오드뚜왈렛</TableCell>
            <TableCell className="table_head_cell">오드코롱</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="table_body">
          {rows.map((row) => (
            <TableRow className="table_row" key={row.name}>
              <TableCell className="table_body_cell" component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell className="table_body_cell">{row.pf}</TableCell>
              <TableCell className="table_body_cell">{row.edp}</TableCell>
              <TableCell className="table_body_cell">{row.edt}</TableCell>
              <TableCell className="table_body_cell">{row.edc}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
