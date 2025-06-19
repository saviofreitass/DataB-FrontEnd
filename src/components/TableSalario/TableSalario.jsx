import { CheckBox, CheckBoxOutlineBlank, Edit, PendingOutlined, SaveAlt, Search } from "@mui/icons-material"
import { Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, TextField, InputAdornment, Button } from "@mui/material"
import { CheckCircleOutline, ErrorOutline } from '@mui/icons-material'

import FuncionarioService from "../../Services/FuncionarioService"
import ContrachequeService from '../../Services/ContrachequeService'
import EmpregadorService from '../../Services/EmpregadorService'
import ContadorService from '../../Services/ContadorService'

import { useEffect, useState } from "react"

import { ModalContracheque } from "../ModalContracheque/ModalContracheque"
import { ModalConfirmacao } from "../ModalConfirmacao/ModalConfirmacao"

import { decodeJWT } from '../Utils/DecodeToken'
import { ModalInfo } from "../ModalInfo/ModalInfo"


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
  const [mensagem, setMensagem] = useState('')
  const [tipoModal, setTipoModal] = useState('sucesso')
  const [statusEnvio, setEnvioStatus] = useState({})

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
      setMensagem('Selecione pelo menos um funcionário para enviar os contracheques.')
      setTipoModal('erro')
      setSucessoAberto(true)
      return
    }

    setEnviando(true)
    setConfrimacaoAberta(false)

    const contrachequesSalvos = JSON.parse(localStorage.getItem('contracheques')) || [];
    const contrachequesParaEnviar = contrachequesSalvos.filter(cc =>
      selecionados.includes(cc.funcId)
    );

    if (contrachequesParaEnviar.length === 0) {
      setMensagem('Nenhum contracheque encontrado para os funcionários selecionados!')
      setTipoModal('erro')
      setSucessoAberto(true)
      setEnviando(false)
      return
    }

    const erros = []
    const enviadosComSucesso = []
    const mensagensErro = []

    for (const contracheque of contrachequesParaEnviar) {
      try {
        const resposta = await ContrachequeService.Inserir(contracheque)

        if (resposta?.data?.success === false) {
          throw new Error(resposta.data.message || 'Erro no backend')
        }

        enviadosComSucesso.push(contracheque.funcId);
        setEnvioStatus(prev => ({ ...prev, [contracheque.funcId]: 'success' }))
      } catch (error) {
        const mensagemErro = error?.response?.data?.message || error?.message || 'Erro desconhecido'
        erros.push({
          funcId: contracheque.funcId,
          mensagem: mensagemErro
        });
        mensagensErro.push(`Funcionário: ${contracheque.funcId} -> ${mensagemErro}`)
        setEnvioStatus(prev => ({ ...prev, [contracheque.funcId]: 'error' }))
      }
    }

    if (enviadosComSucesso.length > 0) {
      const contrachequesRestantes = contrachequesSalvos.filter(cc =>
        !enviadosComSucesso.includes(cc.funcId)
      );
      localStorage.setItem('contracheques', JSON.stringify(contrachequesRestantes))
    }

    if (erros.length === 0) {
      setMensagem('Folha de pagamento enviada com sucesso!')
      setTipoModal('sucesso')
      setSelecionados([])
    } else if (enviadosComSucesso.length === 0) {
      setMensagem(mensagensErro.join('\n'))
      setTipoModal('erro')
    } else {
      setMensagem(`Alguns contracheques foram enviados, mas ocorreram erros em outros:\n\n${mensagensErro.join('\n')}`)
      setTipoModal('aviso')
    }

    setSucessoAberto(true)
    setEnviando(false)
  }


  const handleFecharModalInfo = () => {
    setSucessoAberto(false)
    setMensagem('')
  }

  return (
    <>
      <TextField
        onChange={(e) => setBusca(e.target.value)}
        placeholder="Digite o conteúdo de busca"
        size="small"
        sx={{
          ...inputStyle,
          flex: 1,
          width: '1183px',
          marginTop: '20px',
          borderLeft: 'none',
          borderRight: 'none',
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search sx={{ color: 'var(--blue-200)' }} />
            </InputAdornment>
          )
        }}
      />
      <TableContainer
        component={Paper}
        sx={{ width: 1183, border: 1, borderColor: 'var(--blue-200)' }}
      >
        <TableHead>
          <TableRow>
            <TableCell align="left">Selec</TableCell>
            <TableCell align="left">CPF</TableCell>
            <TableCell align="left">Nome</TableCell>
            <TableCell align="left">Contador</TableCell>
            <TableCell align="left">Empregador</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left">Edit</TableCell>
            <TableCell align="left">Log</TableCell>
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
              <TableCell>
                {statusEnvio[funcionario.id] === 'success' ? (
                  <CheckCircleOutline sx={{ color: 'var(--ativo)' }} />
                ) : statusEnvio[funcionario.id] === 'error' ? (
                  <ErrorOutline sx={{ color: 'var(--danger)' }} />
                ) : (
                  <PendingOutlined sx={{ color: '#ff9966' }} />
                )}
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
            onClose={handleFecharModalInfo}
            tipo={tipoModal}
            mensagem={mensagem}
          />
        </TableBody>
      </TableContainer>
    </>
  );
};

const inputStyle = {
  '& .MuiOutlinedInput-root.Mui-focused fieldset': {
    borderColor: 'var(--blue-200)',
    borderWidth: '2px',
  },
};