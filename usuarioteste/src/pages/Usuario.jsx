import { Box, Button, Typography, Paper, Stack } from '@mui/material'
import { useState, useEffect } from 'react'
import { useUser } from '../context/UsuarioContext'

const Usuario = () => {

    const { user } = useUser()

    const userData = user.usuario


    const handleLogout = () => {
        // Função para realizar o logout (limpar dados, redirecionar, etc.)
        console.log('Logout realizado.')
        // Você pode adicionar lógica para redirecionar o usuário ou limpar o token
    }

    return (
        <Stack spacing={3} sx={{ padding: 4 }}>
            <Typography variant="h4" align="center">Informações do Usuário</Typography>
            <Paper elevation={3} sx={{ padding: 3 }}>
                {userData ? (
                    <>
                        <Typography variant="h6">Nome: {userData.nome}</Typography>
                        <Typography variant="body1">Email: {userData.email}</Typography>
                        <Typography variant="body1">ID do Perfil: {userData.perfilId}</Typography>
                        <Typography variant="body2" color="textSecondary">Criado em: {new Date(userData.criado_em).toLocaleDateString()}</Typography>
                        <Typography variant="body2" color="textSecondary">Última atualização: {new Date(userData.atualizado_em).toLocaleDateString()}</Typography>
                    </>
                ) : (
                    <Typography variant="body1">Carregando informações...</Typography>
                )}
            </Paper>

            <Button variant="outlined" color="secondary" onClick={handleLogout} sx={{ alignSelf: 'center' }}>
                Sair
            </Button>
        </Stack>
    )
}

export default Usuario
