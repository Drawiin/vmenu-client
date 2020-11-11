import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import DishItem from '../components/DishItem'
import Category from '../entities/Category'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Theme } from '@material-ui/core'
import Divider from '@material-ui/core/Divider'

interface CategoryItemProps {
  category: Category
}

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    fontSize: 20,
    marginBottom: 16,
    marginTop: 24,
    fontWeight: theme.typography.fontWeightMedium
  }
}))

const CategoryItem: React.FC<CategoryItemProps> = ({ category }) => {
  const classes = useStyles()

  return (
    <Container>
      <Typography className={classes.title} key={category.id} align="left">
        {category.name}
      </Typography>
      <Divider />
      <List disablePadding>
        {category.items.map(item => (
          <DishItem dish={item} key={item.id} />
        ))}
      </List>
    </Container>
  )
}

export default CategoryItem
