import { Cancel, Done, SaveAlt } from "@mui/icons-material";
import { Box, Button, Modal, Typography } from "@mui/material";

export const ModalConfirmacao = ({ open, onClose, onConfirm }) => {
    console.log("ModalConfirmacao aberto?", open);

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
                }}
            >
                <Typography>
                    Tem certeza que deseja salvar esses dados preenchidos?
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                    <Button
                        sx={{ background: 'var(--ativo)' }}
                        variant="contained"
                        color="primary"
                        startIcon={<Done />}
                        onClick={() => {
                            console.log("Dados confirmados!");
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
