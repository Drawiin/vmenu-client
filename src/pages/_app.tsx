import Head from 'next/head'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { AppProps } from 'next/dist/next-server/lib/router/router'
import React, { useEffect } from 'react'

import theme from '@presentation/styles/theme'
import useOrderContext from '@domain/utils/hooks/useOrderContext'
import useUserContext from '@domain/utils/hooks/useUserContext'
import OrderContext from '@domain/utils/OrderContext'
import UserContext from '@domain/utils/UserContext'
import UserModal from '@presentation/components/User'
import IsAuthenticated from '@presentation/utils/isAuthenticated'

const MyApp: React.FC<AppProps> = ({ Component, pageProps, router }) => {
  const value = useOrderContext()
  const userContext = useUserContext()

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
      <UserContext.Provider value={userContext}>
        <OrderContext.Provider value={value}>
          <ThemeProvider theme={theme}>
            <UserModal />
            <CssBaseline />
            <IsAuthenticated
              user={userContext.user}
              Component={Component}
              pageProps={pageProps}
              router={router}
            />
          </ThemeProvider>
        </OrderContext.Provider>
      </UserContext.Provider>
    </>
  )
}

export default MyApp
