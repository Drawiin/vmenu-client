import Product from '@domain/entities/Product'
import { List, makeStyles } from '@material-ui/core'

import ProductItem from '@presentation/components/ProductItem'

const useStyles = makeStyles(theme => ({
  list: {
    flex: 1,
    width: '100%',
    padding: theme.spacing(2)
  }
}))

const Preview: React.FC<{
  sugestions: Product[]
}> = ({ sugestions }) => {
  const classes = useStyles()

  return (
    <List className={classes.list}>
      {sugestions.map(item => (
        <ProductItem dish={item} key={item.id} />
      ))}
    </List>
  )
}

export default Preview
