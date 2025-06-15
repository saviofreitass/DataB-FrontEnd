import { Add, CheckBox, CheckBoxOutlineBlank, Edit, SaveAlt, Search } from "@mui/icons-material";
import { Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, TextField, InputAdornment, Button, FormControlLabel } from "@mui/material";

import FuncionarioService from "../../Services/FuncionarioService";
import ContrachequeService from '../../Services/ContrachequeService';
import EmpregadorService from '../../Services/EmpregadorService';
import ContadorService from '../../Services/ContadorService'

import { useEffect, useState } from "react";

import { ModalContracheque } from "../ModalContracheque/ModalContracheque";
import { ModalConfirmacao } from "../ModalConfirmacao/ModalConfirmacao";

import { decodeJWT } from '../Utils/DecodeToken'
import { ModalInfo } from "../ModalSucesso/ModalInfo";


export const TableSalario = () => {

  const [dadosFuncionario, setDadosFuncionario] = useState([])
  const [mostrarModal, setMostarModal] = useState(false)
  const [busca, setBusca] = useState('')
  const [selecionados, setSelecionados] = useState([])
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState(null)
  const [confirmacaoAberta, setConfrimacaoAberta] = useState(false)
  const [contadorId, setContadorId] = useState('')
  const [dadosContador, setDadosContador] = useState([])
  const [mapaEmpregadores, setMapaEmpregadores] = useState({})
  const [empregadores, setEmpregadores] = useState([])
  const [enviando, setEnviando] = useState(false)
  const [sucessoAberto, setSucessoAberto] = useState(false)

  const handleAbrirConfirmacao = () => {
    setConfrimacaoAberta(true)
  }

  const handleFecharConfirmacao = () => {
    setConfrimacaoAberta(false)
  }
 
  const handleLancarSalario = (funcionario) => {
    setFuncionarioSelecionado(funcionario)
    setMostarModal(true)
  }

  const handleAbrirModal = () => setMostarModal(true)
  const handleFecharModal = () => setMostarModal(false)

  const formatarCPF = (cpf) => {
    if (!cpf) return '';
    return cpf.replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
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
      console.error('Erro ao carregar funcionários:', error)
    }
  }

  const carregarContador = async () => {
    try {
      if (contadorId) {
        const response = await ContadorService.getId(contadorId)
        setDadosContador(response.data)
      }
    } catch (error) {
      console.error('Erro ao carregar contador:', error)
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
      console.error('Erro ao carregar empregadores:', error)
    }
  }

  useEffect(() => {
    carregarFuncionarios()
    carregarContador()
    carregarEmpregadores()
  }, [contadorId])

  const listaFiltrada = dadosFuncionario.filter(f =>
    f.pessoa.nome.toLowerCase().includes(busca.toLowerCase()) ||
    formatarCPF(f.pessoa.cpfcnpj).includes(busca)
  )

  const handleSelecionados = (id) => {
    setSelecionados((prev) =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  const enviarFolhasSelecionadas = async () => {
    if (selecionados.length === 0) {
      alert('Selecione pelo menos um funcionário para enviar os contracheques')
      return
    }

    setEnviando(true)
    try {
      const contrachequesSalvos = JSON.parse(localStorage.getItem('contracheques')) || []

      const contrachequesParaEnviar = contrachequesSalvos.filter(cc =>
        selecionados.includes(cc.funcId))

      if (contrachequesParaEnviar.length === 0) {
        alert('Nenhum contracheque encontrado para os funcionários selecionados')
        return
      }
      for (const contracheque of contrachequesParaEnviar) {
        try {
          await ContrachequeService.Inserir(contracheque)
          console.log(`Contracheque do funcionário ${contracheque.funcId} enviado com sucesso`)
        } catch (error) {
          console.error(`Erro ao enviar contracheque do funcionário ${contracheque.funcId}:`, error)
        }
      }

      const contrachequesRestantes = contrachequesSalvos.filter(cc =>
        !selecionados.includes(cc.funcId)
      )
      localStorage.setItem('contracheques', JSON.stringify(contrachequesRestantes))


      setSucessoAberto(true)
      setSelecionados([])
    } catch (error) {
      console.error('Erro ao enviar folhas de pagamento:', error)
      alert('Ocorreu um erro ao enviar as folhas de pagamento')
    } finally {
      setEnviando(false)
      setConfrimacaoAberta(false)
    }
  }

  return (
    <TableContainer
      component={Paper}
      sx={{ width: 880, border: 1, borderColor: 'var(--blue-200)' }}
    >
      <TextField
        onChange={(e) => setBusca(e.target.value)}
        placeholder="Digite o conteúdo de busca"
        size="small"
        sx={{
          ...inputStyle,
          flex: 1,
          width: '100%',
          marginTop: '20px',
          borderLeft: 'none',
          borderRight: 'none'
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search sx={{ color: 'var(--blue-200)' }} />
            </InputAdornment>
          )
        }}
      />
      <TableHead>
        <TableRow>
          <TableCell align="left">Selec</TableCell>
          <TableCell align="left">CPF</TableCell>
          <TableCell align="left">Nome</TableCell>
          <TableCell align="left">Contador</TableCell>
          <TableCell align="left">Empregador</TableCell>
          <TableCell align="left">Status</TableCell>
          <TableCell align="left">Edit</TableCell>
          <TableCell align="left">
            <Button
              onClick={handleAbrirConfirmacao}
              sx={{
                background: 'var(--blue-200)'
              }}
              variant="contained"
              color="primary"
              startIcon={<SaveAlt />}
              disabled={enviando || selecionados.length === 0}
            >
              {enviando ? 'Enviando...' : 'Enviar'}
            </Button>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {listaFiltrada.map((funcionario) => (
          <TableRow key={funcionario.id}>
            <TableCell>
              {selecionados.includes(funcionario.id) ? (
                <CheckBox
                  onClick={() => handleSelecionados(funcionario.id)}
                  sx={{
                    color: 'var(--ativo)',
                    cursor: 'pointer',
                    borderRadius: 5,
                    ":hover": { backgroundColor: 'rgba(0, 123, 255, 0.2)' }
                  }}
                />
              ) : (
                <CheckBoxOutlineBlank
                  onClick={() => handleSelecionados(funcionario.id)}
                  sx={{
                    color: 'var(--blue-200)',
                    cursor: 'pointer',
                    borderRadius: 5,
                    ":hover": { backgroundColor: 'rgba(0, 123, 255, 0.2)' }
                  }}
                />
              )}
            </TableCell>
            <TableCell sx={{ color: 'var(--blue-200)', fontWeight: 'bolder' }}>{formatarCPF(funcionario.pessoa.cpfcnpj)}</TableCell>
            <TableCell sx={{ color: 'var(--blue-200)', fontWeight: 'bolder' }}>{funcionario.pessoa.nome}</TableCell>
            <TableCell sx={{ color: 'var(--blue-200)', fontWeight: 'bolder' }}>{dadosContador?.pessoa?.nome}</TableCell>
            <TableCell sx={{ color: 'var(--empregador)', fontWeight: 'bolder' }}>{mapaEmpregadores[funcionario.empregadorId] || 'Não encontrado'}</TableCell>
            <TableCell>
              <Chip
                label={funcionario.pessoa.ativo ? 'Ativo' : 'Inativo'}
                color={funcionario.pessoa.ativo ? 'success' : 'error'}
                size="small"
                variant="outlined"
              />
            </TableCell>
            <TableCell>
              <Edit
                sx={{
                  color: 'var(--blue-200)',
                  cursor: 'pointer',
                  borderRadius: 5,
                  ":hover": { backgroundColor: 'rgba(0, 123, 255, 0.2)' }
                }}
                onClick={() => handleLancarSalario(funcionario)}
              />
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        ))}
        <ModalContracheque
          open={mostrarModal}
          onClose={handleFecharModal}
          funcionario={funcionarioSelecionado}
          empregador={empregadores.find(emp => emp.id === funcionarioSelecionado?.empregadorId)}
        />
        <ModalConfirmacao
          open={confirmacaoAberta}
          onClose={handleFecharConfirmacao}
          onConfirm={enviarFolhasSelecionadas}
          title="Confirmar Envio"
          message={`Deseja enviar os contracheques dos ${selecionados.length} funcionários selecionados?`}
          subMessage="Esta ação fará o envio da folha de pagamento de todos os funcionários selecionados!"
        />
        <ModalInfo
          open={sucessoAberto}
          onClose={() => setSucessoAberto(false)}
        />
      </TableBody>
    </TableContainer>
  );
};

const inputStyle = {
  '& .MuiOutlinedInput-root.Mui-focused fieldset': {
    borderColor: 'var(--blue-200)',
    borderWidth: '2px',
  },
};