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
    const category = menu[product.category.id]
    menu[product.category.id] = {
      id: product.category.id,
      name: product.category.name,
      itens: category?.itens ? [...category?.itens, product] : [product]
    }
  })

  return Object.keys(menu).map(key => menu[key])
}
