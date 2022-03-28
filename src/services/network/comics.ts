import { Comic } from '../../types/comic'
import api, { IDefaultParams } from './api'

export async function getComics(
  { limit, orderBy }: IDefaultParams = { limit: 20, orderBy: '-modified' }
): Promise<Comic[]> {
  const response = await api.get('/comics', {
    params: { orderBy, limit }
  })

  return response.data.data.results
}

export async function getComic(id: number): Promise<Comic> {
  const response = await api.get(`/comics/${id}`)

  return response.data.data.results?.[0]
}
