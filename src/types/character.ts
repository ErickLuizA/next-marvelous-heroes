interface Thumbnail {
  path: string
  extension: string
}

interface Comics {
  available: number
  collectionURI: string
  items: string
  returned: number
}

interface Series {
  available: number
  collectionURI: string
  items: string
  returned: number
}

interface Stories {
  available: number
  collectionURI: string
  items: string
  returned: number
}

interface Events {
  available: number
  collectionURI: string
  items: string
  returned: number
}

export interface Character {
  id: number
  name: string
  description: string
  modified: Date
  thumbnail: Thumbnail
  resourceURI: string
  comics: Comics
  series: Series
  stories: Stories
  events: Events
  urls: string[]
}
