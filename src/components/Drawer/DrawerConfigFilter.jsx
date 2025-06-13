import { Cancel, CheckBox, Done } from "@mui/icons-material"
import { Box, Checkbox, Divider, Drawer, FormControlLabel, FormGroup, IconButton, Typography } from "@mui/material"
import { useState } from "react"

export const DrawerConfigFilter = ({ open, onClose }) => {

    return (
        <Drawer
            open={open}
            onClose={onClose}
            anchor="right"
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
                <Typography variant="h6"  > Configurações </Typography>
                <IconButton>
                    <Done
                        sx={{
                            color: 'var(--ativo)'
                        }}

                    />
                </IconButton>
                <IconButton
                    onClick={onClose}
                >
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
                <FormGroup
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 1,
                    }}
                >
                    <FormControlLabel control={<Checkbox />} label="Exibir funcionário inativos" sx={{ color: 'var(--blue-300)' }} />
                    <FormControlLabel control={<Checkbox />} label="Exibir funcionário inativos" sx={{ color: 'var(--blue-300)' }} />
                    <FormControlLabel control={<Checkbox />} label="Exibir funcionário inativos" sx={{ color: 'var(--blue-300)' }} />
                </FormGroup>
            </Box>
        </Drawer>
    )
}