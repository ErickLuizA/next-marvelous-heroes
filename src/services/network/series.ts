import { Serie } from '../../types/serie'
import api from './api'

export async function getSeries(): Promise<Serie[]> {
  const response = await api.get('/series', {
    params: { orderBy: '-modified', limit: 20 }
  })

  return response.data.data.results
}
