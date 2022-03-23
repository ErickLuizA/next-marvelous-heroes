import { Character } from '../../types/character'
import api from './api'

interface IGetCharactersParams {
  orderBy?: string
  limit?: number
}

export async function getCharacters(
  { limit, orderBy }: IGetCharactersParams = { limit: 20, orderBy: '-modified' }
): Promise<Character[]> {
  const response = await api.get('/characters', {
    params: { orderBy, limit }
  })

  return response.data.data.results
}
