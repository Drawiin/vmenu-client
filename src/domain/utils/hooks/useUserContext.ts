import User from '@domain/entities/User'
import { useState } from 'react'

export interface IOUserContext {
  user: User | undefined
  changeUser: (newItems: User) => void
}

export default function useOrderContext(): IOUserContext {
  const [user, setUser] = useState<IOUserContext>({
    user: undefined,
    changeUser: (newUser: User) =>
      setUser({
        user: newUser,
        changeUser: user.changeUser
      })
  })

  return user
}
