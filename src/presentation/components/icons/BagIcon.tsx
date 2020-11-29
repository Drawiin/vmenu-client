import LocalMallOutlined from '@material-ui/icons/LocalMallOutlined'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core'
const useStyles = makeStyles(theme => ({
  quantity: {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.contrastText,
    borderRadius: '50%'
  }
}))

const BagIcon: React.FC<{ quantity: number }> = ({ quantity }) => {
  const classes = useStyles()

  return (
    <Box
      position="relative"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <LocalMallOutlined fontSize="default" />
      <Box
        position="absolute"
        top={-3}
        right={-3}
        className={classes.quantity}
        width={14}
        height={14}
        fontSize={10}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {quantity}
      </Box>
    </Box>
  )
}

export default BagIcon
