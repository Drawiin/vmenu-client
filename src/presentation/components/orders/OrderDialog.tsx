import React, { useEffect, useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ExpandMoreOutlined from '@material-ui/icons/ExpandMoreOutlined'
import Slide from '@material-ui/core/Slide'
import { TransitionProps } from '@material-ui/core/transitions'
import Button from '@material-ui/core/Button'

import OrderListItem from './OrderListItem'
import OrderItem from '@domain/entities/OrderItem'
import { Box } from '@material-ui/core'
import { currencyConvertion } from '@presentation/utils/Conversions'
import getTotalPrice from '@presentation/utils/GetTotalPrice'
import GetUser from '@domain/usecases/user/GetUser'
import User from '@domain/entities/User'
import generateHeader from '@domain/utils/headers/indes'
import Api from '@data/client/Api'
import RequestLoginDialog from './RequestLoginDialog'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative'
    },
    title: {
      flex: 1
    },
    list: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    },
    addMoreButton: {
      padding: theme.spacing(2)
    },
    subtotal: {
      fontSize: 20,
      color: theme.palette.text.secondary
    },
    subtotalPrice: {
      fontSize: 20
    },
    finishOrder: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: theme.spacing(2),
      width: '100%',
      margin: 16,
      textTransform: 'none'
    }
  })
)

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

const OrderDialog: React.FC<{
  open: boolean
  handleClose: () => void
  itens: OrderItem[]
  onSubmitOrder: () => void
}> = ({ open, handleClose, itens, onSubmitOrder }) => {
  const classes = useStyles()
  const [user, setUser] = useState<User>(null)
  const [loginDialog, setLoginDialog] = useState(false)

  useEffect(() => {
    const user = GetUser()
    user && setUser(user)
  }, [])

  const handleOrderFormSubmit = async () => {
    const itensToSend = itens.map(item => ({
      productId: item.product.id,
      quantity: item.quantity,
      description: item.observation
    }))

    const dataToSend = {
      items: itensToSend,
      table: 0
    }

    if (user) {
      await Api.post('/order', dataToSend, {
        headers: generateHeader(user.privateKey, user.email)
      })
      onSubmitOrder()
    } else {
      setLoginDialog(true)
    }
  }

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar} color="inherit" elevation={0}>
        <Toolbar>
          <IconButton
            edge="start"
            color="primary"
            onClick={handleClose}
            aria-label="close"
          >
            <ExpandMoreOutlined />
          </IconButton>
          <Typography variant="h6" className={classes.title} align="center">
            Pedido
          </Typography>
          <IconButton />
        </Toolbar>
      </AppBar>
      <Divider />
      <List className={classes.list} disablePadding>
        {itens.map(item => (
          <OrderListItem key={item.id} item={item} />
        ))}

        <Button
          fullWidth
          color="primary"
          variant="text"
          className={classes.addMoreButton}
          onClick={handleClose}
        >
          Adicionar Mais Itens
        </Button>

        <Divider />
        <Box
          display="flex"
          justifyContent="space-between"
          paddingY={2}
          paddingX={1}
        >
          <Typography className={classes.subtotal}>Subtotal</Typography>
          <Typography variant="subtitle1" className={classes.subtotalPrice}>
            {currencyConvertion(getTotalPrice(itens))}
          </Typography>
        </Box>
        <Divider />
      </List>
      <Box
        position="fixed"
        bottom={0}
        left={0}
        width="100%"
        display="flex"
        onClick={handleOrderFormSubmit}
      >
        <Button
          disableElevation
          variant="contained"
          color="primary"
          className={classes.finishOrder}
        >
          <Typography>Finalizar Pedido</Typography>
          <Typography>{currencyConvertion(getTotalPrice(itens))}</Typography>
        </Button>
      </Box>
      <RequestLoginDialog
        open={loginDialog}
        handleClose={() => setLoginDialog(false)}
      />
    </Dialog>
  )
}

export default OrderDialog
