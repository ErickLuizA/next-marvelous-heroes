import { Event } from '../../types/event'
import api, { IDefaultParams } from './api'

export async function getEvents(
  { limit, orderBy }: IDefaultParams = { limit: 20, orderBy: '-modified' }
): Promise<Event[]> {
  const response = await api.get('/events', {
    params: { orderBy, limit }
  })

  return response.data.data.results
}

export async function getEvent(id: number): Promise<Event> {
  const response = await api.get(`/events/${id}`)

  return response.data.data.results?.[0]
}
