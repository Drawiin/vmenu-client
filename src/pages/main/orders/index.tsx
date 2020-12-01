import User from '@domain/entities/User'
import GetUser from '@domain/usecases/user/GetUser'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Image from 'next/image'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { useState, useEffect } from 'react'

import Link from 'next/link'
import Api from '@data/client/Api'
import generateHeader from '@domain/utils/headers/indes'
import ApiOrder from '@domain/entities/ApiOrder'
import { makeStyles } from '@material-ui/core/styles'
import getTotalPrice from '@presentation/utils/GetTotalPrice'
import { currencyConvertion } from '@presentation/utils/Conversions'
import ApiOrderItem from '@domain/entities/ApiOrderItem'
import ApiOrderListItem from '@presentation/components/orders/ApiOrderListItem'

const useStyles = makeStyles(theme => ({
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
  total: {
    fontSize: 20,
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightBold
  },
  subtotalPrice: {
    fontSize: 20
  },
  totalPrice: {
    fontSize: 20,
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightBold
  },
  finishOrder: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(2),
    width: '100%',
    margin: 16,
    textTransform: 'none'
  }
}))

const Orders: React.FC = () => {
  const classes = useStyles()
  const [user, setUser] = useState<User>(null)
  const [orders, setOrders] = useState<ApiOrderItem[]>([])

  const flat = (orders: ApiOrder[]) =>
    orders
      .map(order => order.items)
      .map(itens => itens.map(item => item))
      .flatMap(e => e)

  useEffect(() => {
    const user = GetUser()
    user && setUser(user)
    if (user) {
      Api.get<ApiOrder[]>('/order', {
        headers: generateHeader(user.privateKey, user.email)
      }).then(({ data }) => setOrders(flat(data)))
    }
  }, [])

  if (user && orders.length > 0) {
    return (
      <Box>
        <AppBar className={classes.appBar} color="inherit" elevation={0}>
          <Toolbar>
            <Typography variant="h6" className={classes.title} align="center">
              Pedidos
            </Typography>
          </Toolbar>
        </AppBar>
        <Divider />
        <List className={classes.list} disablePadding>
          {orders.map(order => (
            <ApiOrderListItem item={order} key={order.id} />
          ))}
          <Divider />
          <Box display="flex" justifyContent="space-between" paddingTop={2}>
            <Typography className={classes.subtotal}>Subtotal</Typography>
            <Typography variant="subtitle1" className={classes.subtotalPrice}>
              {currencyConvertion(
                orders.reduce(
                  (acc, current) =>
                    current.quantity * current.product.price + acc,
                  0
                )
              )}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" paddingBottom={2}>
            <Typography className={classes.total}>Total</Typography>
            <Typography variant="subtitle1" className={classes.totalPrice}>
              {currencyConvertion(
                orders.reduce(
                  (acc, current) =>
                    current.quantity * current.product.price + acc,
                  0
                )
              )}
            </Typography>
          </Box>
          <Divider />
        </List>
        <Box position="fixed" bottom={72} left={0} width="100%" display="flex">
          <Button
            disableElevation
            variant="contained"
            color="primary"
            className={classes.finishOrder}
          >
            <Typography>Pedir conta</Typography>
          </Button>
        </Box>
      </Box>
    )
  } else {
    return (
      <Box
        width={1.0}
        height="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Image src="/empty_orders.svg" width={200} height={200} />
        <Box marginTop={5}>
          <Typography variant="h5" align="center" color="textSecondary">
            Você ainda não tem pedidos
          </Typography>
        </Box>
        <Link href="/main/menu">
          <Button variant="text" color="primary" style={{ padding: 16 }}>
            Ir para o menu
          </Button>
        </Link>
      </Box>
    )
  }
}

export default Orders
