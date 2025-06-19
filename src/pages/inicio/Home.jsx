import { useEffect, useState } from "react"
import { Outlet, useNavigate, useLocation } from "react-router-dom"

import { AccountCircle, NotificationsNone } from "@mui/icons-material"
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material"

import Empregador from "../../assets/Empregador.svg"
import Contador from '../../assets/Contador.svg'
import Funcionario from '../../assets/Funcionario.svg'
import SearchFile from '../../assets/SearchFile.svg'
import Salario from '../../assets/Salario.svg'

import { Sidebar } from "../../components/sidebar/Sidebar"
import style from "./Home.module.css"

import { decodeJWT } from "../../components/Utils/DecodeToken"
import { DrawerConfigAccount } from "../../components/Drawer/DrawerConfigAccount"
import EmpregadorService from "../../Services/EmpregadorService"

export const Home = () => {
    const [userRole, setUserRole] = useState('')
    const [nomeUsuario, setNomeUsuario] = useState('')
    const [abrirDrawer, setAbrirDrawer] = useState(false)
    const [empregadores, setEmpregadores] = useState([])
    const [empregadorSelecionado, setEmpregadorSelecionado] = useState('')

    const navigate = useNavigate();
    const location = useLocation();

    const isPaginaInicial = location.pathname === '/home'

    const getEmpregadores = async () => {
        try {
            const response = await EmpregadorService.GetByIdContador()
            setEmpregadores(response.data)
        } catch (error) {
            console.error('Erro ao buscar empregadores:', error)
        }
    };

    useEffect(() => {
        getEmpregadores()
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            const payload = decodeJWT(token)
            if (payload?.tipo) {
                setUserRole(payload.tipo)
                setNomeUsuario(payload.nome)
            }
        }
    }, []);

    const handleAbrirDrawer = () => setAbrirDrawer(true)
    const handleFecharDrawer = () => setAbrirDrawer(false)

    const navegar = (path) => navigate(`/home/${path}`)


    const renderCards = () => {
        if (userRole === 'ROLE_FUNCIONARIO') {
            return (
                <Card>
                    <CardActionArea onClick={() => navegar('contracheques')}>
                        <CardMedia component="img" height="165" image={SearchFile} alt="logo" />
                        <CardContent>
                            <Typography gutterBottom variant="h6">Contracheque</Typography>
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
                        <CardActionArea onClick={() => navegar('empregadores')}>
                            <CardMedia component="img" height="165" image={Empregador} alt="logo" />
                            <CardContent>
                                <Typography gutterBottom variant="h6">Empregador</Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Faça o cadastro dos empregadores
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>

                    <Card>
                        <CardActionArea onClick={() => navegar('contadores')}>
                            <CardMedia component="img" height="165" image={Contador} alt="logo" />
                            <CardContent>
                                <Typography gutterBottom variant="h6">Contador</Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Faça o cadastro dos contadores
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>

                    <Card>
                        <CardActionArea onClick={() => navegar('funcionarios')}>
                            <CardMedia component="img" height="165" image={Funcionario} alt="logo" />
                            <CardContent>
                                <Typography gutterBottom variant="h6">Funcionário</Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Faça o cadastro dos funcionários
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>

                    <Card>
                        <CardActionArea onClick={() => navegar('tabelaSalario')}>
                            <CardMedia component="img" height="165" image={Salario} alt="logo" />
                            <CardContent>
                                <Typography gutterBottom variant="h6">Tabela Salário</Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Faça a folha de pagamento da sua empresa
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>

                    <Card>
                        <CardActionArea onClick={() => navegar('contracheques')}>
                            <CardMedia component="img" height="165" image={SearchFile} alt="logo" />
                            <CardContent>
                                <Typography gutterBottom variant="h6">Contracheque</Typography>
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
                    voltarHome={() => navigate('/home')}
                    exibirFuncionarios={() => navegar('funcionarios')}
                    exibirContadores={() => navegar('contadores')}
                    exibirTabelaSalario={() => navegar('tabelaSalario')}
                    exibirTabelaEmpregador={() => navegar('empregadores')}
                    exibirTabelaContracheque={() => navegar('contracheques')}
                    isFuncionario={userRole === 'ROLE_FUNCIONARIO'}
                />
            </aside>

            {abrirDrawer && <DrawerConfigAccount open={abrirDrawer} onClose={handleFecharDrawer} />}

            <main className={style.main}>
                <div className={style.content}>
                    <div className={style.contentInput}>
                        <select
                            className={style.inputEmpregador}
                            value={empregadorSelecionado}
                            onChange={(e) => setEmpregadorSelecionado(e.target.value)}
                        >
                            <option value=''>Selecione um empregador</option>
                            {empregadores.map(emp => (
                                <option key={emp.id} value={emp.id}>
                                    {emp.razaoSocial}
                                </option>
                            ))}
                        </select>
                        <input type="date" className={style.inputYear} />
                        <input type="date" className={style.inputDateMonth} />
                    </div>

                    <div className={style.profile}>
                        <div>
                            <NotificationsNone sx={{ color: 'var(--text-secund)' }} />
                        </div>
                        <AccountCircle
                            sx={{ color: 'var(--text-secund)', cursor: 'pointer' }}
                            onClick={handleAbrirDrawer}
                        />
                        <span className={style.profileName}>{nomeUsuario}</span>
                    </div>
                </div>

                <div className={style.contentMain}>
                    {isPaginaInicial ? (
                        <>
                            <h2>Auxiliares de Cadastros</h2>
                            <div className={style.cards}>{renderCards()}</div>
                        </>
                    ) : (
                        <Outlet context={{ empregadorSelecionado }} />
                    )}
                </div>
            </main>
        </div>
    );
};