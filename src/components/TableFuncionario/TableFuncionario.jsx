import * as React from 'react';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Add, Edit } from '@mui/icons-material';
import { RegistroFuncionario } from '../RegistroFuncionario/RegistroFuncionario';

export const TableFuncionario = () => {
  const [mostrarRegistro, setMostrarRegistro] = useState(false);
  const handleAbrirRegistro = () => setMostrarRegistro(true);
  const handleFecharRegistro = () => setMostrarRegistro(false);

  function createData(nome, cpf, setor, cargo, empregador, contador, status) {
    return { nome, cpf, setor, cargo, empregador, contador, status };
  }

  const dadosFuncionario = [
    createData("João Pedro", 14608534661, 'gestao', 'desenvolvedor', 'Paulo Ricardo', 'Eduardo Feliciano', 'Ativo'),
    createData("Savio", 11111111111, 'gestao', 'desenvolvedor', 'Paulo Ricardo', 'Eduardo Feliciano', 'Ativo'),
    createData("Renato", 11111111112, 'gestao', 'desenvolvedor', 'Paulo Ricardo', 'Eduardo Feliciano', 'Ativo'),
    createData("Atila", 11111111113, 'gestao', 'desenvolvedor', 'Paulo Ricardo', 'Eduardo Feliciano', 'Ativo'),
    createData("Kaio", 11111111114, 'gestao', 'desenvolvedor', 'Paulo Ricardo', 'Eduardo Feliciano', 'Ativo'),
  ];

  if (mostrarRegistro) {
    return <RegistroFuncionario onCancelar={handleFecharRegistro} />;
  }

  return (
    <TableContainer component={Paper} sx={{ width: 850, border: 1, borderColor: 'var(--blue-200)' }}>
      <TableHead sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableRow>
          <TableCell align='left'>CPF</TableCell>
          <TableCell align='left'>Nome</TableCell>
          <TableCell align='left'>Setor</TableCell>
          <TableCell align='left'>Cargo</TableCell>
          <TableCell align='left'>Empregador</TableCell>
          <TableCell align='left'>Contador</TableCell>
          <TableCell align='left'>Status</TableCell>
          <TableCell align='left'>
            <Add
              sx={{
                color: 'var(--blue-200)',
                cursor: 'pointer',
                borderRadius: 5,
                ":hover": { backgroundColor: 'rgba(0, 123, 255, 0.2)' }
              }}
              onClick={handleAbrirRegistro}
            />
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {dadosFuncionario.map((dadosFuncionario) => (
          <TableRow
            key={dadosFuncionario.cpf}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell sx={{ color: 'var(--blue-200)', fontWeight: 'bolder' }}>{dadosFuncionario.cpf}</TableCell>
            <TableCell sx={{ color: 'var(--blue-200)', fontWeight: 'bolder' }}>{dadosFuncionario.nome}</TableCell>
            <TableCell sx={{ color: 'var(--blue-200)', fontWeight: 'bolder' }}>{dadosFuncionario.setor}</TableCell>
            <TableCell sx={{ color: 'var(--blue-200)', fontWeight: 'bolder' }}>{dadosFuncionario.cargo}</TableCell>
            <TableCell sx={{ color: 'var(--blue-200)', fontWeight: 'bolder' }}>{dadosFuncionario.empregador}</TableCell>
            <TableCell sx={{ color: 'var(--empregador)', fontWeight: 'bolder' }}>{dadosFuncionario.contador}</TableCell>
            <TableCell sx={{ color: 'var(--ativo)', fontWeight: 'bolder' }}>{dadosFuncionario.status}</TableCell>
            <TableCell align='center'>
              <Edit
                sx={{
                  color: 'var(--blue-200)',
                  cursor: 'pointer',
                  borderRadius: 5,
                  ":hover": { backgroundColor: 'rgba(0, 123, 255, 0.2)' }
                }}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </TableContainer>
  );
};
