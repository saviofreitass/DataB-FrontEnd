import { useState } from "react";
import { Sidebar } from "../../components/sidebar/Sidebar";
import style from "./Home.module.css";
import Otimizacao from "../../assets/Otimizacao.svg"
import { AccountCircle, NotificationsNone } from "@mui/icons-material";
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import Empregador from "../../assets/Empregador.svg"
import Contador from '../../assets/Contador.svg'
import Funcionario from '../../assets/Funcionario.svg'
import SearchFile from '../../assets/SearchFile.svg'
import { TableFuncionario } from "../../components/TableFuncionario/TableFuncionario";
import { TableContador } from "../../components/TableContador/TableContador";

export const Home = () => {
    const [tabelaSelecionada, setTabelaSelecionada] = useState('');

    const exibirFuncionarios = () => {
        setTabelaSelecionada('funcionarios');
    };

    const exibirContadores = () => {
        setTabelaSelecionada('contadores');
    };

    return (
        <div className={style.container}>
            <aside>
                <Sidebar 
                    voltarHome={() => setTabelaSelecionada('')} 
                    exibirFuncionarios={exibirFuncionarios} 
                    exibirContadores={exibirContadores}
                />
            </aside>
            <main className={style.main}>
                <div className={style.content}>
                    <div className={style.contentInput}>
                        <input type="text" placeholder="Empregador" className={style.inputEmpregador} />
                        <input type="text" placeholder="Ano" className={style.inputYear} />
                        <input type="text" placeholder="Mês" className={style.inputDateMonth} />
                    </div>
                    <div className={style.profile}>
                        <div>
                            <NotificationsNone sx={{color: 'var(--text-secund)'}}/>
                        </div>
                        <AccountCircle sx={{color: 'var(--text-secund)'}}/>
                        <span className={style.profileName}>João Pedro Vidal</span>
                    </div>
                </div>
                
                {!tabelaSelecionada ? (
                    <div className={style.contentMain}>
                        <div>
                            <h2>Auxiliares de Cadastros</h2>
                        </div>
                        <div className={style.cards}>
                            <Card>
                                <CardActionArea>
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
                                <CardActionArea>
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
                        </div>
                    </div>
                ) : (
                    <div className={style.contentMain}>
                        {tabelaSelecionada === 'funcionarios' && (
                            <>
                                <h2>Consulta de Funcionários</h2>
                                <TableFuncionario />
                            </>
                        )}
                        {tabelaSelecionada === 'contadores' && (
                            <>
                                <h2>Conulta de Contadores</h2>
                                <TableContador />
                            </>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};
