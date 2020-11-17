import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import Qrcode from 'mdi-material-ui/Qrcode'
import Image from 'next/image'
import Link from 'next/link'
import { Theme, withStyles } from '@material-ui/core/styles'

const StyledButton = withStyles((theme: Theme) => ({
  label: {
    textTransform: 'capitalize'
  },
  root: {
    padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(1)
  }
}))(Button)

const SignIn: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      height="100vh"
      width={1.0}
      paddingX={2}
      paddingBottom={2}
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box width={1.0} overflow="hidden" marginTop={10} marginBottom={5}>
          <Image
            src="/dinner.svg"
            layout="responsive"
            width="100%"
            height="55%"
          />
        </Box>

        <Typography variant="h5" color="textSecondary" align="center">
          Bem Vindo Ao Seu Cardápio Virtual, Escaneie o QR Code da Sua Mesa Para
          Continuar.
        </Typography>
      </Box>

      <Box display="flex" flexDirection="column">
        <Link href="/qrcode">
          <StyledButton
            fullWidth
            disableElevation
            variant="contained"
            color="primary"
            endIcon={<Qrcode />}
          >
            Ler QR code
          </StyledButton>
        </Link>

        <Link href="/menu">
          <StyledButton
            fullWidth
            disableElevation
            variant="outlined"
            color="secondary"
            endIcon={<MenuBookIcon />}
          >
            Cardápio
          </StyledButton>
        </Link>
      </Box>
    </Box>
  )
}

export default SignIn
