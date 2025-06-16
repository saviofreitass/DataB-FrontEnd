import { Cancel, Logout } from "@mui/icons-material"
import { Box, Divider, Drawer, IconButton, Typography } from "@mui/material"
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { ModalConfirmacao } from "../ModalConfirmacao/ModalConfirmacao"

export const DrawerConfigAccount = ({ open, onClose }) => {
    const [modalAberto, setModalAberto] = useState(false)

    const navigate = useNavigate()

    const handleAbrirModal = () => {
        setModalAberto(true)
    }

    const handleFecharModal = () => {
        setModalAberto(false)
    }

    const handleSairDaConta = () => {
        localStorage.clear()
        navigate('/')
        handleFecharModal()
    }

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
        >
            <Box
                sx={{
                    marginTop: '6px',
                    width: '280px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h6">Configurações da conta</Typography>
                <IconButton onClick={onClose}>
                    <Cancel
                        sx={{
                            color: 'var(--danger)'
                        }}
                    />
                </IconButton>
            </Box>

            <Divider />

            <Box
                sx={{
                    marginTop: 1,
                }}
            >
                <IconButton
                    sx={{
                        color: 'var(--blue-300)',
                        gap: 2,
                        ":hover": {
                            backgroundColor: 'transparent'
                        }
                    }}
                    onClick={handleAbrirModal}
                >
                    <Logout />
                    <Typography>Sair da conta</Typography>
                </IconButton>

            </Box>
            <ModalConfirmacao
                open={modalAberto}
                onClose={handleFecharModal}
                onConfirm={handleSairDaConta}
                title="Sair da conta" 
                message="Você deseja sair da conta?"
                subMessage="Essa ação te redirecionará para a página de login!"
            />
        </Drawer>
    )
}