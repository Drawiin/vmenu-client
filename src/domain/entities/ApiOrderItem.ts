import Product from './Product'

export default interface ApiOrderItem {
  id: number
  quantity: number
  description: string
  product: Product
}
