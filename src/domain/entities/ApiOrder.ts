import ApiOrderItem from './ApiOrderItem'

export default interface ApiOrder {
  id: number
  value: number
  table: number
  items: ApiOrderItem[]
}
