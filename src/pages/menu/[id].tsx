import { useRouter } from 'next/router'
import Image from 'next/image'

import Box from '@material-ui/core/Box'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIos from '@material-ui/icons/ArrowBackIos'
import Add from '@material-ui/icons/Add'
import Remove from '@material-ui/icons/Remove'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import { makeStyles } from '@material-ui/core/styles'
import { Theme } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
  productImage: {
    objectFit: 'cover',
    borderRadius: '50%'
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  productDescription: {
    marginTop: theme.spacing(2),
    fontSize: 16,
    fontWeight: 'normal',
    color: theme.palette.text.secondary
  },
  productPrice: {
    fontWeight: 'normal',
    fontSize: 18,
    marginTop: theme.spacing(2)
  }
}))
const ProductDetail: React.FC = () => {
  const classes = useStyles()

  return (
    <Box display="flex" flexDirection="column">
      <AppBar position="sticky" color="inherit" elevation={0}>
        <Toolbar>
          <IconButton color="primary" edge="start">
            <ArrowBackIos />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        display="flex"
        justifyContent="center"
        flexGrow={1}
        paddingX={2}
        marginTop={3}
      >
        <Image
          src="https://migueis-api.herokuapp.com/uploads/1606055242884-pasta-1463930-1920.jpg"
          width={250}
          height={250}
          className={classes.productImage}
        />
      </Box>
      <Box display="flex" flexDirection="column" paddingX={2} marginTop={3}>
        <Typography className={classes.productName}>Nome do produto</Typography>
        <Typography className={classes.productDescription}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex temporibus
          corrupti veniam maxime, aliquid ipsam dolorem explicabo porro
        </Typography>
        <Typography className={classes.productPrice}>R$ 30,00</Typography>
        <Box
          display="flex"
          justifyContent="space-between"
          flex={1}
          marginTop={4}
          marginBottom={1}
        >
          <Typography color="textSecondary" variant="subtitle1">
            Alguma Observação ?
          </Typography>
          <Typography color="textSecondary" variant="subtitle1">
            0/144
          </Typography>
        </Box>
        <TextField
          variant="outlined"
          placeholder="Ex:sem maionese, sem picles etc."
          multiline
        />
        <Box position="fixed" bottom={0} display="flex">
          <Box display="flex" justifyContent="space-evenly" alignItems="center">
            <IconButton color="primary">
              <Remove />
            </IconButton>
            <Typography>0</Typography>
            <IconButton color="primary">
              <Add />
            </IconButton>
          </Box>
          <Button>Adiconar R$ 30,00</Button>
        </Box>
      </Box>
    </Box>
  )
}

export default ProductDetail
