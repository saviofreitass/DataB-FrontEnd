import { Cancel, SaveAlt } from "@mui/icons-material"
import { Alert, Box, Button, TextField } from "@mui/material"
import EmpregadorService from '../../Services/EmpregadorService'
import { useEffect, useState } from "react"

export const RegistroEmpregador = ({ onCancelar }) => {
    const [mensagem, setMensagem] = useState({ tipo: '', texto: '' })
    
    const [dadosEmpregador, setDadosEmpregador] = useState({
        'cnpj': '',
        'razaoSocial': '',
        'nomeFantasia': '',
        'endereco': ''
    })


    const handleSalvar = async () => {
        if (!dadosEmpregador.cnpj.trim() ||
            !dadosEmpregador.endereco.trim() ||
            !dadosEmpregador.nomeFantasia.trim() ||
            !dadosEmpregador.razaoSocial.trim() ){
                setMensagem({ tipo: 'error', texto: 'Todos os campos devem ser preenchidos!' })
                return
        }       

        try {
            const payload = {
                cnpj: dadosEmpregador.cnpj,
                razaoSocial: dadosEmpregador.razaoSocial,
                nomeFantasia: dadosEmpregador.nomeFantasia,
                endereco: dadosEmpregador.endereco
            }

            const response = await EmpregadorService.Insert(payload)
            const mensagemSucesso = response.data?.message || 'Empregador cadastrado com sucesso!'
            setMensagem({ tipo: 'success', texto: mensagemSucesso })
        } catch (error) {
            const mensagemErro = error.response?.data?.message || 'Erro ao cadastrar o empregado!'
            setMensagem({ tipo: 'error', texto: mensagemErro })
        }
    }

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
        setDadosEmpregador((prev) => ({
            ...prev,
            [name]: value,
        }))
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
                    display: 'flex',
                    gap: 2
                }}
            >
                <TextField
                    required
                    name="cnpj"
                    label="CNPJ"
                    value={dadosEmpregador.cnpj}
                    onChange={handleChange}                    
                    size="small"
                    sx={{ ...inputStyle, flex: 1 }}
                />
                <TextField
                    required
                    name="razaoSocial"
                    label="Razão social"
                    value={dadosEmpregador.razaoSocial}
                    onChange={handleChange}
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
                    name="nomeFantasia"
                    label="Nome fantasia"
                    value={dadosEmpregador.nomeFantasia}
                    onChange={handleChange}                    
                    size="small"
                    sx={{ ...inputStyle, flex: 1 }}
                />
                <TextField
                    required
                    name='endereco'
                    label="Endereço"
                    value={dadosEmpregador.endereco}
                    onChange={handleChange}                    
                    size="small"
                    sx={{ ...inputStyle, flex: 1 }}
                />
            </Box>
        </Box>
    )
}

const inputStyle = {
    '& .MuiOutlinedInput-root.Mui-focused fieldset': {
        borderColor: 'var(--blue-200)',
        borderWidth: '2px',
    }
}