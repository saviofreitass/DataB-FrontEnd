import { Alert, Box, IconButton, Modal, Typography } from "@mui/material";
import Sucess from '../../assets/Success.svg';
import Warning from '../../assets/Warning.svg';
import { Cancel, Clear } from "@mui/icons-material";

export const ModalInfo = ({
    open,
    onClose,
    tipo = 'sucesso',
    mensagem = '',

}) => {
    const isSuccess = tipo === 'sucesso';
    const isError = tipo === 'erro';
    const isWarning = tipo === 'aviso';

    return (
        <Modal
            open={open}
            onClose={onClose}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                    width: 600,
                    borderRadius: 2,
                    padding: 4,
                    background: 'white',
                    textAlign: 'center',
                    boxShadow: 24,
                }}
            >
                <IconButton
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        color: tipo === 'sucesso' ? 'var(--blue-200)' : 'var(--danger)',
                    }}
                >
                    <Clear />
                </IconButton>

                <img
                    src={isSuccess ? Sucess : Warning}
                    alt={isSuccess ? "Sucesso" : isWarning ? "Aviso" : "Erro"}
                    style={{ width: 300, height: 300 }}
                />

                <Typography variant="h5" sx={{
                    color: isSuccess
                        ? 'var(--blue-200)'
                        : isError
                            ? 'var(--danger)'
                            : 'var(--warning-color)',
                    margin: 0
                }}>
                    <Alert severity={isSuccess ? 'success' : isError ? 'error' : 'warning'}>
                        {mensagem || (
                            isSuccess
                                ? 'Folha de pagamento enviada com sucesso!'
                                : isError
                                    ? 'Erro ao enviar folha de pagamento'
                                    : 'Atenção: alguns contracheques não foram enviados.'
                        )}
                    </Alert>
                </Typography>
            </Box>
        </Modal>
    )
}
