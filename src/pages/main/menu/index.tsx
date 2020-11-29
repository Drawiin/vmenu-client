import React, { useState, createRef, RefObject, useContext } from 'react'

import { makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import { GetStaticProps } from 'next'
import MenuCategory from '@domain/entities/MenuCategory'
import MenuCategoryItem from '@presentation/components/MenuCategoryItem'
import GetMenu from '@domain/usecases/products/GetMenu'
import OrderContext from '@domain/utils/OrderContext'

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
    flexGrow: 1,
    fontWeight: theme.typography.fontWeightBold,
    fontFamily: 'Dancing Script'
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
          <Typography
            align="center"
            variant="h4"
            className={classes.title}
            color="primary"
          >
            Cardápio
          </Typography>
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
          <MenuCategoryItem category={category} />
        </div>
      ))}
    </div>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const menu = await GetMenu()
  return {
    props: { menu },
    revalidate: 10
  }
}
