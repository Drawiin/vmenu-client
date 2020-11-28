import Head from 'next/head'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { AppProps } from 'next/dist/next-server/lib/router/router'
import { useEffect } from 'react'

import BottomNavigationLayout from '@presentation/components/layout/BottomNavigationLayout'
import theme from '@presentation/styles/theme'

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
        {router.pathname.includes('/main') ? (
          <BottomNavigationLayout>
            <Component {...pageProps} />
          </BottomNavigationLayout>
        ) : (
          <Component {...pageProps} />
        )}
      </ThemeProvider>
    </>
  )
}

export default MyApp
