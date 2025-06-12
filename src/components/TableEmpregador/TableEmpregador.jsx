import { Add, Edit, Key, Settings } from "@mui/icons-material"
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"
import { RegistroEmpregador } from "../RegistroEmpregador/RegistroEmpregador"
import EmpregadorService from "../../Services/EmpregadorService"

export const TableEmpregador = () => {
    const [mostrarRegistro, setMostrarRegistro] = useState(false)
    const [dadosEmpregador, setDadosEmpregador] = useState([])

    const carregarDadosEmpregadores = async () => {
        try {
            const response = await EmpregadorService.GetByIdContador()
            setDadosEmpregador(response.data)
            console.log("Passo aqui", response.data)
        } catch (error) {
            console.error("Não foi possível buscar os empregadores!", error)
        }
    }

    useEffect(() =>{
        carregarDadosEmpregadores()
    }, [])

    const handleAbrirRegistro = () => {
        setMostrarRegistro(true)
    }

    const handleFecharRegistro = () => {
        setMostrarRegistro(false)
    }

    if (mostrarRegistro) {
        return <RegistroEmpregador onCancelar={handleFecharRegistro} />
    }

    return (
        <TableContainer component={Paper} sx={{ width: 870, border: 1, borderColor: 'var(--blue-200)' }}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                    <TableRow>
                        <TableCell align="left">CNPJ</TableCell>
                        <TableCell align="left">Razão social</TableCell>
                        <TableCell align="left">Nome fantasia</TableCell>
                        <TableCell align="left">Endereço</TableCell>
                        <TableCell align="left">
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
                    {dadosEmpregador.map((dadosEmpregador) => (
                        <TableRow
                            key={dadosEmpregador.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell sx={{ color: 'var(--blue-200)', fontWeight: 'bolder' }}>{dadosEmpregador.cnpj}</TableCell>
                            <TableCell sx={{ color: 'var(--blue-200)', fontWeight: 'bolder' }}>{dadosEmpregador.razaoSocial}</TableCell>
                            <TableCell sx={{ color: 'var(--blue-200)', fontWeight: 'bolder' }}>{dadosEmpregador.nomeFantasia}</TableCell>
                            <TableCell sx={{ color: 'var(--blue-200)', fontWeight: 'bolder' }}>{dadosEmpregador.endereco}</TableCell>
                            <TableCell align='center'>
                                <Edit
                                    sx={{
                                        color: 'var(--blue-200)',
                                        cursor: 'pointer',
                                        borderRadius: 5,
                                        ":hover": { backgroundColor: 'rgba(0, 123, 255, 0.2)' }
                                    }}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}