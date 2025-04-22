import style from './Login.module.css'
import { useState } from 'react'
import Logo from '../../assets/Logo.png'
import { Register } from '../../components/Register';

export const Login = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [ativo, setAtivo] = useState(false);
    const [erro, setErro] = useState(false);
    const [register, setRegister] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setAtivo(true);

        if (email === '' || senha === '') {
            setErro("email ou senha estão incorretos.");
            return;
        }else{
            setErro("");
    
            console.log('e-mail: ', email);
            console.log('Senha: ', senha);   
        }

    }

    const handleRegister = (e) =>{
        e.preventDefault
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

                    <form onSubmit={handleSubmit} className={style.containerElementos}>
                        <div className={style.inputContainer}>
                            <label htmlFor="Email" className={style.label}>E-mail</label>
                            <input
                                type="text"
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
                                onChange={(e) =>{
                                            setSenha(e.target.value)
                                            setErro("")
                                        }
                                }
                            />
                        </div>
                        <div className={style.botoesContainer}>
                            <button className={style.buttonEntrar} onClick={handleSubmit}>Entrar</button>
                                <button className={style.buttonEsqueciASenha}>Esqueci a senha</button>
                                <button className={style.buttonEsqueciASenha} onClick={handleRegister}>Registre-se</button>
                        </div>
                            <span className={style.span}>{erro}</span>
                    </form>
                </div>
            </main>
            {register && <Register onClose={() => setRegister(false)}/>}
        </div>
    )
}