import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIos from '@material-ui/icons/ArrowBackIos'
import HelpOutline from '@material-ui/icons/HelpOutline'

import Typography from '@material-ui/core/Typography'
import { makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
  preview: {
    height: '100%'
  },
  button: {
    color: theme.palette.primary.contrastText
  },
  title: {
    flexGrow: 1,
    color: theme.palette.primary.contrastText
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderColor: 'rgba(0, 0, 0, 0.4)',
    borderStyle: 'solid',
    width: '100vw',
    height: '100vh',
    borderTopWidth: '25vh',
    borderBottomWidth: '25vh',
    position: 'fixed'
  }
}))

const QrReader = dynamic(() => import('react-qr-scanner'), {
  ssr: false,
  loading: () => {
    const Loading = (
      <Box
        width={1.0}
        height="100vh"
        top={0}
        right={0}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </Box>
    )
    return Loading
  }
})

const ReadTable: React.FC = () => {
  const router = useRouter()
  const classes = useStyles()

  const onScan = (result?: string) => {
    result && console.log(result)
  }

  return (
    <Box height="100vh" width="100%">
      <QrReader
        showViewFinder={false}
        onScan={onScan}
        onError={e => console.log(e)}
        facingMode="rear"
        className={classes.preview}
        style={{ height: '100%', width: '100%', objectFit: 'cover' }}
      />
      <Box
        display="flex"
        flexDirection="column"
        width={1.0}
        position="fixed"
        top={0}
        right={0}
      >
        <AppBar position="sticky" color="transparent" elevation={0}>
          <Toolbar>
            <IconButton
              className={classes.button}
              edge="start"
              onClick={() => router.push('/')}
            >
              <ArrowBackIos />
            </IconButton>
            <Typography align="center" variant="h6" className={classes.title}>
              QR CODE
            </Typography>
            <IconButton className={classes.button} edge="end">
              <HelpOutline />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box className={classes.overlay}></Box>
      </Box>
    </Box>
  )
}

export default ReadTable
