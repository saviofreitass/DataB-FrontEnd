import style from './Register.module.css'
import Logo from '../assets/Logo.png'
import { useState } from 'react';
import { Alert } from '@mui/material';
import { LinearDeterminate } from './loading/LinearDeterminate';

export const Register = ({ onClose }) => {
    const [credenciais, setCredenciais] = useState({
        name: '',
        email: '', 
        password: '',
        crc: '',
    })

    const [showAlert, setShowAlert] = useState(null);
    const [showLinear, setLinear] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredenciais(prev =>({
            ...prev,
            [name]: value
        }))
    }

    const handleRegister = (e) =>{
        e.preventDefault();
        
        const camposPreenchidos = Object.values(credenciais).every(field => field.trim() !== '');
        
        if (camposPreenchidos) {
            console.log("Pasou aqui:", credenciais)
            setShowAlert('success')
            setTimeout(()=>{
                setShowAlert(false)
                onClose()
            }, 5000)
            
        }else{
            setShowAlert('error')
            setTimeout(()=>{
                setShowAlert(false)
            }, 5000)
        }
    }

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
                        <input 
                            type="text" 
                            name='name'
                            placeholder="Digite o seu nome" 
                            value={credenciais.name}
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
                            name='password'
                            placeholder="Digite a sua senha" 
                            value={credenciais.password}
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
                    <button type="submit" className={style.registrar} onClick={handleRegister}>Registrar</button>
                </form>

                <button className={style.fechar} onClick={onClose}>Fechar</button>
            </div>
            {showAlert && ( 
                <div className={style.alertContainer}>
                    {showAlert === 'success' && (
                        <Alert variant='filled' severity='success'>Registro feito com sucesso!</Alert>
                    )}
                    {showAlert === 'error' && (
                        <Alert variant='filled' severity='error'>Erro: Todos os campos devem ser preenchidos.</Alert>
                    )}
                    <LinearDeterminate />
                </div>
            )}
        </div>
    );
}
