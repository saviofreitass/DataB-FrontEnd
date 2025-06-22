import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
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

import EmpregadorService from '../../Services/EmpregadorService';
import { decodeJWT } from '../Utils/DecodeToken';

export const TableFuncionario = ({ openDrawer  }) => {
  const [mostrarRegistro, setMostrarRegistro] = useState(false);
  const [dadosFuncionario, setDadosFuncionario] = useState([])
  const [editarFuncionario, setEditarFuncionario] = useState(false)
  const [funcionarioSelciocionado, setFuncionarioSelecionado] = useState(null);
  const [abriDrawer, setAbrirDrawer] = useState(false)
  const [mapaEmpregadores, setMapaEmpregadores] = useState({})
  const [contadorId, setContadorId] = useState('')
  const [dadosContador, setDadosContador] = useState([{}])
  const [empregadores, setEmpregadores] = useState([])

  const { empregadorSelecionado } = useOutletContext();

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

  const handleFecharEdicao = () => setEditarFuncionario(false);


  const formatarCPF = (cpf) => {
    if (!cpf) return ''
    return cpf.replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const payload = decodeJWT(token)
      setContadorId(payload.id)
    }
  }, [])

  const carregarFuncionarios = async () => {
    try {
      if (contadorId) {
        const response = await FuncionarioService.getByIdContador(contadorId)
        setDadosFuncionario(response.data)
      }
    } catch (error) {
      console.error('Deu erro no carregar funionários')
    }
  }

  const carregarContador = async () => {
    try {
      if (contadorId) {
        const response = await ContadorService.getId(contadorId)
        setDadosContador(response.data)
      }
    } catch (error) {
      console.error('Deu erro no carregar contador')
    }
  }

  const carregarEmpregadores = async () => {
    try {
      if (contadorId) {
        const response = await EmpregadorService.GetByIdContador()
        setEmpregadores(response.data)
        const mapa = {}
        response.data.forEach(emp => {
          mapa[emp.id] = emp.razaoSocial
        })
        setMapaEmpregadores(mapa)
      }
    } catch (error) {
      console.error('Deu erro no carregar empregadores')
    }
  }

  useEffect(() => {
    carregarFuncionarios()
    carregarContador()
    carregarEmpregadores()
  }, [contadorId])

  if (mostrarRegistro) {
    return <RegistroFuncionario onCancelar={handleFecharRegistro} idEmpregadorId={empregadorSelecionado} />;
  }

  return (
    <TableContainer component={Paper} sx={{ maxWidth: '98%', border: 1, borderColor: 'var(--blue-200)' }}>
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
        <TableBody>
          {dadosFuncionario.map((dadosFuncionario) => (
            <TableRow
              key={dadosFuncionario.pessoa.cpfcnpj}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell sx={{ color: 'var(--blue-200)', fontWeight: 'bolder', whiteSpace: 'nowrap' }}>
                {formatarCPF(dadosFuncionario.pessoa.cpfcnpj)}
              </TableCell>
              <TableCell sx={{ color: 'var(--blue-200)', fontWeight: 'bolder', whiteSpace: 'nowrap' }}>{dadosFuncionario.pessoa.nome}</TableCell>
              <TableCell sx={{ color: 'var(--blue-200)', fontWeight: 'bolder', whiteSpace: 'nowrap' }}>{dadosFuncionario.setor}</TableCell>
              <TableCell sx={{ color: 'var(--blue-200)', fontWeight: 'bolder', whiteSpace: 'nowrap' }}>{dadosFuncionario.cargo}</TableCell>
              <TableCell sx={{ color: 'var(--blue-200)', fontWeight: 'bolder', whiteSpace: 'nowrap' }}>{mapaEmpregadores[dadosFuncionario.empregadorId] || 'Não encontrado'}</TableCell>
              <TableCell sx={{ color: 'var(--empregador)', fontWeight: 'bolder', whiteSpace: 'nowrap' }}>{dadosContador?.pessoa?.nome}</TableCell>
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
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
