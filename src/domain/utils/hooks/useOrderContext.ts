import IOrderContext from '@domain/entities/IOrdersContext'
import OrderItem from '@domain/entities/OrderItem'
import { useState } from 'react'

export default function useOrderContext(): IOrderContext {
  const [value, setValue] = useState<IOrderContext>({
    order: [],
    changeItens: (newItems: OrderItem[]) =>
      setValue({
        order: newItems,
        changeItens: value.changeItens
      })
  })

  // const changeItens = (newItems: OrderItem[]) =>
  //   setValue({
  //     order: newItems,
  //     changeItens: value.changeItens
  //   })

  // setValue({
  //   order: [],
  //   changeItens
  // })

  return value
}
