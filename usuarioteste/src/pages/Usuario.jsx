import { Box, Button, Typography, Paper, Stack, Modal, TextField } from '@mui/material'
import { useState, useEffect } from 'react'
import { useUser } from '../context/UsuarioContext'
import { useNavigate } from 'react-router-dom'

const Usuario = () => {
    const { user, logout } = useUser()
    const navigate = useNavigate()
    const userData = user.user

    const [openModal, setOpenModal] = useState(false);
    const [cliente, setCliente] = useState({ nome: '', email: '', telefone: '' });
    const [clientes, setClientes] = useState([]); // 🔥 Estado para armazenar os clientes

    // 🔥 Buscar clientes ao carregar a página
    useEffect(() => {
        fetchClientes();
    }, []);

    // 🔥 Função para buscar os clientes da API
    const fetchClientes = async () => {
        try {
            const response = await fetch("http://localhost:3000/clientes");
            if (response.ok) {
                const data = await response.json();
                setClientes(data);
            } else {
                console.error("Erro ao buscar clientes");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/')
    };

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const handleChange = (e) => {
        setCliente({ ...cliente, [e.target.name]: e.target.value });
    };

    const handleCadastrarCliente = async () => {
        try {
            const response = await fetch("http://localhost:3000/clientes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(cliente),
            });

            if (response.ok) {
                console.log("Cliente cadastrado com sucesso!");
                setCliente({ nome: '', email: '', telefone: '' }); // Limpa os campos
                handleCloseModal(); // Fecha o modal
                fetchClientes(); // 🔥 Atualiza a lista de clientes
            } else {
                console.error("Erro ao cadastrar cliente");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    };

    return (
        <Stack spacing={3} sx={{ padding: 4 }}>
            <Typography variant="h4" align="center">Informações do Usuário</Typography>
            <Paper elevation={3} sx={{ padding: 3 }}>
                {userData ? (
                    <>
                        <Typography variant="h6">Nome: {userData.name}</Typography>
                        <Typography variant="body1">Email: {userData.email}</Typography>
                        <Typography variant="body1">ID do Perfil: {userData.id}</Typography>
                    </>
                ) : (
                    <Typography variant="body1">Carregando informações...</Typography>
                )}
            </Paper>

            {/* Botões */}
            <Stack direction="row" spacing={2} justifyContent="center">
                <Button variant="contained" color="primary" onClick={handleOpenModal}>
                    Cadastrar Cliente
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleLogout}>
                    Sair
                </Button>
            </Stack>

            {/* 🔥 Lista de Clientes */}
            <Typography variant="h5" sx={{ mt: 4 }}>Clientes Cadastrados:</Typography>
            {clientes.length > 0 ? (
                clientes.map((cliente) => (
                    <Paper key={cliente.id} elevation={2} sx={{ padding: 2, mt: 1 }}>
                        <Typography variant="h6">{cliente.nome}</Typography>
                        <Typography variant="body2">Email: {cliente.email}</Typography>
                        <Typography variant="body2">Telefone: {cliente.telefone || "Não informado"}</Typography>
                    </Paper>
                ))
            ) : (
                <Typography variant="body2">Nenhum cliente cadastrado ainda.</Typography>
            )}

            {/* Modal de Cadastro de Cliente */}
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                }}>
                    <Typography id="modal-title" variant="h6" component="h2">
                        Cadastrar Cliente
                    </Typography>
                    <Stack spacing={2} sx={{ mt: 2 }}>
                        <TextField
                            label="Nome"
                            name="nome"
                            value={cliente.nome}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            label="Email"
                            name="email"
                            value={cliente.email}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            label="Telefone"
                            name="telefone"
                            value={cliente.telefone}
                            onChange={handleChange}
                            fullWidth
                        />
                        <Button variant="contained" color="primary" onClick={handleCadastrarCliente}>
                            Cadastrar
                        </Button>
                    </Stack>
                </Box>
            </Modal>
        </Stack>
    )
}

export default Usuario;
