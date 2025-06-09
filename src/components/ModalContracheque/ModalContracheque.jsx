import { Cancel, SaveAlt, Title } from "@mui/icons-material";
import { Box, Button, Modal, TextField } from "@mui/material"
import { ModalConfirmacao } from "../ModalConfirmacao/ModalConfirmacao";
import { useState } from "react";

export const ModalContracheque = ({ open, onClose, funcionario }) => {
    const [confirmacaoAberta, setConfrimacaoAberta] = useState(false)

    const handleAbrirConfirmacao = () => {
        console.log("passou aqui")
        
        setConfrimacaoAberta(true)
    }

    const handleFecharConfirmacao = () => {
        setConfrimacaoAberta(false)
    }

    /* const credenciais = {
        'funcionario_id': id,
        'contador_id':  naosei,
        'data_pagamento': dataPagamento,
        'data_ref_inicio': dataRefInicio,
        'data_ref_fim': dataRefFim,
        'salario_base': salarioBase,
        'hora_extra': horaExtra,
        'adicional_noturno': adicionalNoturno,
        'comissoes': comissoes,
        'beneficios': beneficios,
    } */

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
                <Box
                    sx={{
                        display: 'flex',
                        gap: 2,
                    }}
                >
                    <TextField 
                        name="id"
                        value={funcionario?.id || ''}
                        InputProps={{ readOnly: true }}
                        label="Funcionairo ID"
                        size="small"
                        sx={{ ...inputStyle, flex: 1 }}
                    >   
                    </TextField>
                    <Button
                        onClick={handleAbrirConfirmacao}
                        sx={{ background: 'var(--blue-200)' }}
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
                        name="dataPagamento"
                        // defaultValue={funcionario?.nome}
                        type="date"
                        label="Data pagamento"
                        size="small"
                        sx={{ ...inputStyle, flex: 1 }}
                    />
                    <TextField
                        name="salarioBase"
                        label="Salário base"
                        size="small"
                        sx={{ ...inputStyle, flex: 1 }}
                    />
                    <TextField
                        name="horaExtra"
                        label="Hora extra"
                        size="small"
                        sx={{ ...inputStyle, flex: 1 }}
                    />
                    <TextField
                        name="adicionalNoturno"
                        label="Adicional noturno"
                        size="small"
                        sx={{ ...inputStyle, flex: 1 }}
                    />
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        gap: 2
                    }}
                >
                    <TextField
                        name="comissoes"
                        label="Comissoes"
                        size="small"
                        sx={{ ...inputStyle, flex: 1 }}
                    />
                    <TextField
                        name="beneficios"
                        label="Beneficios"
                        size="small"
                        sx={{ ...inputStyle, flex: 1 }}
                    />
                    <TextField
                        name="inss"
                        label="INSS"
                        size="small"
                        sx={{ ...inputStyle, flex: 1 }}
                    />
                    <TextField
                        name="irff"
                        label="IRFF"
                        size="small"
                        sx={{ ...inputStyle, flex: 1 }}
                    />  
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        gap: 2
                    }}
                >
                    <TextField
                        name="outrosDescontos"
                        label="Outros descontos"
                        size="small"
                        sx={{ ...inputStyle, flex: 1 }}
                    />
                    <TextField
                        name="outrosDescontos"
                        label="Outros descontos"
                        size="small"
                        sx={{ ...inputStyle, flex: 1 }}
                    />
                </Box>
                <ModalConfirmacao 
                    open={confirmacaoAberta}
                    onClose={handleFecharConfirmacao}
                />                                                             
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