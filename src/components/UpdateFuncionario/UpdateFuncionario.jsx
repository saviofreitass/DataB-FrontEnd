import { Alert, Box, Button, Chip, Grid, Modal, TextField } from '@mui/material';
import { Add, Cancel, Edit, SaveAlt } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import FuncionarioService from '../../Services/FuncionarioService';


export const UpdateFuncionario = ({ open, onClose, funcionario, onUpdate }) => {

    const [mensagem, setMensagem] = useState({ tipo: '', texto: '' })
    const [ativo, setAtivo] = useState()

    const [cpf, setCpf] = useState('')
    const [telefone, setTelefone] = useState('')

    const formatarCpf = (valor) => {
        return valor
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }

    const formatarTelefone = (valor) => {
        const telefoneLimpo = valor.replace(/\D/g, '')

        if (telefoneLimpo.lenght <= 10) {
            return telefoneLimpo
                .replace(/^(\d{2})(\d)/, '($1) $2')
                .replace(/(\d{4})(\d)/, '$1-$2')
        } else {
            return telefoneLimpo
                .replace(/^(\d{2})(\d)/, '($1) $2')
                .replace(/(\d{5})(\d)/, '$1-$2')
        }

        return valor
    }

    useEffect(() => {
        if (funcionario) {
            setTelefone(formatarTelefone(funcionario.telefone || ''))
            setCpf(formatarCpf(funcionario.cpfcnpj || ''))
            setAtivo(funcionario.ativo)
        }
    }, [funcionario])

    useEffect(() => {
        if (mensagem.texto) {
            const tempoSaida = setTimeout(() => setMensagem({ tipo: '', texto: '' }), 3500)
            return () => clearTimeout(tempoSaida)
        }
    }, [mensagem])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const dadosAtualizados = Object.fromEntries(formData.entries())

        if (!dadosAtualizados.senha) {
            delete dadosAtualizados.senha
        }

        dadosAtualizados.ativo = ativo
        const cpfLimpo = cpf.replace(/\D/g, '')
        dadosAtualizados.cpfcnpj = cpfLimpo
        dadosAtualizados.telefone = telefone.replace(/\D/g, '')

        try {
            const response = await FuncionarioService.update(funcionario.id, dadosAtualizados)
            const mensagemSucesso = response.data?.mesage || "Funcionário atualizado com sucesso!"
            setMensagem({ tipo: 'success', texto: mensagemSucesso })

            if (onUpdate) onUpdate()
        } catch (error) {
            const mensagemErro = error.response?.data?.mesage || "Erro ao tentar atualizar o funcionário!"
            setMensagem({ tipo: 'error', texto: mensagemErro })
            console.error("Erro ao tentar atualizar o funcionario!", error)
        }
    }

    const handleSetAtivo = () => {
        setAtivo((prev) => !prev)
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    width: 850,
                    borderRadius: 2,
                    padding: 2,
                    background: 'var(--background-color)',
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
                        gap: 2,
                    }}
                >
                    <TextField
                        name="id"
                        defaultValue={funcionario?.id}
                        InputProps={{ readOnly: true }}
                        label="Id"
                        size="small"
                        sx={{ ...inputStyle, flex: 1 }}
                    >
                    </TextField>
                    <Button
                        type='submit'
                        sx={{
                            background: 'var(--blue-200)'
                        }}
                        variant="contained"
                        color="primary"
                        startIcon={<SaveAlt />}

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
                        onClick={onClose}
                    >
                        Cancelar
                    </Button>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        gap: 2
                    }}
                >
                    <TextField
                        name="nome"
                        defaultValue={funcionario?.nome}
                        label="Nome"
                        size="small"
                        sx={{ ...inputStyle, flex: 1 }}
                    />
                    <TextField
                        name="cpfcnpj"

                        value={cpf}
                        onChange={(e) => setCpf(formatarCpf(e.target.value))}
                        label="CPF"
                        size="small"
                        sx={{ ...inputStyle, flex: 1 }}
                    />
                </Box>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                        name="email"
                        defaultValue={funcionario?.email}
                        label="E-mail"
                        size="small"
                        sx={{ ...inputStyle, flex: 1 }}
                    />
                    <TextField
                        name="senha"
                        defaultValue={funcionario?.senha}
                        label="Senha"
                        type="password"
                        size="small"
                        sx={{ ...inputStyle, flex: 1 }}
                    />
                    <TextField
                        name="telefone"
                        value={telefone}
                        onChange={(e) => setTelefone (formatarTelefone(e.target.value))}
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
                        defaultValue={funcionario?.cargo}
                        label="Cargo"
                        size="small"
                        sx={{ ...inputStyle, flex: 1 }}
                    />
                    <TextField
                        name="setor"
                        defaultValue={funcionario?.setor}
                        label="Setor"
                        size="small"
                        sx={{ ...inputStyle, flex: 1 }}
                    />
                    <TextField
                        name="salario"
                        defaultValue={funcionario?.salario}
                        label="Salário"
                        size="small"
                        sx={{ ...inputStyle, flex: 1 }}
                    />
                    <TextField
                        name="dataAdmissao"
                        defaultValue={funcionario?.dataAdmissao}
                        label="Data Admissao"
                        size="small"
                        sx={{ ...inputStyle, flex: 1 }}
                    />
                    <TextField
                        name="usuarioCriacao"
                        defaultValue={funcionario?.usuarioCriacao}
                        label="Usuario"
                        size="small"
                        sx={{ ...inputStyle, flex: 1 }}
                    />
                    <TextField
                        name="usuarioAtualizacao"
                        defaultValue={funcionario?.usuarioAtualizacao}
                        label="Usuario"
                        size="small"
                        sx={{ ...inputStyle, flex: 1 }}
                    />
                    <Chip
                        label={ativo ? 'Ativo' : 'Inativo'}
                        color={ativo ? 'success' : 'error'}
                        size="small"
                        variant="outlined"
                        clickable
                        onClick={handleSetAtivo}
                    />
                </Box>
            </Box>
        </Modal>
    )
}

const inputStyle = {
    '& .MuiOutlinedInput-root.Mui-focused fieldset': {
        borderColor: 'var(--blue-200)',
        borderWidth: '2px',
    },
};