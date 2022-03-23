import { Story } from '../../types/story'
import api from './api'

export async function getStories(): Promise<Story[]> {
  const response = await api.get('/stories', {
    params: { orderBy: '-modified', limit: 20 }
  })

  return response.data.data.results
}
