import { getProduct } from '@data/repository/ProductsRepository'
import Product from '@domain/entities/Product'

export default function GetProduct(id: number): Promise<Product> {
  return getProduct(id)
}
