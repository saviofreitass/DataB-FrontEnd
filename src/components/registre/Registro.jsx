import { useState } from 'react'
import style from './Registro.module.css'
import Logo from '../../assets/Logo.png'


export const Registro = ({ onClose }) => {
    const [valor, setValor] = useState("");


    return (
        <div className={style.container}>
            <div className={style.formulario}>
                <div className={style.logoContainer}>
                    <img src={Logo} alt="Logomarca da empresa" />
                </div>
                <h2>Registre-se!</h2>
                <form >
                    <div className={style.inputContainer}>
                        <input type="text" placeholder='Nome' className={style.inputs} />
                        <input type="text" placeholder='Documento' className={style.inputs} />
                        <input type="text" placeholder='Cidade' className={style.inputs} />
                        <input type="text" placeholder='Logradouro' className={style.inputs} />
                        <input type="text" placeholder='Número' className={style.inputs} />
                        <input type="text" placeholder='CEP' className={style.inputs} />
                        <input type="text" placeholder='Bairro' className={style.inputs} />
                        <input type="text" placeholder='Complemento' className={style.inputs} />
                        <input type="text" placeholder='Telefone' className={style.inputs} />
                        <input type="text" placeholder='Telefone' className={style.inputs} />
                        <input type="password" placeholder='Senha' className={style.inputs} />
                        <input type="email" placeholder='E-mail' className={style.inputs} />
                    </div>
                </form>
                <div className={style.botoes}>
                    <button onClick={onClose} className={style.fechar}>Cancelar</button>
                    <button className={style.salvar}>Salvar</button>
                </div>
            </div>
        </div>
    )
}