interface Thumbnail {
  path: string
  extension: string
}

interface Comics {
  available: number
  collectionURI: string
  items: Item[]
  returned: number
}

interface Series {
  available: number
  collectionURI: string
  items: Item[]
  returned: number
}

interface Stories {
  available: number
  collectionURI: string
  items: Item[]
  returned: number
}

interface Item {
  resourceURI: string
  name: string
}

interface Events {
  available: number
  collectionURI: string
  items: Item[]
  returned: number
}

interface URL {
  type: string
  url: string
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
  urls: URL[]
}
