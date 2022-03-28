import { Character } from '../../types/character'
import api, { IDefaultParams } from './api'

export async function getCharacters(
  { limit, orderBy }: IDefaultParams = { limit: 20, orderBy: '-modified' }
): Promise<Character[]> {
  const response = await api.get('/characters', {
    params: { orderBy, limit }
  })

  return response.data.data.results
}

export async function getCharacter(id: number): Promise<Character> {
  const response = await api.get(`/characters/${id}`)

  return response.data.data.results?.[0]
}
