import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import MaterialLink from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIos from '@material-ui/icons/ArrowBackIos'

import Link from 'next/link'
import { useRouter } from 'next/router'
import KeyPair from '@domain/forms/KeyPair'
import { decrypt, encrypt, hashPassword } from '@domain/utils/crypt'
import Api from '@data/client/Api'
import keypair from 'keypair'
import User from '@domain/entities/User'
import SetUser from '@domain/usecases/user/SetUser'
import { LoginForm } from '@domain/forms/LoginForm'
import { CircularProgress } from '@material-ui/core'
import { AxiosResponse } from 'axios'
import AxiosLoginResponse from '@domain/entities/AxiosLoginResonse'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    textTransform: 'none',
    padding: theme.spacing(2)
  }
}))

const Login: React.FC = () => {
  const classes = useStyles()
  const router = useRouter()
  const [form, setForm] = useState<LoginForm>({
    email: '',
    password: '',
    name: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError('')
    setForm(form => ({
      ...form,
      [event.target.name]: event.target.value
    }))
  }

  const handleLoginFormSubmit = async () => {
    const hashedPassword = await hashPassword(form.password)

    try {
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
        SetUser(userData)
        router.push('/main/menu')
      } else {
        setError('Informações inválidas')
      }
    } catch (error) {
      setError('Informações inválidas')
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)

    await handleLoginFormSubmit()

    setForm({
      email: '',
      password: '',
      name: ''
    })
    setLoading(false)
    return null
  }

  return (
    <Container component="main" maxWidth="xs">
      <AppBar position="sticky" color="inherit" elevation={0}>
        <Toolbar disableGutters>
          <IconButton
            color="primary"
            edge="start"
            onClick={() => router.back()}
          >
            <ArrowBackIos />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Entrar
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={form.email}
            onChange={handleChange}
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={form.password}
            onChange={handleChange}
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Box style={{ color: 'red' }}>{error}</Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disableElevation
            disabled={loading}
            startIcon={loading && <CircularProgress size={16} />}
          >
            Entrar
          </Button>
          <Box
            width={1.0}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Link href="/register">
              <MaterialLink>{'Não tem uma conta ? Criar conta'}</MaterialLink>
            </Link>
          </Box>
        </form>
      </div>
    </Container>
  )
}

export default Login
