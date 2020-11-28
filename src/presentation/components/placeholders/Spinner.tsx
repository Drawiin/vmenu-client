import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'

const Spinner: React.FC = () => {
  return (
    <Box
      width={1.0}
      height="100vh"
      top={0}
      right={0}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress />
    </Box>
  )
}
export default Spinner
