import { useState } from 'react';
import Icon from '../../assets/Logo.png';
import style from './Sidebar.module.css';
import { AbcTwoTone, AccessAlarm, Engineering, Home, HomeRepairService, ManageAccounts, PersonAddAlt1, RequestPage, ThreeDRotation } from '@mui/icons-material';

export const Sidebar = ({ voltarHome, exibirFuncionarios, exibirContadores }) => {
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
            <div className={style.funcao} onClick={voltarHome}>
                <Home className={style.icon}/>
                <span className={style.textoFuncao}>Home</span>   
            </div>
            <div className={style.funcao}>
                <HomeRepairService className={style.icon}/>
                <span className={style.textoFuncao}>Empregador</span>
            </div>
            <div className={style.funcao} onClick={exibirContadores}>
                <ManageAccounts className={style.icon}/>
                <span className={style.textoFuncao}>Contador</span>
            </div>
            <div className={style.funcao} onClick={exibirFuncionarios}>
                <Engineering className={style.icon}/>
                <span className={style.textoFuncao}>Funcionário</span>
            </div>
            <div className={style.funcao}>
              <RequestPage className={style.icon}/>
              <span className={style.textoFuncao}>Contracheque</span>
            </div>
        </div>
    );
};
