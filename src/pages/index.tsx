import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Image from 'next/image'
import Link from 'next/link'
import { makeStyles, Theme, withStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  title: {
    fontWeight: theme.typography.fontWeightBold,
    fontFamily: 'Dancing Script',
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(7)
  },
  image: {}
}))

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
  const classes = useStyles()

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
        <Typography
          variant="h4"
          color="primary"
          align="center"
          className={classes.title}
        >
          Bem Vindo(a)
        </Typography>
        <Box width={1.0} overflow="hidden" marginBottom={1}>
          <Image
            src="/people.svg"
            layout="responsive"
            width={250}
            height={250}
            className={classes.image}
          />
        </Box>
        <Typography variant="h6" color="textSecondary" align="center">
          Esse é nosso cardápio virtual, para começar a fazer o seu pedido,
          escaneie o QR code da sua mesa.
        </Typography>
      </Box>

      <Box display="flex">
        <Link href="/main/menu">
          <StyledButton
            style={{ marginRight: 16 }}
            fullWidth
            disableElevation
            variant="outlined"
            color="secondary"
          >
            Escanear depois
          </StyledButton>
        </Link>
        <Link href="/readqr">
          <StyledButton
            fullWidth
            disableElevation
            variant="contained"
            color="primary"
          >
            Escanear agora
          </StyledButton>
        </Link>
      </Box>
    </Box>
  )
}

export default SignIn
