import ApiClient from '@data/client/ApiClient'
import Category from '@domain/entities/Category'

export async function getCategorys(): Promise<Array<Category>> {
  return ApiClient.getCategorys()
}

export async function getCategory(id: number): Promise<Category> {
  return ApiClient.getCategory(id)
}
