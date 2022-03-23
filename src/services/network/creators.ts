import { Creator } from '../../types/creator'
import api from './api'

export async function getCreators(): Promise<Creator[]> {
  const response = await api.get('/creators', {
    params: { orderBy: '-modified', limit: 20 }
  })

  return response.data.data.results
}
