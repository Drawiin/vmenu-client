import { ComponentType, useState } from 'react'

import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIos from '@material-ui/icons/ArrowBackIos'
import CameraRearOutlined from '@material-ui/icons/CameraRearOutlined'
import CameraFrontOutlined from '@material-ui/icons/CameraFrontOutlined'

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
  subTitle: {
    flexGrow: 1,
    color: theme.palette.primary.contrastText,
    fontWeight: 'lighter'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderColor: 'rgba(0, 0, 0, 0.4)',
    borderStyle: 'solid',
    width: '100vw',
    height: '100vh',
    borderTopWidth: '30vh',
    borderBottomWidth: '30vh',
    borderRightWidth: '5vh',
    borderLeftWidth: '5vh',
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
  const [facingMode, setFacingMode] = useState<'rear' | 'front'>()
  const router = useRouter()
  const classes = useStyles()

  const onScan = (result?: string) => {
    if (result && result.includes('https://vmenu-client.vercel.app/menu')) {
      const urlParams = new URLSearchParams(result.split('?')[1])
      router.push({
        pathname: '/menu',
        query: { table: urlParams.get('table') }
      })
    }
  }

  const onToggleFacingMode = () => {
    if (facingMode === 'front') {
      setFacingMode('rear')
    } else {
      setFacingMode('front')
    }
  }

  return (
    <Box height="100vh" width="100%">
      <QrReader
        showViewFinder={false}
        onScan={onScan}
        onError={e => console.log(e)}
        facingMode={facingMode}
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
            <IconButton
              className={classes.button}
              edge="end"
              onClick={() => onToggleFacingMode()}
            >
              {facingMode === 'rear' ? (
                <CameraRearOutlined />
              ) : (
                <CameraFrontOutlined />
              )}
            </IconButton>
          </Toolbar>
          <Box paddingX="20%" marginTop="10%">
            <Typography
              align="center"
              variant="h5"
              className={classes.subTitle}
            >
              Leia o código &quot;QR&quot; da sua mesa
            </Typography>
          </Box>
        </AppBar>
        <Box className={classes.overlay}></Box>
      </Box>
    </Box>
  )
}

export default ReadTable
