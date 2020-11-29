import OrderItem from '@domain/entities/OrderItem'

export default function getTotalPrice(order: OrderItem[]): number {
  return order.reduce(
    (acc, current) => current.quantity * current.product.price + acc,
    0
  )
}
