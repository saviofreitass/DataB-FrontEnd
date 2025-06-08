import { Add, CheckBox, CheckBoxOutlineBlank, Edit, SaveAlt, Search } from "@mui/icons-material";
import { Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, TextField, InputAdornment, Button, FormControlLabel } from "@mui/material";
import FuncionarioService from "../../Services/FuncionarioService";
import { useEffect, useState } from "react";
import { ModalContracheque } from "../ModalContracheque/ModalContracheque";

export const TableSalario = () => {
  const [listaFuncionario, setListaFuncionario] = useState([])
  const [mostrarModal, setMostarModal] = useState(false)
  const [busca, setBusca] = useState('')
  const [selecionados, setSelecionados] = useState([])
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState(null)
  const [lancarSalario, setLancarSalario] = useState(false)

  const handleLancarSalario = (funcionario) => {
    setFuncionarioSelecionado(funcionario)
    setMostarModal(true)
  }


  const carregarFuncionarios = async () => {
    try {
      const response = await FuncionarioService.get()
      setListaFuncionario(response.data)
    } catch (error) {
      console.error("Erro ao listar funcionários: ", error)
    }
  }

  useEffect(() => {
    carregarFuncionarios()
  }, [])

  const formatarCPF = (cpf) => {
    if (!cpf) return '';
    return cpf.replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }

  const listaFiltrada = listaFuncionario.filter(f =>
    f.pessoa.nome.toLowerCase().includes(busca.toLowerCase()) ||
    formatarCPF(f.pessoa.cpfcnpj).includes(busca)
  )

  const handleSelecionados = (id) => {
    setSelecionados((prev) =>
      prev.includes(id)
        ? prev.filter(item => item != id)
        : [...prev, id]
    )
  }

  const handleAbrirModal = () => setMostarModal(true)
  const handleFecharModal = () => setMostarModal(false)

  return (
    <TableContainer component={Paper} sx={{ width: 822, border: 1, borderColor: 'var(--blue-200)' }}>
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
          <TableCell align="left" >Selec</TableCell>
          <TableCell align="left" >CPF</TableCell>
          <TableCell align="left" >Nome</TableCell>
          <TableCell align="left" >Contador</TableCell>
          <TableCell align="left" >Contador</TableCell>
          <TableCell align="left" >Status</TableCell>
          <TableCell align="left" >Edit</TableCell>
          <TableCell align="left" >
            <Button
              type='submit'
              sx={{
                background: 'var(--blue-200)'
              }}
              variant="contained"
              color="primary"
              startIcon={<SaveAlt />}
            >
              Enviar
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
            <TableCell sx={{ color: 'var(--blue-200)', fontWeight: 'bolder' }}></TableCell>
            <TableCell sx={{ color: 'var(--blue-200)', fontWeight: 'bolder' }}></TableCell>
            <TableCell>
              <Chip
                label={funcionario.ativo ? 'Ativo' : 'Inativo'}
                color={funcionario.ativo ? 'success' : 'error'}
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