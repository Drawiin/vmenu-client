import { Button, Typography } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import ExitIcon from '@material-ui/icons/ExitToAppOutlined'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import GetUser from '@domain/usecases/user/GetUser'
import User from '@domain/entities/User'
import SetUser from '@domain/usecases/user/SetUser'

const Orders: React.FC = () => {
  const [user, setUser] = useState<User>(null)

  useEffect(() => {
    const user = GetUser()
    user && setUser(user)
  }, [])

  const onLogOutClicked = () => {
    setUser(null)
    SetUser(null)
  }

  if (user) {
    return (
      <Box width={1.0} height="100%" display="flex" flexDirection="column">
        <AppBar position="sticky" color="inherit" elevation={0}>
          <Toolbar disableGutters>
            <Typography variant="h6" align="center" style={{ flex: 1 }}>
              {user?.email}
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          width={1.0}
          height="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Box padding={4} width={1.0}>
            <Button
              onClick={onLogOutClicked}
              variant="contained"
              color="primary"
              size="large"
              disableElevation
              style={{
                textTransform: 'none',
                display: 'flex',
                justifyContent: 'space-between',
                padding: 16
              }}
              fullWidth
              endIcon={<ExitIcon />}
            >
              Sair
            </Button>
          </Box>
        </Box>
      </Box>
    )
  } else {
    return (
      <Box
        width={1.0}
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Box padding={4} width={1.0}>
          <Link href="/login">
            <Button
              variant="contained"
              color="primary"
              size="large"
              disableElevation
              style={{ textTransform: 'none' }}
              fullWidth
            >
              Entrar ou cadastrar
            </Button>
          </Link>
        </Box>
      </Box>
    )
  }
}

export default Orders
