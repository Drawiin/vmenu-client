import jwt from 'jsonwebtoken'

interface Header {
  Authorization: string
  'X-User-Email': string
}

const generateHeader = (privateKey: string, email: string): Header => {
  const token = jwt.sign({ email }, privateKey, { algorithm: 'RS256' })
  const headers = {
    Authorization: `Bearer ${token}`,
    'X-User-Email': email
  }

  return headers
}

export default generateHeader
