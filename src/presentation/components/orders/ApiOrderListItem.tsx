import OrderItem from '@domain/entities/OrderItem'
import { Box, ListItem, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { currencyConvertion } from '@presentation/utils/Conversions'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/MoreVertOutlined'
import ApiOrderItem from '@domain/entities/ApiOrderItem'

const useStyles = makeStyles((theme: Theme) => ({
  quantity: {
    marginRight: theme.spacing(2)
  },
  name: {
    fontSize: 20,
    color: theme.palette.text.secondary,
    width: '100%'
  },
  description: {
    fontSize: 16,
    color: theme.palette.text.disabled,
    lineHeight: 1
  },
  price: {
    fontSize: 20
  }
}))

interface OrderItemProps {
  item: ApiOrderItem
}

const ApiOrderListItem: React.FC<OrderItemProps> = ({ item }) => {
  const classes = useStyles()

  return (
    <ListItem divider disableGutters button>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
      >
        <Box display="flex" alignItems="center" width="100%">
          <Typography color="primary" variant="h6" className={classes.quantity}>
            {item.quantity}x
          </Typography>
          <Box display="flex" flexDirection="column">
            <Typography className={classes.name}>
              {item.product.name}
            </Typography>
          </Box>
        </Box>

        <Typography className={classes.price}>
          {currencyConvertion(item.product.price * item.quantity)}
        </Typography>
      </Box>
    </ListItem>
  )
}

export default ApiOrderListItem
