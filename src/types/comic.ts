interface Url {
  type: string
  url: string
}

interface Series {
  resourceURI: string
  name: string
}

interface Variant {
  resourceURI: string
  name: string
}

interface Date {
  type: string
  date: Date
}

interface Price {
  type: string
  price: number
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

interface Characters {
  available: number
  collectionURI: string
  items: any[]
  returned: number
}

interface Item2 {
  resourceURI: string
  name: string
  type: string
}

interface Stories {
  available: number
  collectionURI: string
  items: Item2[]
  returned: number
}

interface Events {
  available: number
  collectionURI: string
  items: any[]
  returned: number
}

export interface Comic {
  id: number
  digitalId: number
  title: string
  issueNumber: number
  variantDescription: string
  description: string
  modified: Date
  isbn: string
  upc: string
  diamondCode: string
  ean: string
  issn: string
  format: string
  pageCount: number
  textObjects: any[]
  resourceURI: string
  urls: Url[]
  series: Series
  variants: Variant[]
  collections: any[]
  collectedIssues: any[]
  dates: Date[]
  prices: Price[]
  thumbnail: Thumbnail
  images: any[]
  creators: Creators
  characters: Characters
  stories: Stories
  events: Events
}
