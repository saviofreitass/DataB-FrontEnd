import style from './Register.module.css'
import Logo from '../assets/Logo.png'

export const Register = ({ onClose }) => {


    return (
        <div className={style.modalOverlay}>
            <div className={style.modalContent}>
                <div className={style.logoContainer}>
                    <img src={Logo} alt="Logomarca" />
                </div>
                <h2>Registre-se</h2>
                <form>
                    <div className={style.inputContainer}>
                        <label htmlFor="nome" className={style.label}>Nome</label>
                        <input type="text" placeholder="Digite o seu nome" />
                    </div>
                    <div className={style.inputContainer}>
                        <label htmlFor="email" className={style.label}>E-mail</label>
                        <input 
                            type="email" 
                            placeholder="Digite o seu e-mail" 
                            />
                    </div>
                    <div className={style.inputContainer}>
                        <label htmlFor="senha" className={style.label}>Senha</label>
                        <input type="password" placeholder="Digite a sua senha" />
                    </div>
                    <div className={style.inputContainer}>
                        <label htmlFor="crc" className={style.label}>CRC</label>
                        <input type="text" placeholder='Digite o seu CRC'/>
                    </div>
                    <button type="submit" className={style.registrar}>Registrar</button>
                </form>
                <button className={style.fechar} onClick={onClose}>Fechar</button>
            </div>
        </div>
    );
}
