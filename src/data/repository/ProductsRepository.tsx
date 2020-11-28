import ApiClient from '@data/client/ApiClient'
import Product from '@domain/entities/Product'

export async function getProducts(): Promise<Array<Product>> {
  return ApiClient.getProducts()
}

export async function getProduct(id: number): Promise<Product> {
  return ApiClient.getProduct(id)
}
