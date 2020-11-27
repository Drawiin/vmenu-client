import React, { useState } from 'react'
import ApiClient from '../../services/ApiClient'
import { hashPassword, encrypt, decrypt } from '../../utils/crypt'
import keypair from 'keypair'
import generateHeader from '../../utils/generateHeader'

interface KeyPair {
  private: string
  public: string
}

interface FormValues {
  email: string
  password: string
  name: string
}

interface AxiosLoginResponse {
  email: string
  encryptedPrivateKey: string
  name: string
  publicKey: string
}

const login: React.FC = () => {
  const [form, setForm] = useState<FormValues>({
    email: '',
    name: '',
    password: ''
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm(form => ({
      ...form,
      [event.target.name]: event.target.value
    }))
  }

  const handleRegisterFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const hashedPassword = await hashPassword(form.password)
    const { private: privateKey, public: publicKey } = keypair() as KeyPair
    const encryptedPrivateKey = encrypt(form.password, privateKey)

    await ApiClient.post(
      '/register',
      {
        name: form.name,
        encryptedPrivateKey: encryptedPrivateKey,
        publicKey
      },
      {
        auth: {
          username: form.email,
          password: hashedPassword
        }
      }
    )
  }

  // exemplo de como seria o registro de um admin
  const registerAdmin = async () => {
    // Senha do admin ja existente
    const password = 'admin'
    const hashedPassword = await hashPassword(password)

    // Email do admin ja existente
    const email = 'admin@admin.com'

    // Usuario do admin
    const admin = await ApiClient.get<AxiosLoginResponse>('/login', {
      auth: {
        username: email,
        password: hashedPassword
      }
    })

    // mesma coisa que o user normal
    const privateKey = decrypt(password, admin.data.encryptedPrivateKey)

    const randomNumber = Math.ceil(Math.random() * 1000)

    await ApiClient.post(
      '/registerAdmin',
      {
        name: `admin-batata-${randomNumber}`,
        encryptedPrivateKey: admin.data.encryptedPrivateKey,
        publicKey: admin.data.publicKey
      },
      {
        headers: generateHeader(privateKey, email)
      }
    )
  }

  const handleLoginFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const hashedPassword = await hashPassword(form.password)

    const user = await ApiClient.get<AxiosLoginResponse>('/login', {
      auth: {
        username: form.email,
        password: hashedPassword
      }
    })

    // const privateKey = decrypt(form.password, user.data.encryptedPrivateKey)

    // exemplo de requisição com autorização

    // await ApiClient.post(
    //   '/order',
    //   {
    //     items: [
    //       {
    //         productId: 4,
    //         quantity: 1,
    //         description: 'Teste'
    //       }
    //     ],
    //     table: 5
    //   },
    //   {
    //     headers: generateHeader(privateKey, form.email)
    //   }
    // )

    // exemplo de requisição com autorização

    // await ApiClient.get('/order', {
    //   headers: generateHeader(privateKey, form.email)
    // })
  }

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center'
      }}
    >
      <form
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          textAlign: 'center'
        }}
        onSubmit={handleRegisterFormSubmit}
      >
        <h3>Register</h3>
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'center',
            justifyContent: 'center',
            textAlign: 'center'
          }}
        >
          <div style={{ margin: 15 }}>
            Email: <input onChange={handleChange} name="email" />
          </div>
          <div style={{ margin: 15 }}>
            Name: <input onChange={handleChange} name="name" />
          </div>
          <div style={{ margin: 15 }}>
            Senha:
            <input onChange={handleChange} name="password" type="password" />
          </div>
        </div>
        <button type="submit">Register</button>
      </form>

      <form
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          textAlign: 'center'
        }}
        onSubmit={handleLoginFormSubmit}
      >
        <h3>Login</h3>
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'center',
            justifyContent: 'center',
            textAlign: 'center'
          }}
        >
          <div style={{ margin: 15 }}>
            Email: <input onChange={handleChange} name="email" />
          </div>
          <div style={{ margin: 15 }}>
            Senha:
            <input onChange={handleChange} name="password" type="password" />
          </div>
        </div>
        <button type="submit">Login</button>
      </form>

      <button onClick={registerAdmin}>Register Admin</button>
    </div>
  )
}

export default login
