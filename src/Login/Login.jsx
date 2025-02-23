import style from './Login.module.css'
import { useState } from 'react'
import Logo from '../assets/Logo.png'

export const Login = () => {
    const [cpf, setCpf] = useState("");
    const [senha, setSenha] = useState("");
    const [ativo, setAtivo] = useState(false);
    const [erro, setErro] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setAtivo(true);

        if (cpf === '' || senha === '') {
            setErro(true);
            return;
        }else{
            setErro(false);
    
            console.log('CPF: ', cpf);
            console.log('Senha: ', senha);   
        }

    }

    return (
        <div className={style.container}>
            <div>
                <img src={Logo} alt="logo-marca" />
            </div>
            <div className={style.containerFilho}>
                <h2>Bem vindo(a)!</h2>
                <div className={style.containerElementos}>
                    <div className={style.inputContainer}>
                        <label htmlFor="Cpf" className={style.label}>CPF</label>
                        <input
                            type="text"
                            placeholder='Digite seu CPF de acesso'
                            className={`${style.input} ${erro ? style.inputErro : ''}`}
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                        />
                    </div>
                    <div className={style.inputContainer}>
                        <label htmlFor="Senha" className={style.label}>Senha</label>
                        <input
                            type="password"
                            placeholder='Digite sua senha de acesso'
                            className={`${style.input} ${erro ? style.inputErro : ''}`}
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                    </div>
                    <div className={style.botoesContainer}>
                        <button className={style.buttonEntrar} onClick={handleSubmit}>Entrar</button>
                        <button className={style.buttonEsqueciASenha}>Esqueci a senha</button>
                        <span className={`${style.span} ${erro ? style.spanErro : ''}`}>CPF ou senha estão incorretos.</span>
                    </div>
                </div>
            </div>
        </div>
    )
}