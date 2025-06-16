import { useState } from 'react';
import Icon from '../../assets/Logo.png';
import style from './Sidebar.module.css';
import {
    Home, HomeRepairService, ManageAccounts, Engineering,
    RequestPage, MonetizationOn, Menu, ChevronLeft
} from '@mui/icons-material';

export const Sidebar = ({ voltarHome, exibirFuncionarios, exibirContadores, isFuncionario, exibirTabelaSalario, exibirTabelaEmpregador, exibirTabelaContracheque }) => {
    const [valor, setValor] = useState("");
    const [encolhido, setEncolhido] = useState(false);

    return (
        <div className={`${style.container} ${encolhido ? style.containerEncolhido : ''}`}>
            <div className={style.topo}>
                {!encolhido && <img src={Icon} alt="ícone logo marca" className={style.logo} />}
                <button className={style.botaoToggle} onClick={() => setEncolhido(!encolhido)}>
                    {encolhido ? <Menu /> : <ChevronLeft />}
                </button>
            </div>

            {!encolhido && (
                <div className={style.cabeca}>
                    <span className={style.textoCabeca}>Folha</span>
                    <span className={style.textoCabeca}>Versão: 0.1.0</span>
                </div>
            )}

            {!isFuncionario && !encolhido && (
                <div>
                    <input
                        type="text"
                        className={style.input}
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                    />
                </div>
            )}

            <div className={style.funcao} onClick={voltarHome}>
                <Home className={style.icon} />
                {!encolhido && <span className={style.textoFuncao}>Home</span>}
            </div>

            {!isFuncionario && (
                <>
                    <div className={style.funcao} onClick={exibirTabelaEmpregador}>
                        <HomeRepairService className={style.icon} />
                        {!encolhido && <span className={style.textoFuncao}>Empregador</span>}
                    </div>
                    <div className={style.funcao} onClick={exibirContadores}>
                        <ManageAccounts className={style.icon} />
                        {!encolhido && <span className={style.textoFuncao}>Contador</span>}
                    </div>
                    <div className={style.funcao} onClick={exibirFuncionarios}>
                        <Engineering className={style.icon} />
                        {!encolhido && <span className={style.textoFuncao}>Funcionário</span>}
                    </div>
                </>
            )}

            <div className={style.funcao} onClick={exibirTabelaContracheque}>
                <RequestPage className={style.icon} />
                {!encolhido && <span className={style.textoFuncao}>Contracheque</span>}
            </div>

            {!isFuncionario && (
                <div className={style.funcao} onClick={exibirTabelaSalario}>
                    <MonetizationOn className={style.icon} />
                    {!encolhido && <span className={style.textoFuncao}>Tabela salário</span>}
                </div>
            )}
        </div>
    );
};
