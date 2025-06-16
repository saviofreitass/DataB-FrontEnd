import { Cancel, Palette, SaveAlt } from "@mui/icons-material";
import { Box, Button, Modal, TextField } from "@mui/material"
import { ModalConfirmacao } from "../ModalConfirmacao/ModalConfirmacao";
import { useState } from "react";
import ContrachequeService from "../../Services/ContrachequeService";

export const ModalContracheque = ({ open, onClose, funcionario, empregador }) => {
    const [confirmacaoAberta, setConfrimacaoAberta] = useState(false);
    const [enviando, setEnviando] = useState(false)

    const [dataPagamento, setDataPagamento] = useState('');
    const [dataRefInicio, setDataRefInicio] = useState('');
    const [dataRefFim, setDataRefFim] = useState('');
    const [salarioBase, setSalarioBase] = useState('');
    const [horaExtra, setHoraExtra] = useState('');
    const [adicionalNoturno, setAdicionalNoturno] = useState('');
    const [comissoes, setComissoes] = useState('');
    const [beneficios, setBeneficios] = useState('');
    const [inss, setInss] = useState('');
    const [irrf, setIrrf] = useState('');
    const [fgts, setFgts] = useState('');
    const [outrosDescontos, setOutrosDescontos] = useState('');

    const handleAbrirConfirmacao = () => {
        setConfrimacaoAberta(true);
    };

    const handleFecharConfirmacao = () => {
        setConfrimacaoAberta(false);
    };
    
    const criarPayload = () => ({
        funcId: funcionario?.id || '',
        empregadorId: empregador?.id || '',
        dataPagamento,
        dataRefInicio,
        dataRefFim,
        salarioBase,
        horaExtra,
        adicionalNoturno,
        comissoes,
        beneficios,
        inss,
        irrf,
        fgts,
        outrosDescontos
    });


    const handleSalvar = () => {
        const payload = criarPayload()
        const contrachequesSalvos = JSON.parse(localStorage.getItem('contracheques')) || []
    
        const indexExistente = contrachequesSalvos.findIndex(item => 
            item.funcId === payload.funcId &&
            item.dataRefInicio === payload.dataRefInicio &&
            item.dataRefFim === payload.dataRefFim
        )

        if(indexExistente !== - 1) {
            contrachequesSalvos[indexExistente] = payload
        }else{
            contrachequesSalvos.push(payload)
        }

        localStorage.setItem('contracheques', JSON.stringify(contrachequesSalvos))
        console.log('Payload salvo no localstorage: ', payload)
        setConfrimacaoAberta(true)
    }

    const handleConfirmarSalvar = () => {
        handleSalvar()
        setConfrimacaoAberta(false)
        onClose()
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
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                        name="nome"
                        value={funcionario?.pessoa.nome || ''}
                        InputProps={{ readOnly: true }}
                        label="Nome"
                        size="small"
                        sx={{ ...inputStyle, flex: 1 }}
                    />
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
                        name="dataPagamento"
                        type="date"
                        label="Data pagamento"
                        size="small"
                        value={dataPagamento}
                        onChange={(e) => setDataPagamento(e.target.value)}
                        sx={{ ...inputStyle, flex: 1 }}
                    />
                    <TextField
                        name="dataRefInicio"
                        type="date"
                        label="Data referente ao início"
                        size="small"
                        value={dataRefInicio}
                        onChange={(e) => setDataRefInicio(e.target.value)}
                        sx={{ ...inputStyle, flex: 1 }}
                    />
                    <TextField
                        name="dataRefFim"
                        type="date"
                        label="Data referente ao fim"
                        size="small"
                        value={dataRefFim}
                        onChange={(e) => setDataRefFim(e.target.value)}
                        sx={{ ...inputStyle, flex: 1 }}
                    />
                </Box>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                        name="salarioBase"
                        label="Salário base"
                        size="small"
                        value={salarioBase}
                        onChange={(e) => setSalarioBase(e.target.value)}
                        sx={{ ...inputStyle, flex: 1 }}
                    />
                    <TextField
                        name="horaExtra"
                        label="Hora extra"
                        size="small"
                        value={horaExtra}
                        onChange={(e) => setHoraExtra(e.target.value)}
                        sx={{ ...inputStyle, flex: 1 }}
                    />
                    <TextField
                        name="adicionalNoturno"
                        label="Adicional noturno"
                        size="small"
                        value={adicionalNoturno}
                        onChange={(e) => setAdicionalNoturno(e.target.value)}
                        sx={{ ...inputStyle, flex: 1 }}
                    />
                </Box>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                        name="comissoes"
                        label="Comissões"
                        size="small"
                        value={comissoes}
                        onChange={(e) => setComissoes(e.target.value)}
                        sx={{ ...inputStyle, flex: 1 }}
                    />
                    <TextField
                        name="beneficios"
                        label="Benefícios"
                        size="small"
                        value={beneficios}
                        onChange={(e) => setBeneficios(e.target.value)}
                        sx={{ ...inputStyle, flex: 1 }}
                    />
                    <TextField
                        name="inss"
                        label="INSS"
                        size="small"
                        value={inss}
                        onChange={(e) => setInss(e.target.value)}
                        sx={{ ...inputStyle, flex: 1 }}
                    />
                    <TextField
                        name="irrf"
                        label="IRRF"
                        size="small"
                        value={irrf}
                        onChange={(e) => setIrrf(e.target.value)}
                        sx={{ ...inputStyle, flex: 1 }}
                    />
                </Box>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                        name="fgts"
                        label="FGTS"
                        size="small"
                        value={fgts}
                        onChange={(e) => setFgts(e.target.value)}
                        sx={{ ...inputStyle, flex: 1 }}
                    />
                    <TextField
                        name="outrosDescontos"
                        label="Outros descontos"
                        size="small"
                        value={outrosDescontos}
                        onChange={(e) => setOutrosDescontos(e.target.value)}
                        sx={{ ...inputStyle, flex: 1 }}
                    />
                </Box>

                <ModalConfirmacao
                    open={confirmacaoAberta}
                    onClose={handleFecharConfirmacao}
                    onConfirm={handleConfirmarSalvar}
                    message="Tem certeza que deseja salvar esse pagamento?"
                    subMessage="Esta ação ainda não enviará a folha de pagamento!"
                />
            </Box>
        </Modal>
    );
};

const inputStyle = {
    '& .MuiOutlinedInput-root.Mui-focused fieldset': {
        borderColor: 'var(--blue-200)',
        borderWidth: '2px',
    },
};
