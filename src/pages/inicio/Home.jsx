import { useEffect, useState } from "react";

import { AccountCircle, NotificationsNone } from "@mui/icons-material";
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";

import Otimizacao from "../../assets/Otimizacao.svg"
import Empregador from "../../assets/Empregador.svg"
import Contador from '../../assets/Contador.svg'
import Funcionario from '../../assets/Funcionario.svg'
import SearchFile from '../../assets/SearchFile.svg'
import Pagamento from '../../assets/Pagamento.svg'
import Salario from '../../assets/Salario.svg'

import { Sidebar } from "../../components/sidebar/Sidebar";
import style from "./Home.module.css";
import { TableFuncionario } from "../../components/TableFuncionario/TableFuncionario";
import { TableContador } from "../../components/TableContador/TableContador";
import { TableSalario } from "../../components/TableSalario/TableSalario";

import { decodeJWT } from "../../components/Utils/DecodeToken";
import { TableContracheque } from "../../components/TableContracheque/TableContracheque";
import { TableEmpregador } from "../../components/TableEmpregador/TableEmpregador";
import { DrawerConfigAccount } from "../../components/Drawer/DrawerConfigAccount";
import EmpregadorService from "../../Services/EmpregadorService";

export const Home = () => {
    const [tabelaSelecionada, setTabelaSelecionada] = useState('')
    const [userRole, setUserRole] = useState('')
    const [nomeUsuario, setNomeUsuario] = useState('')
    const [abrirDrawer, setAbrirDrawer] = useState(false) 
    const [empregadores, setEmpregadores] = useState([])
    const [empregadorSelecionado, setEmpregadorSelecionado] = useState('')

    const getEmpregadores = async () => {
        try {
            const response = await EmpregadorService.GetByIdContador()
            setEmpregadores(response.data)
        } catch (error) {
            console.error('Deu erro aqui, animal', error)
        }
    }

    useEffect(()=> {
        getEmpregadores()
    }, [])

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token){
            const payload = decodeJWT(token)
            if(payload?.tipo){
                setUserRole(payload.tipo)
                setNomeUsuario(payload.nome)
            }
        }
    }, [])
    
    const handleAbrirDrawer = () => {
        setAbrirDrawer(true)
    }

    const handleFecharDrawer = () => {
        setAbrirDrawer(false)   
    }
    const exibirFuncionarios = () => {
        setTabelaSelecionada('funcionarios')
    }

    const exibirContadores = () => {
        setTabelaSelecionada('contadores')
    }

    const exibirTabelaSalario = () => {
        setTabelaSelecionada('tabelaSalario')
    }

    const exibirTabelaContracheque = () => {
        setTabelaSelecionada('tabelaContraCheque')
    }

    const exibirTabelaEmpregador = () => {
        setTabelaSelecionada('tabelaEmpregador')
    }

    const renderCards = () => {
        if (userRole === 'ROLE_FUNCIONARIO') {
            return (
                <Card>
                    <CardActionArea
                        onClick={exibirTabelaContracheque}
                    >
                        <CardMedia 
                            component="img"
                            height="165"
                            image={SearchFile}
                            alt="logo"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h6">
                                Contracheque
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Visualize os seus últimos contracheques
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            );
        } else if (userRole === 'ROLE_CONTADOR') {
            return (
                <>
                    <Card>
                        <CardActionArea onClick={exibirTabelaEmpregador}>
                            <CardMedia 
                                component="img"
                                height="165"
                                image={Empregador}
                                alt="logo"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h6">
                                    Empregador
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Faça o cadastro dos empregadores
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>

                    <Card>
                        <CardActionArea onClick={exibirContadores}> 
                            <CardMedia 
                                component="img"
                                height="165"
                                image={Contador}
                                alt="logo"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h6">
                                    Contador
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Faça o cadastro dos contadores
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>

                    <Card>
                        <CardActionArea onClick={exibirFuncionarios}>
                            <CardMedia 
                                component="img"
                                height="165"
                                image={Funcionario}
                                alt="logo"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h6">
                                    Funcionário
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Faça o cadastro dos funcionários
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>

                    <Card>
                        <CardActionArea onClick={exibirTabelaSalario}>
                            <CardMedia 
                                component="img"
                                height="165"
                                image={Salario}
                                alt="logo"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h6">
                                    Tabela Salário
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Faça a folha de pagamento da sua empresa
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>

                    <Card>
                        <CardActionArea onClick={exibirTabelaContracheque}>
                            <CardMedia 
                                component="img"
                                height="165"
                                image={SearchFile}
                                alt="logo"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h6">
                                    Contracheque
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Visualize os seus últimos contracheques
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </>
            );
        }
        return null;
    };

    return (
        <div className={style.container}>
            <aside>
                <Sidebar 
                    voltarHome={() => setTabelaSelecionada('')} 
                    exibirFuncionarios={exibirFuncionarios} 
                    exibirContadores={exibirContadores}
                    exibirTabelaSalario={exibirTabelaSalario}
                    exibirTabelaEmpregador={exibirTabelaEmpregador}
                    exibirTabelaContracheque={exibirTabelaContracheque}
                    isFuncionario={userRole === 'ROLE_FUNCIONARIO'}
                />
            </aside>
            {abrirDrawer && <DrawerConfigAccount open={abrirDrawer} onClose={handleFecharDrawer}/> }
            <main className={style.main}>
                <div className={style.content}>
                    <div className={style.contentInput}>
                        <select 
                            className={style.inputEmpregador}
                            value={empregadorSelecionado}
                            onChange={(e) => setEmpregadorSelecionado(e.target.value)}
                        >
                            <option value=''>Selecione um empregador</option>
                            {empregadores.map((dadosEmpregador) => (
                                <option key={dadosEmpregador.id} value={dadosEmpregador.id}>
                                    {dadosEmpregador.razaoSocial}
                                </option>
                            ))}
                        </select>
                        <input type="date" placeholder="Ano" className={style.inputYear} />
                        <input type="date" placeholder="Mês" className={style.inputDateMonth} />
                    </div>
                    <div className={style.profile}>
                        <div>
                            <NotificationsNone sx={{color: 'var(--text-secund)'}}/>
                        </div>
                        <AccountCircle 
                            sx={{color: 'var(--text-secund)', cursor: 'pointer' }}
                            onClick={handleAbrirDrawer}
                            />
                        <span className={style.profileName}>{nomeUsuario}</span>
                    </div>
                </div>
                
                {!tabelaSelecionada ? (
                    <div className={style.contentMain}>
                        <div>
                            <h2>Auxiliares de Cadastros</h2>
                        </div>
                        <div className={style.cards}>
                            {renderCards()}
                        </div>
                    </div>
                ) : (
                    <div className={style.contentMain}>
                        {tabelaSelecionada === 'funcionarios' && (
                            <>
                                <h2>Consulta de Funcionários</h2>
                                <TableFuncionario idEmpregador={empregadorSelecionado}/>
                            </>
                        )}
                        {tabelaSelecionada === 'contadores' && (
                            <>
                                <h2>Consulta de Contadores</h2>
                                <TableContador />
                            </>
                        )}
                        {tabelaSelecionada === 'tabelaSalario' && (
                            <>
                                <h2>Tabela Salário</h2>
                                <TableSalario />
                            </>
                        )}
                        {tabelaSelecionada === 'tabelaContraCheque' && (
                            <>
                                <h2>Consulta de contracheques</h2>
                                <TableContracheque />
                            </>
                        )}
                        {tabelaSelecionada === 'tabelaEmpregador' && (
                            <>
                                <h2>Consulta de empregadores</h2>
                                <TableEmpregador />
                            </>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};