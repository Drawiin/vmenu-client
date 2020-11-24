import { useState, createRef, RefObject } from 'react'

import { makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import Typography from '@material-ui/core/Typography'

import CategoryItem from '../../../components/CategoryItem'
import { getMenu } from '../../../repository/ProductsRepository'
import MenuCategory from '../../../entities/MenuCategory'
import { GetStaticProps } from 'next'

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
    backgroundColor: theme.palette.background.paper,
    paddingBottom: theme.spacing(10)
  },
  inline: {
    display: 'inline'
  },
  title: {
    flexGrow: 1
  },
  tab: {
    textTransform: 'none'
  }
}))
const Home: React.FC<{ menu: Array<MenuCategory> }> = ({ menu }) => {
  const classes = useStyles()
  const [category, setCategory] = useState(0)

  const handleChange = (
    event: React.ChangeEvent<Record<string, unknown>>,
    newValue: number
  ) => {
    setCategory(newValue)
  }

  const refs: { [id: number]: RefObject<HTMLDivElement> } = menu.reduce(
    (acc, value) => {
      acc[value.id] = createRef()
      return acc
    },
    {}
  )

  const handleCategoryClicked = (id: number) => {
    refs[id]?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    })
  }

  return (
    <div className={classes.root}>
      <AppBar position="sticky" color="inherit" elevation={0}>
        <Toolbar>
          <IconButton edge="start" aria-label="menu" color="primary">
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
                onClick={() => handleCategoryClicked(category.id)}
                className={classes.tab}
                label={category.name}
                {...a11yProps(index)}
                key={category.id}
              />
            )
          })}
        </Tabs>
      </AppBar>
      {menu.map(category => (
        <div ref={refs[category.id]} key={category.id}>
          <CategoryItem category={category} />
        </div>
      ))}
    </div>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const menu = await getMenu()
  return {
    props: { menu },
    revalidate: 10
  }
}
