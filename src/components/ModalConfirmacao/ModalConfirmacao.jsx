import { Cancel, Done, SaveAlt } from "@mui/icons-material";
import { Alert, Box, Button, Modal, Typography } from "@mui/material";

export const ModalConfirmacao = ({
    open,
    onClose,
    onConfirm,
    title = 'Confirmação',
    message = 'Tem certeza que seja realizar essa ação?',
    subMessage = ''
}) => {
    return (
        <Modal
            open={!!open}
            onClose={onClose || (() => { })}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'white',
                    padding: 4,
                    borderRadius: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2,
                    width: 400,
                    outline: 'none',
                    textAlign: 'center',
                }}
            >
                <Typography variant="h6" component="h2"
                    sx={{ color: 'var(--blue-300)' }}
                >
                    {title}
                </Typography>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%'
                }}>
                    <Typography sx={{ textAlign: 'center', width: '100%' }}>
                        {message}
                    </Typography>
                {subMessage && (
                    <Typography variant="h6" sx={{
                        textAlign: 'center',
                        width: '100%',
                        marginTop: 1
                    }}>
                        <Alert
                            severity="warning"
                        >
                            {subMessage}
                        </Alert>
                    </Typography>
                )}                    
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, width: '100%' }}>
                    <Button
                        sx={{ background: 'var(--ativo)' }}
                        variant="contained"
                        color="primary"
                        startIcon={<Done />}
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                    >
                        Sim
                    </Button>
                    <Button
                        sx={{ border: '1px solid var(--danger)' }}
                        variant="outlined"
                        color="error"
                        startIcon={<Cancel />}
                        onClick={onClose}
                    >
                        Não
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}