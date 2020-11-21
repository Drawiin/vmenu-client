import Category from './Category'

export default interface Product {
  id: number
  name: string
  price: number
  quantity: number
  category: Category
  description: string
  images: Array<{
    id: number
    url: string
  }>
}
