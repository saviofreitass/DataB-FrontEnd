import { Logout, ManageAccounts, Settings } from "@mui/icons-material"
import { Box, Divider, IconButton, Popover, Typography } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ModalConfirmacao } from "../ModalConfirmacao/ModalConfirmacao"
import { decodeJWT } from "../Utils/DecodeToken"
import ContadorService from "../../Services/ContadorService"
import { DrawerConfigAccount } from '../Drawer/DrawerConfigAccount'


export const MenuAccount = ({ anchorEl, onClose, onAbrirDrawer }) => {
    const [modalAberto, setModalAberto] = useState(false)
    const navigate = useNavigate()
    const [drawerAberto, setDrawerAberto] = useState(false)
    const [dadosDoContador, setDadosDoContador] = useState(null)


    const handleLogout = () => {
        localStorage.clear()
        navigate('/')
    }

    const handleAbrirConfiguracoes = async () => {
        try {
            const token = localStorage.getItem('token')
            const payload = decodeJWT(token)
            const id = payload?.id

            if (!id) {
                console.error('ID não encontrado no token')
                return
            }

            const response = await ContadorService.getId(id)
            onAbrirDrawer(response.data)
            onClose()
        } catch (error) {
            console.error('Erro ao buscar dados do contador:', error)
        }
    }




    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined

    return (
        <>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={onClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <Box sx={{ p: 2, width: '230px', }}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            mb: 1
                        }}
                    >
                        <Settings sx={{ color: 'var(--blue-200)' }} />
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bolder' }}>
                            Configurações
                        </Typography>
                    </Box>


                    <Divider />

                    <Box
                        sx={{
                            marginTop: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            cursor: 'pointer',
                            color: 'var(--blue-300)',
                            ":hover": { opacity: 0.7 }
                        }}
                        onClick={handleAbrirConfiguracoes}
                    >
                        <ManageAccounts />
                        <Typography sx={{ whiteSpace: 'nowrap' }}>Configurações da conta</Typography>
                    </Box>

                    <Box
                        sx={{
                            marginTop: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            cursor: 'pointer',
                            color: 'var(--blue-300)',
                            ":hover": { opacity: 0.7 }
                        }}
                        onClick={() => setModalAberto(true)}
                    >
                        <Logout />
                        <Typography sx={{ color: 'var(--danger)' }} >Sair da conta</Typography>
                    </Box>
                </Box>
            </Popover>

            <ModalConfirmacao
                open={modalAberto}
                onClose={() => setModalAberto(false)}
                onConfirm={handleLogout}
                title="Sair da conta"
                message="Deseja realmente sair da conta?"
                subMessage="Você será redirecionado para a tela de login."
            />
        </>
    )
}
