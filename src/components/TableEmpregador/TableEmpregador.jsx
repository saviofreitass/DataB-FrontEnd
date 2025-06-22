import { Add, Edit, Settings } from "@mui/icons-material"
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { RegistroEmpregador } from "../RegistroEmpregador/RegistroEmpregador"
import EmpregadorService from "../../Services/EmpregadorService"
import Warning from '../../assets/Warning.svg'
import { UpdateEmpregador } from "../UpdateEmpregador/UpdateEmpregador"


export const TableEmpregador = () => {
    const [mostrarRegistro, setMostrarRegistro] = useState(false)
    const [dadosEmpregador, setDadosEmpregador] = useState([])
    const [editarEmpregador, setEditarEmpregdor] = useState(false)
    const [empregadorSelecionado, setEmpregadorSelecionado] = useState(null)


    const carregarDadosEmpregadores = async () => {
        try {
            const response = await EmpregadorService.GetByIdContador()
            setDadosEmpregador(response.data)
        } catch (error) {
            console.error("Não foi possível buscar os empregadores!", error)
        }
    }

    useEffect(() => {
        carregarDadosEmpregadores()
    }, [])

    const handleAbrirRegistro = () => {
        setMostrarRegistro(true)
    }

    const handleFecharRegistro = () => {
        setMostrarRegistro(false)
        carregarDadosEmpregadores()
    }

    if (mostrarRegistro) {
        return <RegistroEmpregador onCancelar={handleFecharRegistro} />
    }

    if (dadosEmpregador.length === 0) {
        return (
            <Box sx={{
                width: 870,
                padding: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2
            }}>
                <img src={Warning} alt="Warning" width={300} />
                <Typography variant="h6" sx={{ color: 'var(--blue-300)', textAlign: 'center' }}>
                    Ops! Parece que ainda não existe nenhum empregador cadastrado!
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={handleAbrirRegistro}
                    sx={{
                        backgroundColor: 'var(--blue-200)',
                        ":hover": { backgroundColor: 'var(--blue-300)' }
                    }}
                >
                    Cadastrar Empregador
                </Button>
            </Box>
        )
    }

    const handleAbrirEdicao = (empregador) => {
        setEmpregadorSelecionado(empregador)
        setEditarEmpregdor(true)
    }


    const handleFecharEdicao = () => {
        setEditarEmpregdor(false)
    }

    const formatarCNPJ = (cnpj) => {
        const apenasNumeros = cnpj.replace(/\D/g, '')
        return apenasNumeros.replace(
            /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
            '$1.$2.$3/$4-$5'
        )
    }


    return (
        <TableContainer component={Paper} sx={{ maxWidth: '98%', border: 1, borderColor: 'var(--blue-200)' }}>
            <Table aria-label='simple table'>
                <TableHead>
                    <TableRow>
                        <TableCell>CNPJ</TableCell>
                        <TableCell>Razão social</TableCell>
                        <TableCell>Nome fantasia</TableCell>
                        <TableCell>Endereço</TableCell>
                        <TableCell>Edit</TableCell>
                        <TableCell>
                            <Add
                                sx={{
                                    color: 'var(--blue-200)',
                                    cursor: 'pointer',
                                    borderRadius: 5,
                                    ":hover": { backgroundColor: 'rgba(0, 123, 255, 0.2)' }
                                }}
                                onClick={handleAbrirRegistro}
                            />
                        </TableCell>
                        <TableCell>
                            <Settings
                                sx={{
                                    color: 'var(--blue-200)',
                                    cursor: 'pointer',
                                    borderRadius: 5,
                                    ":hover": { backgroundColor: 'rgba(0, 123, 255, 0.2)' }
                                }}
                            />
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dadosEmpregador.map((dados) => (
                        <TableRow
                            key={dados.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell sx={{ color: 'var(--blue-200)', fontWeight: 'bolder', whiteSpace: 'nowrap' }}>{formatarCNPJ(dados.cnpj)}</TableCell>
                            <TableCell sx={{ color: 'var(--blue-200)', fontWeight: 'bolder', whiteSpace: 'nowrap' }}>{dados.razaoSocial}</TableCell>
                            <TableCell sx={{ color: 'var(--blue-200)', fontWeight: 'bolder', whiteSpace: 'nowrap' }}>{dados.nomeFantasia}</TableCell>
                            <TableCell sx={{ color: 'var(--blue-200)', fontWeight: 'bolder', whiteSpace: 'nowrap' }}>{dados.endereco}</TableCell>
                            <TableCell align='left'>
                                <Edit
                                    onClick={() => handleAbrirEdicao(dados)}
                                    sx={{
                                        color: 'var(--blue-200)',
                                        cursor: 'pointer',
                                        borderRadius: 5,
                                        ":hover": { backgroundColor: 'rgba(0, 123, 255, 0.2)' }
                                    }}
                                />

                            </TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <UpdateEmpregador
                open={editarEmpregador}
                onClose={handleFecharEdicao}
                empregador={empregadorSelecionado}
            />

        </TableContainer>
    )
}
