import * as React from 'react';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Add, Edit, Settings } from '@mui/icons-material';
import { RegistroFuncionario } from '../RegistroFuncionario/RegistroFuncionario';
import { useEffect } from 'react';
import axios from 'axios';
import { Chip } from '@mui/material';
import { UpdateFuncionario } from '../UpdateFuncionario/UpdateFuncionario';
import FuncionarioService from '../../Services/FuncionarioService';
import ContadorService from '../../Services/ContadorService'
import { DrawerConfigFilter } from '../Drawer/DrawerConfigFilter';
import { Cancel, CheckBox, Done } from "@mui/icons-material"
import { Box, Drawer, FormControlLabel, FormGroup, IconButton } from "@mui/material"
import EmpregadorService from '../../Services/EmpregadorService';
import { decodeJWT } from '../Utils/DecodeToken';

export const TableFuncionario = ({ openDrawer, idEmpregador }) => {
  const [mostrarRegistro, setMostrarRegistro] = useState(false);
  const [dadosFuncionario, setDadosFuncionario] = useState([])
  const [editarFuncionario, setEditarFuncionario] = useState(false)
  const [funcionarioSelciocionado, setFuncionarioSelecionado] = useState(null);
  const [mapaContadores, setMapaContadores] = useState({})
  const [abriDrawer, setAbrirDrawer] = useState(false)
  const [mapaEmpregadores, setMapaEmpregadores] = useState({})
  const [userId, setUserId] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const payload = decodeJWT(token)
      if (payload.id) {
        setUserId(payload.id)
      }
    }
  }, [])

  const handleOpenDrawer = () => {
    setAbrirDrawer(true)
  }

  const handleCloseDrawer = () => {

    setAbrirDrawer(false)
  }

  const handleAbrirRegistro = () => setMostrarRegistro(true);
  const handleFecharRegistro = () => setMostrarRegistro(false);

  const handleAbrirEdicao = (funcionario) => {
    setEditarFuncionario(true)
    setFuncionarioSelecionado(funcionario)
  }

  useEffect(() => {
    if (userId) {
      carregarFuncionarios()
    }
  }, [userId])

  const carregarFuncionarios = async () => {
    try {
      const response = await FuncionarioService.getByIdContador(userId)
      setDadosFuncionario(response.data)
      console.log('entrei aqui')
    } catch (error) {
      console.log('mas cheguei aqui')
      console.error("Erro ao listar funcionários: ", error)
    }
  }

    const carregarEmpregadores = async () => {
      try {
        const response = await EmpregadorService.GetByIdContador()
        const mapa = {}
        console.log(response.data)
        response.data.forEach(emp => {
          mapa[emp.id] = emp.razaoSocial
        })
        setMapaEmpregadores(mapa)
      } catch (error) {
        console.error("Erro ao buscar empregadores: ", error)
      }
    }



  useEffect(() => {
    const carregarContadores = async () => {
      try {
        const response = await ContadorService.get()
        const mapa = {}
        response.data.forEach(contador => {
          mapa[contador.id] = contador.pessoa.nome
        })
        setMapaContadores(mapa)
      } catch (error) {
        console.error("Erro ao buscar contadores: ", error)
      }
    }
    carregarFuncionarios()
    carregarContadores()
    carregarEmpregadores()
  }, [])


  const handleFecharEdicao = () => setEditarFuncionario(false);

  if (mostrarRegistro) {
    return <RegistroFuncionario onCancelar={handleFecharRegistro} idEmpregadorId={idEmpregador} />;
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
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
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
            <TableCell>
              <Settings
                sx={{
                  color: 'var(--blue-200)',
                  cursor: 'pointer',
                  borderRadius: 5,
                  ":hover": { backgroundColor: 'rgba(0, 123, 255, 0.2)' }
                }}
                onClick={handleOpenDrawer}
              />
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>
      <TableBody>
        {dadosFuncionario.map((dadosFuncionario) => (
          <TableRow
            key={dadosFuncionario.pessoa.cpfcnpj}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell sx={{ color: 'var(--blue-200)', fontWeight: 'bolder' }}>
              {formatarCPF(dadosFuncionario.pessoa.cpfcnpj)}
            </TableCell>
            <TableCell sx={{ color: 'var(--blue-200)', fontWeight: 'bolder' }}>{dadosFuncionario.pessoa.nome}</TableCell>
            <TableCell sx={{ color: 'var(--blue-200)', fontWeight: 'bolder' }}>{dadosFuncionario.setor}</TableCell>
            <TableCell sx={{ color: 'var(--blue-200)', fontWeight: 'bolder' }}>{dadosFuncionario.cargo}</TableCell>
            <TableCell sx={{ color: 'var(--blue-200)', fontWeight: 'bolder' }}>{mapaEmpregadores[dadosFuncionario.empregador?.id]}</TableCell>
            <TableCell sx={{ color: 'var(--empregador)', fontWeight: 'bolder' }}>{mapaContadores[dadosFuncionario.contador]}</TableCell>
            <TableCell >
              <Chip
                label={dadosFuncionario.pessoa.ativo ? 'Ativo' : 'Inativo'}
                color={dadosFuncionario.pessoa.ativo ? 'success' : 'error'}
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
      {
        <DrawerConfigFilter
          open={abriDrawer}
          onClose={handleCloseDrawer}
        />
      }
    </TableContainer>
  );
};
