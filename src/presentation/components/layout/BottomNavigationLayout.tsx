import OrderContext from '@domain/utils/OrderContext'
import { Divider } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import getTotalPrice from '@presentation/utils/GetTotalPrice'

import { useContext, useState } from 'react'
import BottomNavBar from '../navigation/BottomNavBar'
import OpenOrderDialogButton from '../orders/OpenOrderDialogButton'
import OrderDialog from '../orders/OrderDialog'

const BottomNavigationLayout: React.FC = ({ children }) => {
  const [open, setOpen] = useState(false)
  const orderStore = useContext(OrderContext)

  const onSubmitOrder = () => {
    orderStore.changeItens([])
    setOpen(false)
  }

  return (
    <Box height="100vh" width="100vw">
      <Box paddingBottom={7} width={1.0} position="relative" height={1.0}>
        {children}
      </Box>
      {orderStore.order.length > 0 && (
        <OpenOrderDialogButton
          onClick={() => setOpen(true)}
          quantity={orderStore.order.length}
          total={getTotalPrice(orderStore.order)}
        />
      )}

      <BottomNavBar />
      <OrderDialog
        open={open}
        handleClose={() => setOpen(false)}
        onSubmitOrder={onSubmitOrder}
        itens={orderStore.order}
      />
    </Box>
  )
}

export default BottomNavigationLayout
