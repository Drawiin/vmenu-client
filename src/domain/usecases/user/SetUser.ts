import User from '@domain/entities/User'
import { setValue } from '@domain/utils/cache/Cache'
import { USER_KEY } from '@domain/utils/constants/keys'

export default function SetUser(user: User): void {
  return setValue<User>(USER_KEY, user)
}
