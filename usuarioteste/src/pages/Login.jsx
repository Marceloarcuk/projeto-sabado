import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { api } from '../services/api'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UsuarioContext'

const Login = () => {

    /*
  Forma antiga de lidar com form agoara usa react-hook-form
  
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')

  const handleLogin = () => {
      const payload = {
          usuario,
          senha
      }

      fetch('https://visiongoapi-production.up.railway.app/api/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
      })

  }
  */

    const form = useForm({
        defaultValues: {
            usuario: '',
            senha: ''
        }
    })

    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = form
    const { login } = useUser()

    const onSubmit = async (data) => {
        try {
            // Realizando a requisição POST para o login
            const response = await api.post('/usuarios/login', {
                email: data.usuario,
                senha: data.senha,
            });
            login(response.data)
            navigate('/usuario')
        } catch (error) {
            console.error('Erro ao realizar login:', error.response?.data || error.message);
            // Aqui você pode definir um estado de erro para mostrar uma mensagem ao usuário
        }
    }

    return (
        <Stack>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2,
                    margin: 4,
                    padding: 4,
                    border: '1px solid black',
                    borderRadius: 4
                }}
                component={'form'}
                onSubmit={handleSubmit(onSubmit)}
            >
                <Typography
                    variant='h5'
                    sx={{
                        alignSelf: 'flex-start',
                    }}>
                    Faça seu login
                </Typography>
                <TextField
                    label="Usuário"
                    variant="outlined"
                    fullWidth
                    {...register('usuario', {
                        required: 'Campo obrigatório',
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: 'Por favor, insira um email válido'
                        }
                    })}
                    error={!!errors.usuario} // Mostra erro se houver
                    helperText={errors.usuario?.message} // Exibe mensagem de erro
                />

                <TextField
                    label="Senha"
                    type='password'
                    variant="outlined"
                    fullWidth
                    {...register('senha', { required: 'Senha obrigatório' })}
                    error={!!errors.senha} // Mostra erro se houver
                    helperText={errors.senha?.message} // Exibe mensagem de erro
                />
                <Button
                    onClick={() => {
                        navigate('/register')
                    }}
                    variant='contained'
                    sx={{
                        alignSelf: 'flex-end'
                    }}>
                    Registre-se
                </Button>
                <Button
                    type='submit'
                    variant='contained' sx={{
                        alignSelf: 'flex-end'
                    }}>
                    Entrar
                </Button>
            </Box>
        </Stack>
    )
}

export default Login
