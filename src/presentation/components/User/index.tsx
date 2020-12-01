import React, { useState, useContext } from 'react'
import {
  Box,
  CircularProgress,
  Modal,
  TextField,
  Typography
} from '@material-ui/core'
import Api from '@data/client/Api'
import { StyledButton } from 'pages'
import { decrypt, encrypt, hashPassword } from '@presentation/utils/crypt'
import keypair from 'keypair'
import UserContext from '@domain/utils/UserContext'
import User from '@domain/entities/User'
import { AxiosResponse } from 'axios'

interface KeyPair {
  private: string
  public: string
}

interface FormValues {
  email: string
  password: string
  name: string
}

interface AxiosLoginResponse {
  email: string
  encryptedPrivateKey: string
  name: string
  publicKey: string
}

const UserModal: React.FC = () => {
  const [open, setOpen] = useState(true)
  const [isLogging, setIsLogging] = useState(true)
  const userContext = useContext(UserContext)
  const [form, setForm] = useState<FormValues>({
    email: '',
    name: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChangeLogging = () => {
    setForm({
      email: '',
      name: '',
      password: ''
    })
    setIsLogging(!isLogging)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError('')
    setForm(form => ({
      ...form,
      [event.target.name]: event.target.value
    }))
  }

  const handleLoginFormSubmit = async () => {
    const hashedPassword = await hashPassword(form.password)

    const userResponse: AxiosResponse<AxiosLoginResponse> = await Api.get(
      '/login',
      {
        auth: {
          username: form.email,
          password: hashedPassword
        }
      }
    ).catch(() => null)

    if (userResponse) {
      const decryptedPrivateKey = decrypt(
        form.password,
        userResponse.data.encryptedPrivateKey
      )

      delete userResponse.data.encryptedPrivateKey

      const userData: User = {
        ...userResponse.data,
        privateKey: decryptedPrivateKey
      }

      userContext.changeUser(userData)
      setOpen(false)
    } else {
      setError('Informações inválidas')
    }
  }

  const handleRegisterFormSubmit = async () => {
    const hashedPassword = await hashPassword(form.password)
    const { private: privateKey, public: publicKey } = keypair({
      bits: 1024
    }) as KeyPair
    const encryptedPrivateKey = encrypt(form.password, privateKey)

    const userResponse = await Api.post(
      '/register',
      {
        name: form.name,
        encryptedPrivateKey: encryptedPrivateKey,
        publicKey
      },
      {
        auth: {
          username: form.email,
          password: hashedPassword
        }
      }
    )

    if (userResponse) {
      const userData: User = {
        email: form.email,
        name: form.name,
        privateKey,
        publicKey
      }

      userContext.changeUser(userData)
      setOpen(false)
    } else {
      setError('Problemas na hora de criar a conta')
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    if (isLogging) {
      await handleLoginFormSubmit()
    } else {
      await handleRegisterFormSubmit()
    }

    setForm({
      email: '',
      name: '',
      password: ''
    })
    setLoading(true)
    return null
  }

  return (
    <Modal
      open={open}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Box
        position="absolute"
        top="15%"
        width={320}
        height={isLogging ? 320 : 400}
        border="2px solid #000"
        bgcolor="white"
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column'
        }}
        padding="16px"
      >
        <Box
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column'
          }}
          marginBottom="24px"
        >
          {isLogging ? (
            <>
              <Typography variant="h5">Logar</Typography>
              <TextField
                value={form.email}
                label="Email"
                placeholder="Digite o seu email"
                style={{ marginBottom: 16 }}
                type="email"
                name="email"
                onChange={handleChange}
              />
              <TextField
                value={form.password}
                label="Senha"
                placeholder="Digite a sua senha"
                type="password"
                name="password"
                onChange={handleChange}
              />
            </>
          ) : (
            <>
              <Typography variant="h5">Registro</Typography>
              <TextField
                value={form.email}
                label="Email"
                placeholder="Digite o seu email"
                style={{ marginBottom: 16 }}
                type="email"
                name="email"
                onChange={handleChange}
              />
              <TextField
                value={form.name}
                label="Name"
                placeholder="Digite o seu nome"
                name="name"
                style={{ marginBottom: 16 }}
                onChange={handleChange}
              />
              <TextField
                value={form.password}
                label="Senha"
                placeholder="Digite a sua senha"
                type="password"
                name="password"
                onChange={handleChange}
              />
            </>
          )}
        </Box>

        <Box
          component="a"
          style={{ cursor: 'pointer' }}
          onClick={handleChangeLogging}
        >
          {isLogging ? 'Não tem uma conta?' : 'Ir para o login!'}
        </Box>

        <Box style={{ color: 'red' }}>{error}</Box>

        <StyledButton
          fullWidth
          disableElevation
          variant="contained"
          color="primary"
          style={{
            position: 'absolute',
            width: '50%',
            bottom: 16,
            display: 'flex',
            justifyContent: 'center'
          }}
          onClick={handleSubmit}
          disabled={loading}
          startIcon={loading && <CircularProgress size={16} />}
        >
          {isLogging ? 'Logar' : 'Registar'}
        </StyledButton>
      </Box>
    </Modal>
  )
}

export default UserModal
