import { Alert, Box, Button, Chip, Modal, TextField } from '@mui/material'
import { Cancel, SaveAlt } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import FuncionarioService from '../../Services/FuncionarioService'

const inputStyle = {
    '& .MuiOutlinedInput-root.Mui-focused fieldset': {
        borderColor: 'var(--blue-200)',
        borderWidth: '2px',
    },
}

export const UpdateFuncionario = ({ open, onClose, funcionario = null, onUpdate }) => {
    const [mensagem, setMensagem] = useState({ tipo: '', texto: '' })
    const [ativo, setAtivo] = useState(false)
    const [cpf, setCpf] = useState('')
    const [telefone, setTelefone] = useState('')
    const [formData, setFormData] = useState({
        id: '',
        pessoa: { nome: '', cpfcnpj: '', telefone: '' },
        usuario: { email: '' },
        cargo: '',
        setor: '',
        salario: '',
        dataAdmissao: ''
    });

    const formatarDataParaAPI = (dataString) => {
        if (!dataString) return null

        try {
            const date = new Date(dataString)
            return date.toISOString()
        } catch (e) {
            console.error("Erro ao formatar data:", e)
            return null;
        }
    }


    const formatarDataParaInput = (dataAPI) => {
        if (!dataAPI) return ''

        try {
            if (typeof dataAPI === 'string' && dataAPI.match(/^\d{4}-\d{2}-\d{2}$/)) {
                return dataAPI
            }

            const date = new Date(dataAPI);
            if (!isNaN(date.getTime())) {
                return date.toISOString().split('T')[0];
            }

            return ''
        } catch (e) {
            console.error("Erro ao formatar data para input:", e)
            return ''
        }
    }

    useEffect(() => {
        if (funcionario) {
            setFormData({
                ...funcionario,
                pessoa: funcionario.pessoa || { nome: '', cpfcnpj: '', telefone: '' },
                usuario: funcionario.usuario || { email: '' },
                dataAdmissao: formatarDataParaInput(funcionario.dataAdmissao)
            });
            setTelefone(formatarTelefone(funcionario.pessoa?.telefone || ''))
            setCpf(formatarCpf(funcionario.pessoa?.cpfcnpj || ''))
            setAtivo(funcionario.ativo || false)
        } else {
            setFormData({
                id: '',
                pessoa: { nome: '', cpfcnpj: '', telefone: '' },
                usuario: { email: '' },
                cargo: '',
                setor: '',
                salario: '',
                dataAdmissao: ''
            })
            setTelefone('')
            setCpf('')
            setAtivo(false)
        }
    }, [funcionario, open])

    const formatarCpf = (valor) => {
        if (!valor) return ''
        return valor
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    }

    const formatarTelefone = (valor) => {
        if (!valor) return ''
        const telefoneLimpo = valor.replace(/\D/g, '')

        if (telefoneLimpo.length <= 10) {
            return telefoneLimpo
                .replace(/^(\d{2})(\d)/, '($1) $2')
                .replace(/(\d{4})(\d)/, '$1-$2');
        } else {
            return telefoneLimpo
                .replace(/^(\d{2})(\d)/, '($1) $2')
                .replace(/(\d{5})(\d)/, '$1-$2');
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target

        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }))
        }
    }

    const handleSetAtivo = () => {
        setAtivo(prev => !prev);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const senhaInput = e.currentTarget.elements.namedItem('senha')?.value

        const dadosAtualizados = {
            ...formData,
            ativo,
            pessoa: {
                ...formData.pessoa,
                cpfcnpj: cpf.replace(/\D/g, ''),
                telefone: telefone.replace(/\D/g, '')
            },
            dataAdmissao: formatarDataParaAPI(formData.dataAdmissao),
            usuario: {
                ...formData.usuario,

                ...(senhaInput && { senha: senhaInput })
            }
        }

        if (!senhaInput) {
            delete dadosAtualizados.usuario.senha
        }

        try {
            const response = await FuncionarioService.update(formData.id, dadosAtualizados)
            setMensagem({ tipo: 'success', texto: response.data?.message || "Funcionário atualizado com sucesso!" })
            if (onUpdate) onUpdate()
        } catch (error) {
            setMensagem({ tipo: 'error', texto: error.response?.data?.message || "Erro ao atualizar funcionário!" })
            console.error("Erro ao atualizar funcionário:", error)
        }
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

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                        name="id"
                        value={formData.id || ''}
                        InputProps={{ readOnly: true }}
                        label="Id"
                        size="small"
                        sx={{ ...inputStyle, flex: 1 }}
                    />
                    <Button
                        type='submit'
                        sx={{ background: 'var(--blue-200)' }}
                        variant="contained"
                        color="primary"
                        startIcon={<SaveAlt />}
                    >
                        Salvar
                    </Button>
                    <Button
                        sx={{ border: '1px solid var(--danger)' }}
                        variant="outlined"
                        color="error"
                        startIcon={<Cancel />}
                        onClick={onClose}
                    >
                        Cancelar
                    </Button>
                </Box>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                        name="pessoa.nome"
                        value={formData.pessoa.nome || ''}
                        onChange={handleChange}
                        label="Nome"
                        size="small"
                        sx={{ ...inputStyle, flex: 1 }}
                        required
                    />
                    <TextField
                        name="pessoa.cpfcnpj"
                        value={cpf}
                        onChange={(e) => setCpf(formatarCpf(e.target.value))}
                        label="CPF"
                        size="small"
                        sx={{ ...inputStyle, flex: 1 }}
                        required
                    />
                </Box>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                        name="usuario.email"
                        value={formData.usuario.email || ''}
                        onChange={handleChange}
                        label="E-mail"
                        size="small"
                        sx={{ ...inputStyle, flex: 1 }}
                        required
                    />
                    <TextField
                        name="senha"
                        label="Senha"
                        type="password"
                        size="small"
                        sx={{ ...inputStyle, flex: 1 }}
                        placeholder="Deixe em branco para manter a atual"
                        value={formData.usuario.senha === "Sem senha para voce!" ? "" : formData.usuario.senha || ""}
                        onChange={(e) => handleChange({
                            target: {
                                name: "usuario.senha",
                                value: e.target.value
                            }
                        })}
                    />
                    <TextField
                        name="pessoa.telefone"
                        value={telefone}
                        onChange={(e) => setTelefone(formatarTelefone(e.target.value))}
                        label="Telefone"
                        size="small"
                        sx={{ ...inputStyle, flex: 1 }}
                    />
                </Box>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                        name="cargo"
                        value={formData.cargo || ''}
                        onChange={handleChange}
                        label="Cargo"
                        size="small"
                        sx={{ ...inputStyle, flex: 1 }}
                    />
                    <TextField
                        name="setor"
                        value={formData.setor || ''}
                        onChange={handleChange}
                        label="Setor"
                        size="small"
                        sx={{ ...inputStyle, flex: 1 }}
                    />
                    <TextField
                        name="salario"
                        value={formData.salario || ''}
                        onChange={handleChange}
                        label="Salário"
                        size="small"
                        sx={{ ...inputStyle, flex: 1 }}
                        type="number"
                    />
                    <TextField
                        name="dataAdmissao"
                        value={formData.dataAdmissao || ''}
                        onChange={handleChange}
                        type="date"
                        label="Data Admissão"
                        size="small"
                        sx={{ ...inputStyle, flex: 1 }}
                        InputLabelProps={{ shrink: true }}
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