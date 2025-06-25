import style from './Register.module.css'
import Logo from '../assets/Logo.png'
import { useState } from 'react';
import { Alert, Box, List, ListItem, Typography } from '@mui/material';
import { LinearDeterminate } from './loading/LinearDeterminate';
import ContadorService from '../Services/ContadorService';
import LogoBigData from '../assets/Logo-Big-Data-sf.png'


export const Register = ({ onClose }) => {

    const [validacoesSenha, setValidacoesSenha] = useState({
        temMinuscula: false,
        temMaiuscula: false,
        temNumero: false,
        temEspecial: false,
        tamanhoMinimo: false,
    })
    const [erro, setErro] = useState("")

    const [showAlert, setShowAlert] = useState(null);

    const [credenciais, setCredenciais] = useState({
        nome: '',
        email: '',
        senha: '',
        crc: '',
        telefone: '',
        cpfcnpj: '',
    })

    const payload = {
        usuario: {
            email: credenciais.email,
            senha: credenciais.senha,
            tipoUsuario: "ROLE_CONTADOR",
            usuarioCriacao: "admin"
        },
        pessoa: {
            nome: credenciais.nome,
            cpfcnpj: credenciais.cpfcnpj,
            telefone: credenciais.telefone,
            ativo: true
        },
        crc: credenciais.crc
    }



    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredenciais(prev => ({
            ...prev,
            [name]: value
        }))

        if (name === 'senha') {
            validarSenha(value);
        }
    }


    const handleRegister = async (e) => {
        e.preventDefault(e);

        try {
            const response = await ContadorService.post(payload)

            setShowAlert('success')
            setTimeout(() => {
                setShowAlert(false)
                onClose()
            }, 5000)
        } catch (error) {
            console.error("Erro no registro", error)
            const mensagemErro = error?.response?.data?.message || "Erro ao fazer registro."
            setErro(mensagemErro);
            setShowAlert('error')
            setTimeout(() => {
                setShowAlert(false)
            }, 5000)
        }
    }

    const validarSenha = (senha) => {
        setValidacoesSenha({
            temMinuscula: /[a-z]/.test(senha),
            temMaiuscula: /[A-Z]/.test(senha),
            temNumero: /\d/.test(senha),
            temEspecial: /[.@$!%*?&]/.test(senha),
            tamanhoMinimo: senha.length >= 8
        })
    }


    return (
        <div className={style.modalOverlay}>
            <div className={style.modalContent}>
                <div className={style.logoContainer}>
                    <img src={LogoBigData} alt="Logomarca" className={style.logoImage} />
                </div>
                <h2>Bem vindo(a), contator(a), registre-se!</h2>
                <form>
                    <div className={style.inputContainer}>
                        <label htmlFor="nome" className={style.label}>Nome</label>
                        <input
                            type="text"
                            name='nome'
                            placeholder="Digite o seu nome"
                            value={credenciais.nome}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={style.inputContainer}>
                        <label htmlFor="email" className={style.label}>E-mail</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Digite o seu e-mail"
                            value={credenciais.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={style.inputContainer}>
                        <label htmlFor="senha" className={style.label}>Senha</label>
                        <input
                            type="password"
                            name='senha'
                            placeholder="Digite a sua senha"
                            value={credenciais.senha}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={style.inputContainer}>
                        <label htmlFor="crc" className={style.label}>CRC</label>
                        <input
                            type="text"
                            name='crc'
                            placeholder='Digite o seu CRC'
                            value={credenciais.crc}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={style.inputContainer}>
                        <label htmlFor="telefone" className={style.label}>Telefone</label>
                        <input
                            type="text"
                            name='telefone'
                            placeholder='Digite o seu telefone'
                            value={credenciais.telefone}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={style.inputContainer}>
                        <label htmlFor="cpfcnpj" className={style.label}>CPF/CNPJ</label>
                        <input
                            type="text"
                            name='cpfcnpj'
                            placeholder='Digite o seu CPF ou CNPJ'
                            value={credenciais.cpfcnpj}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className={style.registrar} onClick={handleRegister}>Registrar</button>
                </form>

                <button className={style.fechar} onClick={onClose}>Fechar</button>
                <Alert severity='info'>
                    <Typography variant='body2'>
                        Sua senha deve conter os seguintes critérios:
                    </Typography>
                    <Box sx={{ marginTop: '10px', display: 'flex', flexDirection: 'column' }}>
                        <Typography className={validacoesSenha.temMinuscula ? style.validado : style.naoValidado} variant='body2'>
                            • Pelo menos uma letra minúscula.
                        </Typography>
                        <Typography className={validacoesSenha.temMaiuscula ? style.validado : style.naoValidado} variant='body2'>
                            • Pelo menos uma letra maiúscula.
                        </Typography>
                        <Typography className={validacoesSenha.temNumero ? style.validado : style.naoValidado} variant='body2'>
                            • Pelo menos um número.
                        </Typography>
                        <Typography className={validacoesSenha.temEspecial ? style.validado : style.naoValidado} variant='body2'>
                            • Pelo menos um caractere especial [@, $, !, %, *, ?, &].
                        </Typography>
                        <Typography className={validacoesSenha.tamanhoMinimo ? style.validado : style.naoValidado} variant='body2'>
                            • Pelo menos 8 caracteres.
                        </Typography>
                    </Box>
                </Alert>


            </div>
            {showAlert && (
                <div className={style.alertContainer}>
                    {showAlert === 'success' && (
                        <Alert variant='filled' severity='success'>Registro feito com sucesso!</Alert>
                    )}
                    {showAlert === 'error' && (
                        <Alert variant='filled' severity='error'>Erro: {erro}</Alert>
                    )}
                    <LinearDeterminate />
                </div>
            )}
        </div>
    );
}
