import { Alert, Box, Button, Chip, Grid, Modal, TextField } from '@mui/material';
import { Add, Cancel, Edit, SaveAlt } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import axios from 'axios';


export const UpdateFuncionario = ({ open, onClose, funcionario }) => {

    const [mensagem, setMensagem] = useState({ tipo: '', texto: '' })

    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const dadosAtualizados = Object.fromEntries(formData.entries())

        axios.put(`http://localhost:8080/funcionario/${funcionario.id}`, dadosAtualizados)
            .then((response) => {
                const mensagemSucesso = response.data?.mensagem || "Funcionário atualizado com sucesso!"
                setMensagem({tipo: 'success', texto: mensagemSucesso})
            })
            .catch(error => {
                const mensagemErro = error.response?.data?.mensagem || "Erro ao tentar atualizar o funcionário!"
                setMensagem({ tipo: 'error', texto: mensagemErro })
                console.error("Erro ao tentar atualizar o funcionario!", error)
            })
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
                        InputProps={{ readOnly: true  }}
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
                        defaultValue={funcionario?.cpfcnpj}
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
                        defaultValue={funcionario?.telefone}
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