import { makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { useEffect, useState } from 'react'
import Category from '../../entities/Category'
import CategoryItem from '../../components/CategoryItem'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import Typography from '@material-ui/core/Typography'
import { getMenu } from '../../repository/ProductsRepository'
import MenuCategory from '../../entities/MenuCategory'

function a11yProps(index: number) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`
  }
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: 'inline'
  },
  title: {
    flexGrow: 1
  }
}))

const Home: React.FC = () => {
  const classes = useStyles()
  const [category, setCategory] = useState(0)
  const [menu, setMenu] = useState<Array<MenuCategory>>([])

  useEffect(() => {
    getMenu().then(setMenu)
  }, [])

  const handleChange = (
    event: React.ChangeEvent<Record<string, unknown>>,
    newValue: number
  ) => {
    setCategory(newValue)
  }

  return (
    <div className={classes.root}>
      <AppBar position="sticky" color="transparent">
        <Toolbar>
          <IconButton edge="start" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography align="center" variant="h6" className={classes.title}>
            Cardápio
          </Typography>
          <IconButton aria-label="search" color="primary" edge="end">
            <SearchIcon />
          </IconButton>
        </Toolbar>
        <Tabs
          value={category}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          {menu.map((category, index) => {
            return (
              <Tab
                label={category.name}
                {...a11yProps(index)}
                key={category.id}
              />
            )
          })}
        </Tabs>
      </AppBar>
      {menu.map(category => (
        <CategoryItem category={category} key={category.id} />
      ))}
    </div>
  )
}

export default Home
