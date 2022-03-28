import { Serie } from '../../types/serie'
import api, { IDefaultParams } from './api'

export async function getSeries(
  { limit, orderBy }: IDefaultParams = { limit: 20, orderBy: '-modified' }
): Promise<Serie[]> {
  const response = await api.get('/series', {
    params: { orderBy, limit }
  })

  return response.data.data.results
}

export async function getSerie(id: number): Promise<Serie> {
  const response = await api.get(`/series/${id}`)

  return response.data.data.results?.[0]
}
