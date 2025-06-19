import { Cancel, SaveAlt } from "@mui/icons-material"
import { Box, TextField, Button, Alert, InputAdornment } from "@mui/material"

import FuncionarioService from "../../Services/FuncionarioService"
import { decodeJWT } from "../../components/Utils/DecodeToken"

import { useEffect, useState } from "react"

export const RegistroFuncionario = ({ onCancelar, idEmpregadorId }) => {
    const [mensagem, setMensagem] = useState({ tipo: '', texto: '' })
    const [userId, setUserId] = useState('')
    const [dadosFuncionario, setDadosFuncionario] = useState({
        contador: "",
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
    });

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            const payload = decodeJWT(token)
            if (payload?.id) {
                setUserId(payload.id)
                setDadosFuncionario((prev) => ({
                    ...prev,
                    contador: payload.id,
                    usuarioCriacao: payload.id,
                    usuarioAtualizacao: payload.id
                }))
            }
        }
    }, [])

    useEffect(() => {
        if (mensagem.texto) {
            const tempoMensagem = setTimeout(() => {
                setMensagem({ tipo: '', texto: '' })
            }, 4500)
            return () => clearTimeout(tempoMensagem)
        }
    }, [mensagem])

    const handleChange = (e) => {
        const { name, value } = e.target
        let valorFormatado = value

        if (name === 'cpfcnpj') {
            valorFormatado = formatarCPF(value)
        }

        if (name === 'telefone') {
            valorFormatado = formatarTelefone(value)
        }

        if (name === 'salario') {
            valorFormatado = formatarSalario(value)
        }

        setDadosFuncionario((prev) => ({
            ...prev,
            [name]: valorFormatado,
        }))
    }

    const handleSalvar = async () => {
        try {
            const dataAdmissaoISO = new Date(dadosFuncionario.dataAdmissao).toISOString()

            const payload = {
                contadorId: dadosFuncionario.contador,
                empregadorId: idEmpregadorId,
                usuario: {
                    email: dadosFuncionario.email,
                    senha: dadosFuncionario.senha,
                    tipoUsuario: "ROLE_FUNCIONARIO",
                    usuarioCriacao: dadosFuncionario.usuarioCriacao || userId,
                },
                pessoa: {
                    nome: dadosFuncionario.nome,
                    cpfcnpj: dadosFuncionario.cpfcnpj.replace(/\D/g, ''),
                    telefone: dadosFuncionario.telefone.replace(/\D/g, ''),
                    ativo: true,
                },
                cargo: dadosFuncionario.cargo,
                setor: dadosFuncionario.setor,
                salario: Number(dadosFuncionario.salario.replace(/\./g, '').replace(',', '.')),
                dataAdmissao: dataAdmissaoISO,
            };

            const response = await FuncionarioService.insert(payload)
            const mensagemSucesso = response.data?.message || 'Funcionário cadastrado com sucesso!'
            setMensagem({ tipo: 'success', texto: mensagemSucesso })
        } catch (error) {
            console.error("Erro:", error);
            const mensagemErro = error.response?.data?.message || 'Erro ao cadastrar funcionário.'
            setMensagem({ tipo: 'error', texto: mensagemErro })
        }
    };

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

            <Box sx={{ display: 'flex', gap: 2 }}>
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
                    sx={{ background: 'var(--blue-200)' }}
                    variant="contained"
                    color="primary"
                    startIcon={<SaveAlt />}
                    onClick={handleSalvar}
                >
                    Salvar
                </Button>
                <Button
                    sx={{ border: '1px solid var(--danger)' }}
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

            <Box sx={{ display: 'flex', gap: 2 }}>
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
                    InputProps={{
                        startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                    }}
                    sx={{ ...inputStyle, flex: 1 }}
                />
                <TextField
                    required
                    type="date"
                    name="dataAdmissao"
                    value={dadosFuncionario.dataAdmissao}
                    onChange={handleChange}
                    label="Data Admissão"
                    InputLabelProps={{ shrink: true }}
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
    }
}

const formatarCPF = (value) => {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
};

const formatarTelefone = (value) => {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{4})\d+?$/, '$1')
};

const formatarSalario = (value) => {
    const valor = value.replace(/\D/g, '')
    const numero = (Number(valor) / 100).toFixed(2)
    return numero
        .replace('.', ',')
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}
