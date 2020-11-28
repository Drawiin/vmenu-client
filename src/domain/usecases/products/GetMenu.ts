import { getProducts } from '@data/repository/ProductsRepository'
import MenuCategory from '@domain/entities/MenuCategory'
import Product from '@domain/entities/Product'

export default async function GetMenu(): Promise<Product[]> {
  const products = await getProducts()

  const menu: { [id: number]: MenuCategory } = {}

  products.forEach(product => {
    const menuCategoryId = product?.category?.id ?? -1
    const menuCategoryName = product?.category?.name ?? 'Outros'
    const menuCategoryItens = menu[menuCategoryId]?.itens ?? []

    menu[menuCategoryId] = {
      id: menuCategoryId,
      name: menuCategoryName,
      itens: [...menuCategoryItens, product]
    }
  })

  return Object.keys(menu).map(key => menu[key])
}
