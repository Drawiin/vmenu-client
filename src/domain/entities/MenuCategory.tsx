import Product from './Product'

export default interface MenuCategory {
  id: number
  name: string
  itens: Array<Product>
}
