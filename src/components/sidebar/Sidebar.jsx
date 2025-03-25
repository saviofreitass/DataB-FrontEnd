import { useState } from 'react';
import Icon from '../../assets/Logo.png';
import style from './Sidebar.module.css';

export const Sidebar = () => {
    const [valor, setValor] = useState("");


    return (
        <div className={style.container}>  
            <img src={Icon} alt="ícone logo marca" className={style.logo} />
            <div className={style.cabeca}>
                <span className={style.textoCabeca}>Folha</span>
                <span className={style.textoCabeca}>Versão: 0.1.0</span>      
            </div>
            <div>
                <input 
                    type="text" 
                    className={style.input}
                    value={valor}
                    onChange={(e) =>{
                        setValor(e.target.value)
                        console.log(e.target.value)
                    }}
                />
            </div>
        </div>
    );
};
