import React from 'react'
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
}> = ({ open, handleClose, itens }) => {
  const classes = useStyles()

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
    </Dialog>
  )
}

export default OrderDialog
