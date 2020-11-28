import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Theme } from '@material-ui/core'
import Divider from '@material-ui/core/Divider'

import MenuCategory from '@domain/entities/MenuCategory'
import ProductItem from '@presentation/components/ProductItem'

interface CategoryItemProps {
  category: MenuCategory
}

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    fontSize: 20,
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(5),
    fontWeight: theme.typography.fontWeightMedium
  }
}))

const MenuCategoryItem: React.FC<CategoryItemProps> = ({ category }) => {
  const classes = useStyles()

  return (
    <Container>
      <Typography className={classes.title} key={category.id} align="left">
        {category.name}
      </Typography>
      <Divider />
      <List disablePadding>
        {category.itens.map(item => (
          <ProductItem dish={item} key={item.id} />
        ))}
      </List>
    </Container>
  )
}

export default MenuCategoryItem
