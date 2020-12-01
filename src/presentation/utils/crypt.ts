import crypto, {
  createCipheriv,
  createDecipheriv,
  randomBytes,
  pbkdf2Sync
} from 'crypto'

const IV_VALUE = 16
const IV = randomBytes(IV_VALUE)

const hashPassword = async (password: string): Promise<string> => {
  const hash = crypto.createHash('sha256')

  const hashUpdated = hash.update(password)

  const hashedPassword = hashUpdated.digest('hex')

  return hashedPassword
}

const generateKey = (password: string) => {
  const salt = password.split('').reverse().join('')
  const key = pbkdf2Sync(password, salt, 4500, IV_VALUE, 'sha512')

  return key
}

const encrypt = (password: string, dataToEncrypt: string): string => {
  const cipher = createCipheriv('aes-128-cbc', generateKey(password), IV)
  const encrypted = cipher.update(dataToEncrypt)
  const encryptedBuffered = Buffer.concat([encrypted, cipher.final()])
  const ciphertext =
    IV.toString('hex') + ':' + encryptedBuffered.toString('hex')

  return ciphertext
}

const decrypt = (password: string, ciphertext: string): string => {
  const components = ciphertext.split(':')
  const ivFromCipherText = Buffer.from(components.shift(), 'hex')
  const encryptedText = Buffer.from(components.join(':'), 'hex')
  const decipher = createDecipheriv(
    'aes-128-cbc',
    generateKey(password),
    ivFromCipherText
  )
  const deciphered = decipher.update(encryptedText)
  const decipheredFinal = Buffer.concat([deciphered, decipher.final()])

  const decipheredString = decipheredFinal.toString()

  return decipheredString
}

export { hashPassword, encrypt, decrypt }
