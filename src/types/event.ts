interface Url {
  type: string
  url: string
}

interface Thumbnail {
  path: string
  extension: string
}

interface Item {
  resourceURI: string
  name: string
  role: string
}

interface Creators {
  available: number
  collectionURI: string
  items: Item[]
  returned: number
}

interface Item2 {
  resourceURI: string
  name: string
}

interface Characters {
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

interface Item4 {
  resourceURI: string
  name: string
}

interface Comics {
  available: number
  collectionURI: string
  items: Item4[]
  returned: number
}

interface Item5 {
  resourceURI: string
  name: string
}

interface Series {
  available: number
  collectionURI: string
  items: Item5[]
  returned: number
}

interface Next {
  resourceURI: string
  name: string
}

interface Previous {
  resourceURI: string
  name: string
}

export interface Event {
  id: number
  title: string
  description: string
  resourceURI: string
  urls: Url[]
  modified: Date
  start: string
  end: string
  thumbnail: Thumbnail
  creators: Creators
  characters: Characters
  stories: Stories
  comics: Comics
  series: Series
  next: Next
  previous: Previous
}
