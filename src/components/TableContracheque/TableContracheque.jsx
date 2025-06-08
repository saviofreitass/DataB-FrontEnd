import { BorderColor } from "@mui/icons-material"
import { Chip, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"

export const TableContracheque = () => {

    const rows = {
        'Documento': '00000000000',
        'crc': '123456',
        'nome': 'João Pedro Vidal',
        'ativo': 'ativo'
    }

    return (
        <TableContainer component={Paper} sx={{ width: 870, border: 1, BorderColor: 'var(--blue-200)' }}>
            <TableHead sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableRow>
                    <TableCell align="left">Documento</TableCell>
                    <TableCell align="left">Crc</TableCell>
                    <TableCell align="left">Nome</TableCell>
                    <TableCell align="left">Status</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((rows) => (
                    <TableRow
                        key={rows.Documento}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell sx={{ color: 'var(--blue-200)', fontWeight: 'bolder' }}>{rows.crc}</TableCell>
                        <TableCell sx={{ color: 'var(--blue-200)', fontWeight: 'bolder' }}>{rows.nome}</TableCell>
                        <TableCell>
                            <Chip 
                                size="small"
                                variant="outilined"
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </TableContainer>
    )
}