import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Add, Edit } from '@mui/icons-material';
import ContadorService from '../../Services/ContadorService';
import { useState, useEffect } from 'react';
import { Chip } from '@mui/material';

export const TableContador = () => {

  const [dadosContadores, setDadosContadores] = useState([])

  const GetContadores = async () => {
    try {
      const response = await ContadorService.get()
      setDadosContadores(response.data)
    } catch (error) {

    }
  }

  useEffect(() => {
    GetContadores()
  }, [])

  return (
    <TableContainer component={Paper} sx={{ width: 650, border: 1, borderColor: 'var(--blue-200)' }}>
      <TableHead sx={{ minWidth: 850 }} aria-label='simple table'>
        <TableRow>
          <TableCell align='left'>CPF</TableCell>
          <TableCell align='left'>CRC</TableCell>
          <TableCell align='left'>Nome</TableCell>
          <TableCell align='left'>Empregador</TableCell>
          <TableCell align='left'>Status</TableCell>
          <TableCell align='left'><Add sx={{ color: 'var(--blue-200)', cursor: 'pointer', borderRadius: 5, ":hover": { backgroundColor: 'rgba(0, 123, 255, 0.2)' } }} /></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {dadosContadores.map((contador) => (
          <TableRow
            key={dadosContadores.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component='th' scope='row' sx={{ color: 'var(--blue-200)', fontWeight: 'bolder' }}>{contador.pessoa.cpfcnpj}</TableCell>
            <TableCell component='th' scope='row' sx={{ color: 'var(--blue-200)', fontWeight: 'bolder' }}>{contador.crc}</TableCell>
            <TableCell component='th' scope='row' sx={{ color: 'var(--blue-200)', fontWeight: 'bolder' }}>{contador.pessoa.nome}</TableCell>
            <TableCell component='th' scope='row' sx={{ color: 'var(--blue-200)', fontWeight: 'bolder' }}>{contador.empregador}</TableCell>
            <TableCell >
              <Chip
                label={contador.pessoa.ativo ? 'Ativo' : 'Inativo'}
                color={contador.pessoa.ativo ? 'success' : 'error'}
                size="small"
                variant="outlined"
              />
            </TableCell>
            <TableCell align='center'><Edit sx={{ color: 'var(--blue-200)', cursor: 'pointer', borderRadius: 5, ":hover": { backgroundColor: 'rgba(0, 123, 255, 0.2)' } }} /></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </TableContainer>
  )
}