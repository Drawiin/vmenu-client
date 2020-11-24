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
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider'

import CategoryItem from '../../../components/CategoryItem'
import { getMenu } from '../../../repository/ProductsRepository'
import MenuCategory from '../../../entities/MenuCategory'
import { GetStaticProps } from 'next'
import Image from 'next/image'

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
  },
  drawerImg: {
    objectFit: 'cover',
    borderRadius: '50%'
  }
}))
const Home: React.FC<{ menu: Array<MenuCategory> }> = ({ menu }) => {
  const classes = useStyles()
  const [category, setCategory] = useState(0)
  const [open, setOpen] = useState(false)

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

  const toggleDrawer = (open: boolean) => {
    setOpen(open)
  }

  return (
    <div className={classes.root}>
      <AppBar position="sticky" color="inherit" elevation={0}>
        <Toolbar>
          <IconButton
            edge="start"
            aria-label="menu"
            color="primary"
            onClick={() => toggleDrawer(true)}
          >
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
      <SwipeableDrawer
        anchor="left"
        open={open}
        onClose={() => toggleDrawer(false)}
        onOpen={() => toggleDrawer(true)}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          paddingTop={5}
          width={240}
        >
          <Image
            src="/dinner.svg"
            width={120}
            height={120}
            className={classes.drawerImg}
          />
          <Box marginX={3}>
            <Typography variant="h6" color="textSecondary" align="center">
              Mesa 01
            </Typography>
          </Box>

          <Divider />
        </Box>
      </SwipeableDrawer>
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
