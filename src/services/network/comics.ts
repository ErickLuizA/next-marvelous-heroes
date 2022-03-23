import { Comic } from '../../types/comic'
import api from './api'

export async function getComics(): Promise<Comic[]> {
  const response = await api.get('/comics', {
    params: { orderBy: '-modified', limit: 20 }
  })

  return response.data.data.results
}
