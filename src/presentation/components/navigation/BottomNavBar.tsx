import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import { makeStyles } from '@material-ui/core/styles'

import { useState } from 'react'

import { useRouter } from 'next/router'
import BottonNavRoutes, {
  getNavIndex
} from '@presentation/routes/BottonNavRoutes'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0
  }
}))

const BottomNavBar: React.FC = () => {
  const classes = useStyles()
  const router = useRouter()
  const [value, setValue] = useState(getNavIndex(router.pathname))
  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue)
      }}
      className={classes.root}
    >
      {BottonNavRoutes.map(route => (
        <BottomNavigationAction
          key={route.destination}
          label={route.label}
          icon={route.icon}
          onClick={() => router.push(route.destination)}
        />
      ))}
    </BottomNavigation>
  )
}

export default BottomNavBar
