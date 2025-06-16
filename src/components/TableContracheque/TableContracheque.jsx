import {
    Grid,
    IconButton,
    CardActions,
    CardContent,
    Paper,
    Typography,
    Collapse,
    Divider,
    Box
} from "@mui/material";
import { useEffect, useState } from "react";
import ContrachequeService from "../../Services/ContrachequeService";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

export const TableContracheque = () => {
    const [dadosContracheque, setDadosContracheque] = useState([]);
    const [expandido, setExpandido] = useState({});

    const carregarContracheques = async () => {
        try {
            const response = await ContrachequeService.GetByFuncionarioId();
            if (response) {
                setDadosContracheque(response.data);
            }
        } catch (error) {
            console.error('Erro ao carregar contracheques:', error);
        }
    };

    useEffect(() => {
        carregarContracheques();
    }, []);

    const toggleExpandir = (id) => {
        setExpandido((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    return (
        <Grid container spacing={2}>
            {dadosContracheque.length === 0 ? (
                <Typography>Nenhum contracheque encontrado.</Typography>
            ) : (
                dadosContracheque.map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item.id}>
                        <Paper
                            elevation={4}
                            sx={{
                                borderRadius: 2,
                                padding: 2,
                                border: '1px solid var(--blue-200)',
                                background: '#f5f5f5',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                transition: 'all 0.3s ease',
                                ...(expandido[item.id] && {
                                    width: {
                                        xs: '95%',
                                        sm: '100%',
                                        md: '100%'
                                    },
                                })
                            }}
                        >
                            <CardContent>
                                <Typography>
                                    <strong>Data de pagamento:</strong> {item.dataPagamento}
                                </Typography>
                                <Typography>
                                    <strong>Competência:</strong> {item.dataRefInicio} até {item.dataRefFim}
                                </Typography>
                                <Typography sx={{ color: 'var(--ativo)' }}>
                                    <strong>Salário base:</strong> R$ {item.salarioBase}
                                </Typography>
                            </CardContent>

                            <Collapse in={expandido[item.id]} timeout="auto" unmountOnExit>
                                <CardContent>
                                    <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                                        <Box sx={{ flex: 1, minWidth: '250px' }}>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'var(--blue-300)', mb: 1 }}>
                                                Adicionais
                                            </Typography>
                                            <Divider sx={{ mb: 2 }} />
                                            <Typography><strong>Horas extras:</strong> R$ {item.horaExtra}</Typography>
                                            <Typography><strong>Adicional noturno:</strong> R$ {item.adicionalNoturno}</Typography>
                                            <Typography><strong>Comissões:</strong> R$ {item.comissoes}</Typography>
                                            <Typography><strong>Benefícios:</strong> R$ {item.beneficios}</Typography>
                                        </Box>

                                        <Box sx={{ flex: 1, minWidth: '250px' }}>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'var(--blue-300)', mb: 1 }}>
                                                Descontos
                                            </Typography>
                                            <Divider sx={{ mb: 2 }} />
                                            <Typography><strong>INSS:</strong> R$ {item.inss}</Typography>
                                            <Typography><strong>IRRF:</strong> R$ {item.irrf}</Typography>
                                            <Typography><strong>FGTS:</strong> R$ {item.fgts}</Typography>
                                            <Typography><strong>Outros descontos:</strong> R$ {item.outrosDescontos}</Typography>
                                        </Box>
                                    </Box>

                                    <Box sx={{ mt: 3 }}>
                                        <Divider />
                                        <Typography sx={{ mt: 2, color: 'var(--ativo)' }}>
                                            <strong>Valor líquido:</strong> R$ {(
                                                item.salarioBase +
                                                item.horaExtra +
                                                item.adicionalNoturno +
                                                item.comissoes +
                                                item.beneficios -
                                                (item.inss + item.irrf + item.fgts + item.outrosDescontos)
                                            ).toFixed(2)}
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Collapse>

                            <CardActions>
                                <IconButton
                                    onClick={() => toggleExpandir(item.id)}
                                    sx={{
                                        color: 'var(--blue-300)',
                                        ":hover": { borderRadius: 2, backgroundColor: 'var(--blue-100)' },
                                    }}
                                >
                                    {expandido[item.id] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                                    <Typography sx={{ paddingLeft: 1 }}>
                                        {expandido[item.id] ? 'Ver menos' : 'Ver mais'}
                                    </Typography>
                                </IconButton>
                            </CardActions>
                        </Paper>
                    </Grid>
                ))
            )}
        </Grid>
    );
};
