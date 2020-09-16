import axios from 'axios'
import api from '../services/api'

export default async function useFetch(url: number[]) {
  const response = await axios.all(
    url.map(async u => (await api.get(`characters/${u}`)).data)
  )

  return response
}
