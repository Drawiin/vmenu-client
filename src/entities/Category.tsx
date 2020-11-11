import Dish from './Dish'

export default interface Category {
  id: number
  name: string
  items: Array<Dish>
}
