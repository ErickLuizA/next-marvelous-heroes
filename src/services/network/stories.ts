import { Story } from '../../types/story'
import api, { IDefaultParams } from './api'

export async function getStories(
  { limit, orderBy }: IDefaultParams = { limit: 20, orderBy: '-modified' }
): Promise<Story[]> {
  const response = await api.get('/stories', {
    params: { orderBy, limit }
  })

  return response.data.data.results
}

export async function getStory(id: number): Promise<Story> {
  const response = await api.get(`/stories/${id}`)

  return response.data.data.results?.[0]
}
