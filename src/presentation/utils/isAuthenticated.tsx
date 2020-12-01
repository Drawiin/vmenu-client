import React from 'react'
import User from '@domain/entities/User'
import BottomNavigationLayout from '@presentation/components/layout/BottomNavigationLayout'
import { Router } from 'next/router'

interface Props {
  user: User
  Component: React.ComponentType<unknown>
  pageProps: unknown
  router: Router
}

const IsAuthenticated: React.FC<Props> = ({
  user,
  Component,
  pageProps,
  router
}) => {
  if (user) {
    return (
      <>
        {router.pathname.includes('/main') ? (
          <BottomNavigationLayout>
            <Component {...pageProps} />
          </BottomNavigationLayout>
        ) : (
          <Component {...pageProps} />
        )}
      </>
    )
  }

  return null
}

export default IsAuthenticated
