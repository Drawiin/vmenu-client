import { makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { useEffect, useState } from 'react'
import { getMockMenu } from '../repository/MockRepository'
import Category from '../entities/Category'
import Typography from '@material-ui/core/Typography'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import List from '@material-ui/core/List'

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
  }
}))

const Home: React.FC = () => {
  const classes = useStyles()
  const [category, setCategory] = useState(0)
  const [menu, setMenu] = useState<Array<Category>>([])

  useEffect(() => {
    getMockMenu().then(menu => setMenu(menu))
  }, [])

  const handleChange = (
    event: React.ChangeEvent<Record<string, unknown>>,
    newValue: number
  ) => {
    setCategory(newValue)
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
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
      {menu.map(category => {
        return (
          <>
            <Typography key={category.id} align="center" variant="h5">
              {category.name}
            </Typography>
            <List>
              {category.items.map(item => {
                return (
                  <>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar src={item.thumbnailUrl} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.name}
                        secondary={item.description}
                      />
                    </ListItem>
                    <Divider variant="middle" component="li" />
                  </>
                )
              })}
            </List>
          </>
        )
      })}
    </div>
  )
}

export default Home
