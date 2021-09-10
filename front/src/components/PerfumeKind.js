import React from 'react'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

function createData(name, pf, edp, edt, edc) {
  return { name, pf, edp, edt, edc };
}

const rows = [
  createData('영어 표기 (약어)', 'Perfume', 'Eau De Perfume (EDP)', 'Eau De Toilett (EDT)', 'Eau De Cologne (EDC)'),
  createData('향료 농도 (%)', '20 ~ 30', '15 ~ 20', '5 ~ 15', '2 ~ 4'),
  createData('지속력 (시간)', '6 ~ 8', '4 ~ 6', '2 ~ 4', '1 ~ 2'),
];

function PerfumeKind() {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>  </TableCell>
          <TableCell>퍼퓸</TableCell>
          <TableCell>오드퍼퓸</TableCell>
          <TableCell>오드뚜왈렛</TableCell>
          <TableCell>오드코롱</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => {
          <TableRow key={row.name}>
            <TableCell component="th" scope="row">
              {row.name}
            </TableCell>
            <TableCell>{row.pf}</TableCell>
            <TableCell>{row.edp}</TableCell>
            <TableCell>{row.edt}</TableCell>
            <TableCell>{row.edc}</TableCell>
          </TableRow>
        })}
      </TableBody>
    </Table>
  )
}

export default PerfumeKind