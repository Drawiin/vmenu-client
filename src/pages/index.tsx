import { makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { useState } from 'react'

interface TabPanelProps {
  children?: React.ReactNode
  index: any
  value: any
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: any) {
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
  }
}))

const Home: React.FC = () => {
  const classes = useStyles()
  const [value, setValue] = useState(0)

  const handleChange = (
    event: React.ChangeEvent<Record<string, unknown>>,
    newValue: number
  ) => {
    setValue(newValue)
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Entradas" {...a11yProps(0)} />
          <Tab label="Pratos Quentes" {...a11yProps(1)} />
          <Tab label="Bebidas" {...a11yProps(2)} />
          <Tab label="Sobremesas" {...a11yProps(3)} />
          <Tab label="Lanches" {...a11yProps(4)} />
          <Tab label="Peixes" {...a11yProps(5)} />
          <Tab label="Massas" {...a11yProps(6)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        Entradas
      </TabPanel>
      <TabPanel value={value} index={1}>
        Pratos Quentes
      </TabPanel>
      <TabPanel value={value} index={2}>
        Bebidas
      </TabPanel>
      <TabPanel value={value} index={3}>
        Sobremesas
      </TabPanel>
      <TabPanel value={value} index={4}>
        Lanches
      </TabPanel>
      <TabPanel value={value} index={5}>
        Peixes
      </TabPanel>
      <TabPanel value={value} index={6}>
        Massas
      </TabPanel>
    </div>
  )
}

export default Home
