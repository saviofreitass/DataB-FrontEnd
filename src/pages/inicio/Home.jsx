import { Sidebar } from "../../components/sidebar/Sidebar";
import style from "./Home.module.css";
import Otimizacao from "../../assets/Otimizacao.svg"
import { AccountCircle, HomeRepairService, NotificationsNone } from "@mui/icons-material";
import { Card, CardActionArea, CardContent, CardMedia, colors, Typography } from "@mui/material";
import Empregador from "../../assets/Empregador.svg"
import  Contador from '../../assets/Contador.svg'
import Funcionario from '../../assets/Funcionario.svg'
import SearchFile from '../../assets/SearchFile.svg'

export const Home = () => {
    return (
        <div className={style.container}>
            <aside>
                <Sidebar />
            </aside>
            <main className={style.main}>
                <div className={style.content}>
                    <div className={style.contentInput}>
                        <input type="text" placeholder="Empregador" className={style.inputEmpregador} />
                        <input type="text" className={style.inputYear} />
                        <input type="text" className={style.inputDateMonth} />
                    </div>
                    <div className={style.profile}>
                        <div>
                            <NotificationsNone />
                        </div>
                        <AccountCircle />
                        <span className={style.profileName}>João Pedro Vidal</span>
                    </div>
                </div>
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
                                    <Typography gutterBottom variant="h6" component="div">
                                        Empregador
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secundary' }}>
                                        Faça o cadastro dos empregadores
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>

                        <Card>
                            <CardActionArea>
                                <CardMedia 
                                    component="img"
                                    height="165"
                                    image={Contador}
                                    alt="logo"
                                />
                                    
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="div">
                                        Contador
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secundary' }}>
                                        Faça o cadastro dos contadores
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>

                        <Card>
                            <CardActionArea>
                                <CardMedia 
                                    component="img"
                                    height="165"
                                    image={Funcionario}
                                    alt="logo"
                                />
                                    
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="div">
                                        Funcionário
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secundary' }}>
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
                                    <Typography gutterBottom variant="h6" component="div">
                                        Contracheque
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secundary' }}>
                                        Visualize os seus últimos contracheques
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
};
