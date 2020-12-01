import { Button } from '@material-ui/core'
import Box from '@material-ui/core/Box'

import Link from 'next/link'

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
      <Box padding={4} width={1.0}>
        <Link href="/login">
          <Button
            variant="contained"
            color="primary"
            size="large"
            disableElevation
            style={{ textTransform: 'none' }}
            fullWidth
          >
            Entrar ou cadastrar
          </Button>
        </Link>
      </Box>
    </Box>
  )
}

export default Orders
