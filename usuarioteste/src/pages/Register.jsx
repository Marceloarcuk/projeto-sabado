import { Box, Button, Stack, TextField, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import { api } from "../services/api"

const Register = () => {

    const form = useForm({
        defaultValues: {
            nome: '',
            email: '',
            senha: '',
            confirmarSenha: ''
        }
    })

    const { register, handleSubmit, formState: { errors }, watch } = form

    const onSubmit = async (data) => {
        try {
            // Realizando a requisição POST para o cadastro
            const response = await api.post('/usuarios/registro', {
                nome: data.nome,
                email: data.email,
                senha: data.senha,
                perfilId: '65f4a5e8b91f5c8d3a123456',
                clinicaId: '65f4a5e8b91f5c8d3a1234567'
            })
            console.log('Cadastro realizado com sucesso:', response.data)
            // Aqui você pode redirecionar o usuário ou exibir uma mensagem de sucesso
        } catch (error) {
            console.error('Erro ao cadastrar:', error.response?.data || error.message)
            // Aqui você pode exibir uma mensagem de erro ao usuário
        }
    }

    return (
        <Stack>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                padding: 4,
                margin: 4,
                border: '1px solid #ccc',
                borderRadius: 4
            }}
                component="form"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Typography variant="h5">Cadastro</Typography>

                {/* Nome */}
                <TextField
                    label="Nome"
                    variant="outlined"
                    fullWidth
                    {...register("nome", { required: "Nome é obrigatório" })}
                    error={!!errors.nome}
                    helperText={errors.nome?.message}
                />

                {/* Email */}
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    {...register("email", {
                        required: "Email é obrigatório",
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Email inválido"
                        }
                    })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                />

                {/* Senha */}
                <TextField
                    label="Senha"
                    type="password"
                    variant="outlined"
                    fullWidth
                    {...register("senha", {
                        required: "Senha é obrigatória",
                       /*  minLength: {
                            value: 8,
                            message: "A senha deve ter pelo menos 8 caracteres"
                        },
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                            message: "A senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número"
                        } */
                    })}
                    error={!!errors.senha}
                    helperText={errors.senha?.message}
                />

                {/* Confirmar Senha */}
                <TextField
                    label="Confirmar Senha"
                    type="password"
                    variant="outlined"
                    fullWidth
                    {...register("confirmarSenha", {
                        required: "Por favor, confirme sua senha",
                        validate: value => value === watch("senha") || "As senhas não coincidem"
                    })}
                    error={!!errors.confirmarSenha}
                    helperText={errors.confirmarSenha?.message}
                />

                {/* Botão de Cadastro */}
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{
                        width: 'fit-content',
                        alignSelf: 'flex-end'
                    }}
                >
                    Cadastrar
                </Button>
            </Box>
        </Stack>
    )
}

export default Register
