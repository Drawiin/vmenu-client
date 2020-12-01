import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Link from 'next/link'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles(theme => ({
  drawer: {
    borderTopLeftRadius: theme.spacing(2),
    borderTopRightRadius: theme.spacing(2),
    display: 'flex'
  },
  button: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  title: {
    marginBottom: theme.spacing(3)
  }
}))
const RequestLoginDialog: React.FC<{
  open: boolean
  handleClose: () => void
}> = ({ open, handleClose }) => {
  const classes = useStyles()

  return (
    <Drawer
      anchor={'bottom'}
      open={open}
      onClose={handleClose}
      className={classes.drawer}
    >
      <Box flex={1} padding={2}>
        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          className={classes.title}
        >
          Para fazer um pedido você deve estar logado
        </Typography>
        <Link href="/login">
          <Button
            variant="contained"
            color="primary"
            fullWidth
            className={classes.button}
          >
            Fazer login
          </Button>
        </Link>
        <Button
          className={classes.button}
          variant="outlined"
          color="primary"
          fullWidth
          onClick={handleClose}
        >
          Cancelar
        </Button>
      </Box>
    </Drawer>
  )
}
export default RequestLoginDialog
