import { IOUserContext } from './hooks/useUserContext'
import { createContext } from 'react'

const UserContext = createContext<IOUserContext>(null)
export default UserContext
