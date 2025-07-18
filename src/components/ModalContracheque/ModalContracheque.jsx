import { Cancel, Palette, SaveAlt } from "@mui/icons-material";
import { Alert, Box, Button, Modal, TextField } from "@mui/material"
import { ModalConfirmacao } from "../ModalConfirmacao/ModalConfirmacao";
import { useEffect, useState } from "react";
import ContrachequeService from "../../Services/ContrachequeService";

export const ModalContracheque = ({ open, onClose, funcionario, empregador }) => {
    const [confirmacaoAberta, setConfrimacaoAberta] = useState(false)
    const [enviando, setEnviando] = useState(false)
    const [dataPagamento, setDataPagamento] = useState('')
    const [dataRefInicio, setDataRefInicio] = useState('')
    const [dataRefFim, setDataRefFim] = useState('')
    const [salarioBase, setSalarioBase] = useState('')
    const [horaExtra, setHoraExtra] = useState('')
    const [adicionalNoturno, setAdicionalNoturno] = useState('')
    const [comissoes, setComissoes] = useState('')
    const [beneficios, setBeneficios] = useState('')
    const [inss, setInss] = useState('')
    const [irrf, setIrrf] = useState('')
    const [fgts, setFgts] = useState('')
    const [outrosDescontos, setOutrosDescontos] = useState('')
    const [erros, setErros] = useState({})
    const [totalLiquido, setTotalLiquido] = useState('')

    const mensagemAlertPadrao = {
        tipo: 'info',
        mensagem: 'Todos os campos abaixo, exceto as datas, deverão ser preenchidos com valor em REAIS!'
    }

    const [mensagemAlert, setMensagemAlert] = useState(mensagemAlertPadrao)

    const validarCampos = () => {
        const novosErros = {}

        if (!dataPagamento) novosErros.dataPagamento = 'Campo obrigatório'
        if (!dataRefInicio) novosErros.dataRefInicio = 'Campo obrigatório'
        if (!dataRefFim) novosErros.dataRefFim = 'Campo obrigatório'
        if (!salarioBase) novosErros.salarioBase = 'Campo obrigatório'
        if (!inss) novosErros.inss = 'Campo obrigatório'
        if (!fgts) novosErros.fgts = 'Campo obrigatório'

        setErros(novosErros);

        return Object.keys(novosErros).length === 0;
    }

    const handleAbrirConfirmacao = () => {
        setConfrimacaoAberta(true)
    }

    const handleFecharConfirmacao = () => {
        setConfrimacaoAberta(false)
    }

    const criarPayload = () => ({
        funcId: String(funcionario?.id || ''),
        empregadorId: String(empregador?.id || ''),
        dataPagamento: String(dataPagamento),
        dataRefInicio: String(dataRefInicio),
        dataRefFim: String(dataRefFim),
        salarioBase: String(removerFormatacao(salarioBase || funcionario?.salario || '')),
        horaExtra: String(removerFormatacao(horaExtra)),
        adicionalNoturno: String(removerFormatacao(adicionalNoturno)),
        comissoes: String(removerFormatacao(comissoes)),
        beneficios: String(removerFormatacao(beneficios)),
        inss: String(removerFormatacao(inss)),
        irrf: String(removerFormatacao(irrf)),
        fgts: String(removerFormatacao(fgts)),
        outrosDescontos: String(removerFormatacao(outrosDescontos))
    })



    const handleSalvar = () => {
        const camposValidos = validarCampos()

        if (!camposValidos) {
            setMensagemAlert({ tipo: 'error', mensagem: 'Por favor, preencha todos os campos obrigatórios.' })
            return
        }

        setMensagemAlert(mensagemAlertPadrao)

        const payload = criarPayload()
        const contrachequesSalvos = JSON.parse(localStorage.getItem('contracheques')) || []

        const indexExistente = contrachequesSalvos.findIndex(item =>
            item.funcId === payload.funcId &&
            item.dataRefInicio === payload.dataRefInicio &&
            item.dataRefFim === payload.dataRefFim
        )

        if (indexExistente !== - 1) {
            contrachequesSalvos[indexExistente] = payload
        } else {
            contrachequesSalvos.push(payload)
        }

        localStorage.setItem('contracheques', JSON.stringify(contrachequesSalvos))
        console.log('Payload salvo no localstorage: ', payload)
        setConfrimacaoAberta(true)
    }

    const handleConfirmarSalvar = () => {
        const camposValidos = validarCampos()
        if (!camposValidos) {
            setMensagemAlert({ tipo: 'error', mensagem: 'Por favor, preencha todos os campos obrigatórios.' })
            return
        }

        setMensagemAlert(mensagemAlertPadrao)

        handleSalvar()
        setConfrimacaoAberta(false)
        onClose()
    }

    useEffect(() => {
        if (funcionario?.salario) {
            setSalarioBase(formatarMoeda(funcionario.salario));
        }
    }, [funcionario])

    const handleDataRefInicioChange = (e) => {
        const data = e.target.value
        setDataRefInicio(data)

        if (data) {
            const [ano, mes] = data.split('-')
            const ultimoDia = new Date(ano, mes, 0).getDate()
            const dataFim = `${ano}-${mes.padStart(2, '0')}-${ultimoDia.toString().padStart(2, '0')}`
            setDataRefFim(dataFim)
        }
    }

    const paraNumero = (valor) => {
        if (!valor) {
            return 0
        }

        const numero = String(valor).replace(/\D/g, '')
        return Number(numero) / 100
    }

    const calcularTotalLiquido = () => {
        const proventos =
            paraNumero(salarioBase) +
            paraNumero(horaExtra) +
            paraNumero(adicionalNoturno) +
            paraNumero(comissoes) +
            paraNumero(beneficios);

        const descontos =
            paraNumero(inss) +
            paraNumero(irrf) +
            paraNumero(fgts) +
            paraNumero(outrosDescontos)

        const total = proventos - descontos

        return total
    }

    useEffect(() => {
        const total = calcularTotalLiquido()
        setTotalLiquido(formatarMoeda(total))
    }, [
        salarioBase,
        horaExtra,
        adicionalNoturno,
        comissoes,
        beneficios,
        inss,
        irrf,
        fgts,
        outrosDescontos
    ])


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
                <Alert
                    severity={mensagemAlert.tipo}
                >
                    {mensagemAlert.mensagem}
                </Alert>
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
                        required
                        error={!!erros.dataPagamento}
                        helperText={erros.dataPagamento}
                    />
                    <TextField
                        name="dataRefInicio"
                        type="date"
                        label="Data referente ao início"
                        size="small"
                        value={dataRefInicio}
                        onChange={handleDataRefInicioChange}
                        sx={{ ...inputStyle, flex: 1 }}
                        required
                        error={!!erros.dataRefInicio}
                        helperText={erros.dataRefInicio}
                    />
                    <TextField
                        name="dataRefFim"
                        type="date"
                        label="Data referente ao fim"
                        size="small"
                        value={dataRefFim}
                        onChange={(e) => setDataRefFim(e.target.value)}
                        sx={{ ...inputStyle, flex: 1 }}
                        required
                        error={!!erros.dataRefFim}
                        helperText={erros.dataRefFim}
                    />
                </Box>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                        name="salarioBase"
                        label="Salário base"
                        size="small"
                        value={salarioBase}
                        onChange={(e) => setSalarioBase(formatarMoeda(e.target.value))}
                        sx={{ ...inputStyle, flex: 1 }}
                        required
                        error={!!erros.salarioBase}
                        helperText={erros.salarioBase}
                    />
                    <TextField
                        name="horaExtra"
                        label="Hora extra"
                        size="small"
                        value={horaExtra}
                        onChange={(e) => setHoraExtra(formatarMoeda(e.target.value))}
                        sx={{ ...inputStyle, flex: 1 }}
                        error={!!erros.horaExtra}
                        helperText={erros.horaExtra}
                    />
                    <TextField
                        name="adicionalNoturno"
                        label="Adicional noturno"
                        size="small"
                        value={adicionalNoturno}
                        onChange={(e) => setAdicionalNoturno(formatarMoeda(e.target.value))}
                        sx={{ ...inputStyle, flex: 1 }}
                        error={!!erros.adicionalNoturno}
                        helperText={erros.adicionalNoturno}
                    />
                </Box>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                        name="comissoes"
                        label="Comissões"
                        size="small"
                        value={comissoes}
                        onChange={(e) => setComissoes(formatarMoeda(e.target.value))}
                        sx={{ ...inputStyle, flex: 1 }}
                        error={!!erros.comissoes}
                        helperText={erros.comissoes}
                    />
                    <TextField
                        name="beneficios"
                        label="Benefícios"
                        size="small"
                        value={beneficios}
                        onChange={(e) => setBeneficios(formatarMoeda(e.target.value))}
                        sx={{ ...inputStyle, flex: 1 }}
                        error={!!erros.beneficios}
                        helperText={erros.beneficios}
                    />
                    <TextField
                        name="inss"
                        label="INSS"
                        size="small"
                        value={inss}
                        onChange={(e) => setInss(formatarMoeda(e.target.value))}
                        sx={{ ...inputStyle, flex: 1 }}
                        required
                        error={!!erros.inss}
                        helperText={erros.inss}
                    />
                    <TextField
                        name="irrf"
                        label="IRRF"
                        size="small"
                        value={irrf}
                        onChange={(e) => setIrrf(formatarMoeda(e.target.value))}
                        sx={{ ...inputStyle, flex: 1 }}
                        error={!!erros.irrf}
                        helperText={erros.irrf}
                    />
                </Box>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                        name="fgts"
                        label="FGTS"
                        size="small"
                        value={fgts}
                        onChange={(e) => setFgts(formatarMoeda(e.target.value))}
                        sx={{ ...inputStyle, flex: 1 }}
                        required
                        error={!!erros.fgts}
                        helperText={erros.fgts}
                    />
                    <TextField
                        name="outrosDescontos"
                        label="Outros descontos"
                        size="small"
                        value={outrosDescontos}
                        onChange={(e) => setOutrosDescontos(formatarMoeda(e.target.value))}
                        sx={{ ...inputStyle, flex: 1 }}
                        error={!!erros.outrosDescontos}
                        helperText={erros.outrosDescontos}
                    />
                    <TextField
                        name="totalLiquido"
                        label="Total líquido"
                        size="small"
                        value={totalLiquido}
                        InputProps={{ readOnly: true }}
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

const formatarMoeda = (valor) => {
    if (valor === undefined || valor === null) return ''

    if (typeof valor === 'number') {
        return valor.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        })
    }

    const numero = String(valor).replace(/\D/g, '')
    const numeroFormatado = (Number(numero) / 100).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })
    return numeroFormatado
}


const removerFormatacao = (valor) => {
    if (valor === undefined || valor === null || valor === '') {
        return 0
    }

    const somenteNumeros = String(valor).replace(/\D/g, '')
    const resultado = (Number(somenteNumeros) / 100).toFixed(2)

    return resultado.toString()
};




