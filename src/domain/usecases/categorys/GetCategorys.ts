import { getCategorys } from '@data/repository/CategorysRepository'
import Category from '@domain/entities/Category'

export default function GetCategory(): Promise<Category[]> {
  return getCategorys()
}
