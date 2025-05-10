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
import { useEffect } from 'react';
import axios from 'axios';
import { Chip } from '@mui/material';
import { UpdateFuncionario } from '../UpdateFuncionario/UpdateFuncionario';
import FuncionarioService from '../../Services/FuncionarioService';

export const TableFuncionario = () => {
  const [mostrarRegistro, setMostrarRegistro] = useState(false);
  const [dadosFuncionario, setDadosFuncionario] = useState([])
  const [editarFuncionario, setEditarFuncionario] = useState(false)
  const [funcionarioSelciocionado, setFuncionarioSelecionado] = useState(null);

  const handleAbrirRegistro = () => setMostrarRegistro(true);
  const handleFecharRegistro = () => setMostrarRegistro(false);

  const handleAbrirEdicao = (funcionario) => {
    setEditarFuncionario(true)
    setFuncionarioSelecionado(funcionario)
  }

  const carregarFuncionarios = async () => {
    try {
      const response = await FuncionarioService.get()
      setDadosFuncionario(response.data)
    } catch (error) {
      console.error("Erro ao listar funcionários: ", error)
    }
  }

  useEffect(() => {
    carregarFuncionarios()
  }, [])

  const handleFecharEdicao = () => setEditarFuncionario(false);

  useEffect(() => {
    const carregarFuncionarios = async () => {
      try {
        const response = await FuncionarioService.get()
        setDadosFuncionario(response.data)
      } catch (error) {
        console.error("Erro ao buscar funcionários: ", error)
      }
    }
    carregarFuncionarios()
  }, [])

  if (mostrarRegistro) {
    return <RegistroFuncionario onCancelar={handleFecharRegistro} />;
  }

  const formatarCPF = (cpf) => {
    if (!cpf) return ''
    return cpf.replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
  }

  return (
    <TableContainer component={Paper} sx={{ width: 870, border: 1, borderColor: 'var(--blue-200)' }}>
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
            key={dadosFuncionario.cpfcnpj}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell sx={{ color: 'var(--blue-200)', fontWeight: 'bolder' }}>
              {formatarCPF(dadosFuncionario.cpfcnpj)}
            </TableCell>
            <TableCell sx={{ color: 'var(--blue-200)', fontWeight: 'bolder' }}>{dadosFuncionario.nome}</TableCell>
            <TableCell sx={{ color: 'var(--blue-200)', fontWeight: 'bolder' }}>{dadosFuncionario.setor}</TableCell>
            <TableCell sx={{ color: 'var(--blue-200)', fontWeight: 'bolder' }}>{dadosFuncionario.cargo}</TableCell>
            <TableCell sx={{ color: 'var(--blue-200)', fontWeight: 'bolder' }}>{dadosFuncionario.empregador}</TableCell>
            <TableCell sx={{ color: 'var(--empregador)', fontWeight: 'bolder' }}>{dadosFuncionario.contador}</TableCell>
            <TableCell >
              <Chip
                label={dadosFuncionario.ativo ? 'Ativo' : 'Inativo'}
                color={dadosFuncionario.ativo ? 'success' : 'error'}
                size="small"
                variant="outlined"
              />
            </TableCell>
            <TableCell align='center'>
              <Edit
                onClick={() => handleAbrirEdicao(dadosFuncionario)}
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
      {<UpdateFuncionario
        open={editarFuncionario}
        onClose={handleFecharEdicao}
        funcionario={funcionarioSelciocionado}
        onUpdate={carregarFuncionarios}
      />}
    </TableContainer>
  );
};
