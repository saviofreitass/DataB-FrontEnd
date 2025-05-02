import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getSpeedDialActionUtilityClass } from '@mui/material';
import { Add, Edit } from '@mui/icons-material';

export const TableContador = () => {

  function createData(nome, cpfcnpj, empregador, status){
    return { nome, cpfcnpj, empregador, status}
  }

  const rows = [
    createData("João Pedro", 14608534661, 'Data C', 'Ativo'),
    createData("Savio", 11111111111, 'Data C', 'Ativo'),
    createData("Renato", 11111111112, 'Data C', 'Ativo'),
    createData("Atila", 11111111113, 'Data C', 'Ativo'),
    createData("Kaio", 11111111114, 'Data C', 'Ativo'),
  ];

  return(
    <TableContainer component={Paper} sx={{ width: 470, border: 1, borderColor: 'var(--blue-200)' }}>
      <TableHead sx={{minWidth: 850 }} aria-label='simple table'>
        <TableRow>
          <TableCell align='left'>CPF</TableCell>
          <TableCell align='left'>Nome</TableCell>
          <TableCell aling='left'>Empregador</TableCell>
          <TableCell aling='left'>Status</TableCell>
          <TableCell aling='left'><Add sx={{color: 'var(--blue-200)', cursor: 'pointer', borderRadius: 5, ":hover":{ backgroundColor: 'rgba(0, 123, 255, 0.2)' }}}/></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((rows) => (
          <TableRow
            key={rows.cpf}
            sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
          >
            <TableCell component='th' scope='row' sx={{ color: 'var(--blue-200)', fontWeight: 'bolder' }}>{rows.cpfcnpj}</TableCell>
            <TableCell component='th' scope='row' sx={{ color: 'var(--blue-200)', fontWeight: 'bolder' }}>{rows.nome}</TableCell>
            <TableCell component='th' scope='row' sx={{ color: 'var(--blue-200)', fontWeight: 'bolder' }}>{rows.empregador}</TableCell>
            <TableCell component='th' scope='row' sx={{ color: 'var(--ativo)', fontWeight: 'bolder' }}>{rows.status}</TableCell>
            <TableCell aling='center'><Edit sx={{color: 'var(--blue-200)', cursor: 'pointer', borderRadius: 5, ":hover":{ backgroundColor: 'rgba(0, 123, 255, 0.2)' }}}/></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </TableContainer>
  )
}