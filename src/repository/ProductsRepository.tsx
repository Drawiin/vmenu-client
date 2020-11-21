import MenuCategory from '../entities/MenuCategory'
import Product from '../entities/Product'
import ApiClient from '../services/ApiClient'

export default interface CategoryMapping {
  [id: number]: MenuCategory
}

export async function getProducts(): Promise<Array<Product>> {
  const response = await ApiClient.get<Array<Product>>('products')
  return response.data
}

export async function getMenu(): Promise<Array<MenuCategory>> {
  const response = await ApiClient.get<Array<Product>>('products')
  const menu: CategoryMapping = {}

  response.data.forEach(product => {
    const categoryId = product?.category?.id ?? -1
    const categoryName = product?.category?.name ?? 'Outros'
    const category = menu[categoryId]
    menu[categoryId] = {
      id: categoryId,
      name: categoryName,
      itens: category?.itens ? [...category?.itens, product] : [product]
    }
  })

  return Object.keys(menu).map(key => menu[key])
}
