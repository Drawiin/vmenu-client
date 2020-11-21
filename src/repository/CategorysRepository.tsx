import Category from '../entities/Category'
import ApiClient from '../services/ApiClient'

export async function getCategorys(): Promise<Array<Category>> {
  const response = await ApiClient.get<Array<Category>>('categorys')
  return response.data
}
