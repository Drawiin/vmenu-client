import Head from 'next/head'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { AppProps } from 'next/dist/next-server/lib/router/router'
import { useEffect } from 'react'

import theme from '../styles/theme'
import BottomNavBar from '../components/BottomNavBar'

const MyApp: React.FC<AppProps> = ({ Component, pageProps, router }) => {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Cardápio</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
        {router.pathname !== '/' ? <BottomNavBar /> : null}
      </ThemeProvider>
    </>
  )
}

export default MyApp
