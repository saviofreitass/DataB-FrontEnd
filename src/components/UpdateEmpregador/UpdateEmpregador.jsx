import { Cancel, SaveAlt } from "@mui/icons-material";
import { Alert, Box, Button, Modal, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import EmpregadorService from "../../Services/EmpregadorService";

export const UpdateEmpregador = ({ open, onClose, empregador, onUpdate }) => {
    const [mensagem, setMensagem] = useState({ tipo: '', texto: '' });
    const [cnpj, setCnpj] = useState('');

    const formatarCNPJ = (valor) => {
        return valor
            .replace(/\D/g, '')
            .replace(/^(\d{2})(\d)/, '$1.$2')
            .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
            .replace(/\.(\d{3})(\d)/, '.$1/$2')
            .replace(/(\d{4})(\d)/, '$1-$2');
    };

    useEffect(() => {
        if (empregador) {
            setCnpj(formatarCNPJ(empregador.cnpj || ''));
        }
    }, [empregador]);

    useEffect(() => {
        if (mensagem.texto) {
            const timeout = setTimeout(() => setMensagem({ tipo: '', texto: '' }), 3500);
            return () => clearTimeout(timeout);
        }
    }, [mensagem]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const dadosAtualizados = Object.fromEntries(formData.entries());

        delete dadosAtualizados.id;
        dadosAtualizados.cnpj = cnpj.replace(/\D/g, '');

        try {
            const response = await EmpregadorService.update(empregador.id, dadosAtualizados);
            const mensagemSucesso = response.data?.message || "Empregador atualizado com sucesso!";
            setMensagem({ tipo: 'success', texto: mensagemSucesso });

            if (onUpdate) onUpdate();
            onClose();
        } catch (error) {
            const mensagemErro = error.response?.data?.message || "Erro ao tentar atualizar o empregador!";
            setMensagem({ tipo: 'error', texto: mensagemErro });
            console.error("Erro ao tentar atualizar o empregador!", error);
        }
    };



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
                        defaultValue={empregador?.id}
                        InputProps={{ readOnly: true }}
                        label="ID"
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
                        name="cnpj"
                        value={cnpj}
                        onChange={(e) => setCnpj(formatarCNPJ(e.target.value))}
                        label="CNPJ"
                        size="small"
                        sx={{ ...inputStyle, flex: 1 }}
                    />
                    <TextField
                        name="razaoSocial"
                        defaultValue={empregador?.razaoSocial}
                        label="Razão Social"
                        size="small"
                        sx={{ ...inputStyle, flex: 1 }}
                    />
                    <TextField
                        name="nomeFantasia"
                        defaultValue={empregador?.nomeFantasia}
                        label="Nome Fantasia"
                        size="small"
                        sx={{ ...inputStyle, flex: 1 }}
                    />
                </Box>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                        name="endereco"
                        defaultValue={empregador?.endereco}
                        label="Endereço"
                        size="small"
                        sx={{ ...inputStyle, flex: 1 }}
                    />
                </Box>
            </Box>
        </Modal>
    );
};

const inputStyle = {
    '& .MuiOutlinedInput-root.Mui-focused fieldset': {
        borderColor: 'var(--blue-200)',
        borderWidth: '2px',
    }
};
