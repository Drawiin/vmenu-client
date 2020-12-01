import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import MaterialLink from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
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
import { LoginForm } from '@domain/forms/LoginForm'
import Api from '@data/client/Api'
import { encrypt, hashPassword } from '@domain/utils/crypt'

import keypair from 'keypair'
import KeyPair from '@domain/forms/KeyPair'
import User from '@domain/entities/User'
import { CircularProgress } from '@material-ui/core'
import SetUser from '@domain/usecases/user/SetUser'

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
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    textTransform: 'none',
    padding: theme.spacing(2)
  }
}))
const Register: React.FC = () => {
  const classes = useStyles()
  const router = useRouter()
  const [form, setForm] = useState<LoginForm>({
    email: '',
    name: '',
    password: ''
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

  const handleRegisterFormSubmit = async () => {
    const hashedPassword = await hashPassword(form.password)
    const { private: privateKey, public: publicKey } = keypair({
      bits: 1024
    }) as KeyPair
    const encryptedPrivateKey = encrypt(form.password, privateKey)

    try {
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
        console.log(userData)
        SetUser(userData)
        router.push('/main/menu')
      } else {
        setError('Problemas na hora de criar a conta')
      }
    } catch (error) {
      setError('Problemas na hora de criar a conta')
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)

    await handleRegisterFormSubmit()

    setForm({
      email: '',
      name: '',
      password: ''
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
          Criar conta
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                value={form.name}
                onChange={handleChange}
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Nome"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={form.email}
                onChange={handleChange}
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
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
            </Grid>
          </Grid>
          <Box style={{ color: 'red' }}>{error}</Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disableElevation
            className={classes.submit}
            disabled={loading}
            startIcon={loading && <CircularProgress size={16} />}
          >
            Criar conta
          </Button>
          <Box
            width={1.0}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Link href="/login">
              <MaterialLink>{'Já tem uma conta ? Entrar'}</MaterialLink>
            </Link>
          </Box>
        </form>
      </div>
    </Container>
  )
}
export default Register
