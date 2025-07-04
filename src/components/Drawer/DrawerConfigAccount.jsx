import { Drawer, Box, Typography, TextField, Button, Alert } from '@mui/material'
import { useEffect, useState } from 'react'
import ContadorService from '../../Services/ContadorService'

export const DrawerConfigAccount = ({ open, onClose, dados }) => {
    const [contador, setContador] = useState({
        nome: '',
        email: '',
        telefone: '',
        crc: '',
        cpfcnpj: ''
    })

    const [alert, setAlert] = useState(null)

    useEffect(() => {
        if (dados) {
            setContador({
                nome: dados.pessoa.nome || '',
                email: dados.usuario.email || '',
                telefone: dados.pessoa.telefone || '',
                crc: dados.crc || '',
                cpfcnpj: dados.pessoa.cpfcnpj || ''
            })
        }
    }, [dados])

    const handleChange = (e) => {
        const { name, value } = e.target
        setContador(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSalvar = async () => {
        try {
            await ContadorService.put(dados.id, {
                id: dados.id,
                pessoa: {
                    id: dados.pessoa.id,
                    nome: contador.nome,
                    telefone: contador.telefone,
                    cpfcnpj: contador.cpfcnpj
                },
                usuario: {
                    id: dados.usuario.id,
                    email: contador.email
                },
                crc: contador.crc
            })
            setAlert({ tipo: 'success', mensagem: 'Dados atualizados com sucesso!' })
        } catch (error) {
            const mensagemErro = error?.response.data.message || error?.message || 'Não foi possível atualizar os dados da sua conta.'
            console.error('Erro ao atualizar dados:', error)
            setAlert({ tipo: 'error', mensagem: mensagemErro })
        }
    }

    return (
        <Drawer
            anchor='right'
            open={open}
            onClose={onClose}
        >
            <Box sx={{ width: 300, padding: 3 }}>
                <Typography variant='h6' gutterBottom>
                    Configurações da Conta
                </Typography>

                {alert && (
                    <Alert severity={alert.tipo} sx={{ mb: 2 }}>
                        {alert.mensagem}
                    </Alert>
                )}

                <TextField
                    label='Nome'
                    name='nome'
                    value={contador.nome}
                    onChange={handleChange}
                    fullWidth
                    size='small'
                    sx={{ mb: 2 }}
                />
                <TextField
                    label='Email'
                    name='email'
                    value={contador.email}
                    onChange={handleChange}
                    fullWidth
                    size='small'
                    sx={{ mb: 2 }}
                />
                    <TextField
                        label='Senha'
                        name='senha'
                        type='password'
                        value={contador.senha}
                        onChange={handleChange}
                        fullWidth
                        size='small'
                        sx={{ mb: 2 }}
                    />
                <TextField
                    label='Telefone'
                    name='telefone'
                    value={contador.telefone}
                    onChange={handleChange}
                    fullWidth
                    size='small'
                    sx={{ mb: 2 }}
                />
                <TextField
                    label='CRC'
                    name='crc'
                    value={contador.crc}
                    onChange={handleChange}
                    fullWidth
                    size='small'
                    sx={{ mb: 2 }}
                />
                <TextField
                    label='CPF/CNPJ'
                    name='cpfcnpj'
                    value={contador.cpfcnpj}
                    onChange={handleChange}
                    fullWidth
                    size='small'
                    sx={{ mb: 2 }}
                />

                <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                    <Button
                        variant='contained'
                        sx={{ background:'var(--blue-200)', cursor: 'pointer' }}
                        onClick={handleSalvar}
                    >
                        Salvar
                    </Button>
                    <Button
                        variant='outlined'
                        color='error'
                        onClick={onClose}
                    >
                        Fechar
                    </Button>
                </Box>
            </Box>
        </Drawer>
    )
}
