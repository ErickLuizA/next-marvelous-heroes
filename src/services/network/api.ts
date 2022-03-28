import axios from 'axios'
import crypto from 'crypto'

const timestamp = new Date().getTime()

const hash = crypto
  .createHash('md5')
  .update(
    timestamp +
      process.env.NEXT_PUBLIC_PRIVATE_API_KEY +
      process.env.NEXT_PUBLIC_PUBLIC_API_KEY
  )
  .digest('hex')

const api = axios.create({
  baseURL: 'https://gateway.marvel.com/v1/public',
  params: {
    ts: timestamp,
    apikey: process.env.NEXT_PUBLIC_PUBLIC_API_KEY,
    hash
  }
})

export interface IDefaultParams {
  orderBy?: string
  limit?: number
}

export default api
