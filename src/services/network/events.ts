import { Event } from '../../types/event'
import api from './api'

export async function getEvents(): Promise<Event[]> {
  const response = await api.get('/events', {
    params: { orderBy: '-modified', limit: 20 }
  })

  return response.data.data.results
}
