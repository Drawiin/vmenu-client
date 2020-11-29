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
import OrderListItem from './OrderListItem'
import OrderItem from '@domain/entities/OrderItem'

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
      <List className={classes.list}>
        {itens.map(item => (
          <OrderListItem key={item.id} item={item} />
        ))}
      </List>
    </Dialog>
  )
}

export default OrderDialog
