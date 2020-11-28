import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Image from 'next/image'

const Orders: React.FC = () => {
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
    </Box>
  )
}

export default Orders
