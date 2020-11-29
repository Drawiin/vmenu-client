import OrderContext from '@domain/utils/OrderContext'
import { Typography } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { currencyConvertion } from '@presentation/utils/Conversions'
import getTotalPrice from '@presentation/utils/GetTotalPrice'

import { useContext, useState } from 'react'
import BagIcon from '../icons/BagIcon'
import BottomNavBar from '../navigation/BottomNavBar'
import OrderDialog from '../orders/OrderDialog'
const useStyles = makeStyles(theme => ({
  orderButton: {
    borderRadius: 0,
    position: 'fixed',
    bottom: 56,
    display: 'flex',
    justifyContent: 'space-between',
    textTransform: 'none'
  },
  title: {
    position: 'absolute',
    width: '100%',
    right: 0
  }
}))

const BottomNavigationLayout: React.FC = ({ children }) => {
  const [open, setOpen] = useState(false)
  const orderStore = useContext(OrderContext)
  const classes = useStyles()

  return (
    <Box height="100vh" width="100vw">
      <Box paddingBottom={7} width={1.0} position="relative" height={1.0}>
        {children}
      </Box>
      <Button
        onClick={() => setOpen(true)}
        color="primary"
        variant="contained"
        fullWidth
        className={classes.orderButton}
        disableElevation
      >
        <BagIcon quantity={orderStore.order.length} />
        <Typography align="center" className={classes.title}>
          Ver pedido
        </Typography>
        <Typography>
          {currencyConvertion(getTotalPrice(orderStore.order))}
        </Typography>
      </Button>
      <BottomNavBar />
      <OrderDialog
        open={open}
        handleClose={() => setOpen(false)}
        itens={orderStore.order}
      />
    </Box>
  )
}

export default BottomNavigationLayout
