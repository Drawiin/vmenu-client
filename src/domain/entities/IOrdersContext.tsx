import OrderItem from './OrderItem'

export default interface IOrderContext {
  order: OrderItem[]
  changeItens: (newItems: OrderItem[]) => void
}
