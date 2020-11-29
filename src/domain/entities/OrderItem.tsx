import Product from './Product'

export default interface OrderItem {
  id: number
  product: Product
  quantity: number
  observation: string
}
