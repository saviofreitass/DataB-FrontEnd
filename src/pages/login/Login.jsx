import style from './Login.module.css'
import { useState } from 'react'
import Logo from '../../assets/Logo.png'

export const Login = () => {
    const [cpf, setCpf] = useState("");
    const [senha, setSenha] = useState("");
    const [ativo, setAtivo] = useState(false);
    const [erro, setErro] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setAtivo(true);

        if (cpf === '' || senha === '') {
            setErro("CPF ou senha estão incorretos.");
            return;
        }else{
            setErro("");
    
            console.log('CPF: ', cpf);
            console.log('Senha: ', senha);   
        }

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
                            <label htmlFor="Cpf" className={style.label}>CPF</label>
                            <input
                                type="text"
                                placeholder='Digite seu CPF de acesso'
                                className={`${style.input} ${erro ? style.inputErro : ''}`}
                                value={cpf}
                                onChange={(e) => {
                                            setCpf(e.target.value)
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
                        </div>
                            <span className={style.span}>{erro}</span>
                    </form>
                </div>
            </main>
        </div>
    )
}