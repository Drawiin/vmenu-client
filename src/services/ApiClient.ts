import axios from 'axios'

const ApiClient = axios.create({
  baseURL: 'https://migueis-api.herokuapp.com'
})
export default ApiClient
