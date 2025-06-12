import { Cancel, CheckBox, Done, Logout } from "@mui/icons-material"
import { Box, Checkbox, Divider, Drawer, FormControlLabel, FormGroup, IconButton, Typography } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const DrawerConfigAccount = ({ open, onClose }) => {

    const navigate = useNavigate()

    const handleSairDaConta = () => {
        localStorage.clear()
        navigate('/')
    }

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onclose}
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
                    onClick={handleSairDaConta}
                >
                    <Logout />
                    <Typography>Sair da conta</Typography>
                </IconButton>

            </Box>
        </Drawer>
    )
}