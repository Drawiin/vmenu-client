import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ReceiptIcon from '@material-ui/icons/Receipt'
import { makeStyles } from '@material-ui/core/styles'

import { useState } from 'react'

import { useRouter } from 'next/router'

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0
  }
})

const BottomNavBar: React.FC = () => {
  const classes = useStyles()
  const [value, setValue] = useState(0)
  const router = useRouter()

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue)
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        label="Cardápio"
        icon={<MenuBookIcon />}
        onClick={() => router.push('/main/menu')}
      />
      <BottomNavigationAction
        label="Favoritos"
        icon={<FavoriteIcon />}
        onClick={() => router.push('/main/favorites')}
      />
      <BottomNavigationAction
        label="Conta"
        icon={<ReceiptIcon />}
        onClick={() => router.push('/main/orders')}
      />
    </BottomNavigation>
  )
}

export default BottomNavBar
