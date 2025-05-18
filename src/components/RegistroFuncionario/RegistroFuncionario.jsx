import { Cancel, SaveAlt } from "@mui/icons-material";
import { Box, TextField, Button, Alert } from "@mui/material";
import { teal } from "@mui/material/colors";
import axios from "axios";
import { useEffect, useState } from "react";
import { LinearDeterminate } from "../loading/LinearDeterminate";
import FuncionarioService from "../../Services/FuncionarioService";


export const RegistroFuncionario = ({ onCancelar }) => {

    const [mensagem, setMensagem] = useState({ tipo: '', texto: '' })

    const [dadosFuncionario, setDadosFuncionario] = useState({
        nome: "",
        cpfcnpj: "",
        telefone: "",
        cargo: "",
        setor: "",
        dataAdmissao: "",
        salario: "",
        email: "",
        senha: "",
        usuarioCriacao: "",
        usuarioAtualizacao: ""
    })

    useEffect(() => {
        if(mensagem.texto){
            const tempoMensagem = setTimeout(() => {
                setMensagem({ tipo: '' , texto: ''})
            }, 4500)
            return () => clearTimeout(tempoMensagem)
        }
    }, [mensagem])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDadosFuncionario((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSalvar = async () => {
        try {
            
            const dataAdmissao = new Date()
            const dataFormatada = dataAdmissao.toISOString()

            const payload = {
                ...dadosFuncionario,
                salario: parseFloat(dadosFuncionario.salario),
                dataAdmissao: dataFormatada
            }

            const response = await FuncionarioService.insert(payload)
            const mensagemSucesso = response.data?.mesage || 'Funcionário cadastrado com sucesso!'
            setMensagem({ tipo: 'success', texto: mensagemSucesso })
        } catch (error) {
            const mensagemErro = error.response?.data?.mesage || 'Erro ao cadastrar funcionário.'
            setMensagem({ tipo: 'error', texto: mensagemErro })
        }
    }

    return (
        <Box
            component="form"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                width: 970,
                border: 1,
                borderRadius: 2,
                borderColor: 'var(--text-primary)',
                padding: 2
            }}
        >
            {mensagem.texto && (
                
                <Alert severity={mensagem.tipo}>
                    {mensagem.texto}
                </Alert>
            )}
            <Box
                sx={{
                    display:'flex', 
                    gap: 2
                }}
            >
                <TextField
                    required
                    name="nome"
                    value={dadosFuncionario.nome}
                    onChange={handleChange}
                    label="Nome"
                    size="small"
                    sx={{ ...inputStyle, flex: 1 }}
                />
                <TextField
                    required
                    name="cpfcnpj"
                    value={dadosFuncionario.cpfcnpj}
                    onChange={handleChange}
                    label="CPF"
                    size="small"
                    sx={{ ...inputStyle, flex: 1 }}
                />
                <Button
                    sx={{
                        background: 'var(--blue-200)'
                    }}
                    variant="contained"
                    color="primary"
                    startIcon={<SaveAlt />}
                    onClick={handleSalvar}
                >
                    Salvar
                </Button>
                <Button
                    sx={{
                        border: '1px solid var(--danger)'
                    }}
                    variant="outlined"
                    color="error"
                    startIcon={<Cancel />}
                    onClick={onCancelar}
                >
                    Cancelar
                </Button>
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                    required
                    name="email"
                    value={dadosFuncionario.email}
                    onChange={handleChange}
                    label="E-mail"
                    size="small"
                    sx={{ ...inputStyle, flex: 1 }}
                />
                <TextField
                    required
                    name="senha"
                    value={dadosFuncionario.senha}
                    onChange={handleChange}
                    label="Senha"
                    type="password"
                    size="small"
                    sx={{ ...inputStyle, flex: 1 }}
                />
                <TextField
                    name="telefone"
                    value={dadosFuncionario.telefone}
                    onChange={handleChange}
                    label="Telefone"
                    size="small"
                    sx={{ ...inputStyle, flex: 1 }}
                />
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    gap: 2
                }}>
                <TextField
                    name="cargo"
                    value={dadosFuncionario.cargo}
                    onChange={handleChange}
                    label="Cargo"
                    size="small"
                    sx={{ ...inputStyle, flex: 1 }}
                />
                <TextField
                    name="setor"
                    value={dadosFuncionario.setor}
                    onChange={handleChange}
                    label="Setor"
                    size="small"
                    sx={{ ...inputStyle, flex: 1 }}
                />
                <TextField
                    required
                    name="salario"
                    value={dadosFuncionario.salario}
                    onChange={handleChange}
                    label="Salário"
                    size="small"
                    sx={{ ...inputStyle, flex: 1 }}
                />
                <TextField
                    required
                    type="date"
                    name="dataAdmissao"
                    value={dadosFuncionario.dataAdmissao}
                    onChange={handleChange}
                    label="Data Admissao"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    size="small"
                    sx={{ ...inputStyle, flex: 1 }}
                />
                <TextField
                    required
                    name="usuarioCriacao"
                    value={dadosFuncionario.usuarioCriacao}
                    onChange={handleChange}
                    label="Usuario"
                    size="small"
                    sx={{ ...inputStyle, flex: 1 }}
                />
                <TextField
                    required
                    name="usuarioAtualizacao"
                    value={dadosFuncionario.usuarioAtualizacao}
                    onChange={handleChange}
                    label="Usuario"
                    size="small"
                    sx={{ ...inputStyle, flex: 1 }}
                />
            </Box>
        </Box>
    );
};

const inputStyle = {
    '& .MuiOutlinedInput-root.Mui-focused fieldset': {
        borderColor: 'var(--blue-200)',
        borderWidth: '2px',
    },
};
