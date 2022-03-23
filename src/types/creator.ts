interface Thumbnail {
  path: string
  extension: string
}

interface Item {
  resourceURI: string
  name: string
}

interface Comics {
  available: number
  collectionURI: string
  items: Item[]
  returned: number
}

interface Item2 {
  resourceURI: string
  name: string
}

interface Series {
  available: number
  collectionURI: string
  items: Item2[]
  returned: number
}

interface Item3 {
  resourceURI: string
  name: string
  type: string
}

interface Stories {
  available: number
  collectionURI: string
  items: Item3[]
  returned: number
}

interface Events {
  available: number
  collectionURI: string
  items: any[]
  returned: number
}

interface Url {
  type: string
  url: string
}

export interface Creator {
  id: number
  firstName: string
  middleName: string
  lastName: string
  suffix: string
  fullName: string
  modified: Date
  thumbnail: Thumbnail
  resourceURI: string
  comics: Comics
  series: Series
  stories: Stories
  events: Events
  urls: Url[]
}
