import style from './Login.module.css'
import { useEffect, useState } from 'react'
import Logo from '../../assets/Logo.png'
import LogoBigData1 from '../../assets/LogoBigData1.png'
import { Register } from '../../components/Register';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';
import { LinearDeterminate } from '../../components/loading/LinearDeterminate';
import LoginService from '../../Services/LoginService.js'

export const Login = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState(false);
    const [register, setRegister] = useState(false);
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(null);

    const credenciais = {
        'email': email,
        'senha': senha
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await LoginService.post(credenciais)
            localStorage.setItem('token', response.data.acessToken)

            setErro("")
            setShowAlert('success')
            setTimeout(() => {
                setShowAlert(null)
                navigate('/home', { replace: true })
            }, 3000)
        } catch (error) {
            console.error("Erro ao tentar entrar no sistema", error)

            const mensagemErro = error?.response?.data?.message || "Erro ao fazer login."

            setErro(mensagemErro)
            setShowAlert('error')
            setTimeout(() => {
                setShowAlert(null)
            }, 5000)
        }
    }


    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            navigate('/home', { replace: true })
        }
    }, [])

    const handleRegister = (e) => {
        e.preventDefault()
        setRegister(true)
    }

    return (
        <div className={style.container}>
            <main>
                <div className={style.containerLogo}>
                    <img src={Logo} alt="logo-marca" />
                </div>
                <div className={style.containerFilho}>
                    <h2>Bem vindo(a)!</h2>

                    <form className={style.containerElementos}>
                        <div className={style.inputContainer}>
                            <label htmlFor="Email" className={style.label}>E-mail</label>
                            <input
                                type="email"
                                placeholder='Digite seu e-mail de acesso'
                                className={`${style.input} ${erro ? style.inputErro : ''}`}
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                    setErro("");
                                }
                                }
                            />
                        </div>
                        <div className={style.inputContainer}>
                            <label htmlFor="Senha" className={style.label}>Senha</label>
                            <input
                                type="password"
                                placeholder='Digite sua senha de acesso'
                                className={`${style.input} ${erro ? style.inputErro : ''}`}
                                value={senha}
                                onChange={(e) => {
                                    setSenha(e.target.value)
                                    setErro("")
                                }
                                }
                            />
                        </div>
                        <div className={style.botoesContainer}>
                            <button className={style.buttonEntrar} onClick={handleLogin}>Entrar</button>
                            <button className={style.buttonEsqueciASenha}>Esqueci a senha</button>
                            <button className={style.buttonEsqueciASenha} onClick={handleRegister}>Registre-se</button>
                        </div>
                        <span className={style.span}>{erro}</span>
                    </form>
                </div>
                {register && <Register onClose={() => setRegister(false)} />}
            </main>
            {showAlert && (
                <div className={style.alertContainer}>
                    {showAlert === 'success' && (
                        <Alert variant='filled' severity='success'>Login feito com sucesso!</Alert>
                    )}
                    {showAlert === 'error' && (
                        <Alert variant='filled' severity='error'>Erro: {erro}</Alert>
                    )}
                    <LinearDeterminate />
                </div>
            )}
        </div>
    )
}