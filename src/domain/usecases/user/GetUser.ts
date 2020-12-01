import User from '@domain/entities/User'
import { getValue } from '@domain/utils/cache/Cache'
import { USER_KEY } from '@domain/utils/constants/keys'

export default function GetUser(): User | null {
  return getValue<User>(USER_KEY)
}
