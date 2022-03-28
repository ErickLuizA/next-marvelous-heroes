import { Creator } from '../../types/creator'
import api, { IDefaultParams } from './api'

export async function getCreators(
  { limit, orderBy }: IDefaultParams = { limit: 20, orderBy: '-modified' }
): Promise<Creator[]> {
  const response = await api.get('/creators', {
    params: { orderBy, limit }
  })

  return response.data.data.results
}

export async function getCreator(id: number): Promise<Creator> {
  const response = await api.get(`/creators/${id}`)

  return response.data.data.results?.[0]
}
