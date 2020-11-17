import { Button, makeStyles, Theme, Typography } from '@material-ui/core'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import Qrcode from 'mdi-material-ui/Qrcode'
import Image from 'next/image'
import Link from 'next/link'

const useStyles = makeStyles((theme: Theme) => ({
  background: {
    backgroundImage: "url('/background.jpg')",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    width: '100vw',
    height: '100vh'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: '100vw',
    height: '100vh',
    zIndex: 0,
    position: 'fixed',
    top: 0
  },
  content: {
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    position: 'relative',
    alignItems: 'center',
    padding: theme.spacing(2)
  },
  description: {
    fontSize: 32,
    letterSpacing: 2,
    fontWeight: theme.typography.fontWeightLight,
    textAlign: 'center',
    color: '#fff'
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 130
  },
  img: {
    alignSelf: 'center'
  },
  buttonContainer: {
    width: '100%'
  },
  button: {
    textTransform: 'none',
    borderRadius: 80,
    height: 56,
    display: 'flex',
    padding: ' 0 28px',
    textAlign: 'center',
    marginBottom: theme.spacing(2)
  },
  buttonText: {
    justifySelf: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 20,
    fontWeight: 500
  }
}))

const SignIn: React.FC = () => {
  const classes = useStyles()
  return (
    <div className={classes.background}>
      <div className={classes.content}>
        <div className={classes.header}>
          <div className={classes.img}>
            <Image src="/logo.png" width={157} height={69} />
          </div>
          <Typography className={classes.description}>
            Bem Vindo Ao Seu Cardápio Virtual, Escaneie o QR Code da Sua Mesa
            Para Continuar.
          </Typography>
        </div>
        <div className={classes.buttonContainer}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Qrcode />}
            fullWidth
            className={classes.button}
          >
            <span className={classes.buttonText}>Ler QR code da mesa</span>
          </Button>
          <Link href="/menu">
            <Button
              variant="outlined"
              color="primary"
              startIcon={<MenuBookIcon />}
              fullWidth
              className={classes.button}
            >
              <span className={classes.buttonText}>Ir para o cardápio</span>
            </Button>
          </Link>
        </div>
      </div>
      <div className={classes.overlay}></div>
    </div>
  )
}

export default SignIn
