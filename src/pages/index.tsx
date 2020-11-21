import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Image from 'next/image'
import Link from 'next/link'
import { Theme, withStyles } from '@material-ui/core/styles'

const StyledButton = withStyles((theme: Theme) => ({
  label: {
    textTransform: 'capitalize'
  },
  root: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(1)
  }
}))(Button)

const SignIn: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="95vh"
      width={1.0}
      paddingX={2}
      paddingBottom={5}
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box width={1.0} overflow="hidden" marginTop={17} marginBottom={5}>
          <Image
            src="/people.svg"
            layout="responsive"
            width="100%"
            height="55%"
          />
        </Box>

        <Typography variant="h6" color="textSecondary" align="center">
          Bem Vindo Ao Seu Cardápio Virtual, Escaneie o QR Code da Sua Mesa Para
          Continuar.
        </Typography>
      </Box>

      <Box display="flex">
        <Link href="/menu">
          <StyledButton
            style={{ marginRight: 16 }}
            fullWidth
            disableElevation
            variant="outlined"
            color="secondary"
          >
            Cardápio
          </StyledButton>
        </Link>
        <Link href="/qrcode">
          <StyledButton
            fullWidth
            disableElevation
            variant="contained"
            color="primary"
          >
            Ler QR code
          </StyledButton>
        </Link>
      </Box>
    </Box>
  )
}

export default SignIn
