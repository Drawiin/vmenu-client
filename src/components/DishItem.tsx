import { Box, ListItem, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Image from 'next/image'
import Link from 'next/link'

import Product from '../entities/Product'
import { currencyConvertion } from '../utils/Conversions'
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: 16,
    paddingBottom: 16,
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'space-between',
    width: '100%'
  },
  image: {
    borderRadius: '50%'
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    maxWidth: 240
  },
  name: {
    fontSize: 16,
    fontWeight: 'normal'
  },
  description: {
    fontSize: 14,
    fontWeight: 'normal',
    color: theme.palette.text.secondary
  },
  price: {
    fontSize: 16,
    fontWeight: 'normal',
    marginTop: 24
  }
}))

interface DishItemProps {
  dish: Product
}

const DishItem: React.FC<DishItemProps> = ({ dish }) => {
  const classes = useStyles()

  return (
    <Link
      href={{
        pathname: '/product/[item]',
        query: { item: dish.name, id: dish.id }
      }}
    >
      <ListItem divider disableGutters className={classes.root} button>
        <Box className={classes.infoContainer}>
          <Typography className={classes.name}>{dish.name}</Typography>
          <Typography className={classes.description}>
            {dish.description}
          </Typography>
          <Typography className={classes.price}>
            {currencyConvertion(dish.price)}
          </Typography>
        </Box>
        {dish?.images[0]?.url && (
          <Image
            src={dish?.images[0]?.url}
            height={80}
            width={80}
            className={classes.image}
          />
        )}
      </ListItem>
    </Link>
  )
}

export default DishItem
