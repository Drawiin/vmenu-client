import Box from '@material-ui/core/Box'
import BottomNavBar from '../navigation/BottomNavBar'

const BottomNavigationLayout: React.FC = ({ children }) => {
  return (
    <Box height="100vh" width="100vw">
      <Box paddingBottom={7} width={1.0}>
        {children}
      </Box>
      <BottomNavBar />
    </Box>
  )
}

export default BottomNavigationLayout
