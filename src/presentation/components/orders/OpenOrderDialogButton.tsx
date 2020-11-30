import BagIcon from '../icons/BagIcon'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { Typography } from '@material-ui/core'

import OrderItem from '@domain/entities/OrderItem'
import { currencyConvertion } from '@presentation/utils/Conversions'
import getTotalPrice from '@presentation/utils/GetTotalPrice'

const useStyles = makeStyles(theme => ({
  orderButton: {
    borderRadius: 0,
    position: 'fixed',
    bottom: 56,
    display: 'flex',
    justifyContent: 'space-between',
    textTransform: 'none',
    padding: theme.spacing(2)
  },
  title: {
    position: 'absolute',
    width: '100%',
    right: 0
  }
}))

const OpenOrderDialogButton: React.FC<{
  onClick: () => void
  quantity: number
  total: number
}> = ({ onClick, total, quantity }) => {
  const classes = useStyles()

  return (
    <Button
      onClick={onClick}
      color="primary"
      variant="contained"
      fullWidth
      className={classes.orderButton}
      disableElevation
    >
      <BagIcon quantity={quantity} />
      <Typography align="center" className={classes.title}>
        Ver pedido
      </Typography>
      <Typography>{currencyConvertion(total)}</Typography>
    </Button>
  )
}
export default OpenOrderDialogButton
