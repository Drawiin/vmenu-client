import { getProducts } from '@data/repository/ProductsRepository'
import Product from '@domain/entities/Product'

export default function GetProducts(): Promise<Product[]> {
  return getProducts()
}
