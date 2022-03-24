import { GetStaticProps, InferGetStaticPropsType } from 'next'
import * as api from '../services/network'
import { Container } from '../components/Container'
import { List } from '../components/List'
import { AppBar } from '../components/AppBar'
import { Item } from '../types/item'
import { Character } from '../types/character'
import { Comic } from '../types/comic'
import { Creator } from '../types/creator'
import { Event } from '../types/event'
import { Serie } from '../types/serie'
import { Story } from '../types/story'

interface IHomeProps {
  data: {
    characters: Item[]
    comics: Item[]
    creators: Item[]
    events: Item[]
    series: Item[]
    stories: Item[]
  }
}

export const getStaticProps: GetStaticProps<IHomeProps> = async () => {
  const responses = await Promise.allSettled([
    api.getCharacters(),
    api.getComics(),
    api.getCreators(),
    api.getEvents(),
    api.getSeries(),
    api.getStories()
  ])

  const [characters, comics, creators, events, series, stories] = responses.map(
    (response) => (response.status === 'fulfilled' ? response.value : [])
  )

  const data = {
    characters: (characters as Character[]).map((character) => ({
      id: character.id,
      title: character.name,
      poster: character.thumbnail.path + '.' + character.thumbnail.extension
    })),
    comics: (comics as Comic[]).map((comic) => ({
      id: comic.id,
      title: comic.title,
      poster: comic.thumbnail.path + '.' + comic.thumbnail.extension
    })),
    creators: (creators as Creator[]).map((creator) => ({
      id: creator.id,
      title: creator.fullName,
      poster: creator.thumbnail.path + '.' + creator.thumbnail.extension
    })),
    events: (events as Event[]).map((event) => ({
      id: event.id,
      title: event.title,
      poster: event.thumbnail.path + '.' + event.thumbnail.extension
    })),
    series: (series as Serie[]).map((serie) => ({
      id: serie.id,
      title: serie.title,
      poster: serie.thumbnail.path + '.' + serie.thumbnail.extension
    })),
    stories: (stories as Story[]).map((story) => ({
      id: story.id,
      title: story.title,
      poster: story.thumbnail
        ? story.thumbnail.path + '.' + story.thumbnail.extension
        : 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
    }))
  }

  return {
    props: {
      data
    }
  }
}

export default function Home({
  data
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <AppBar />
      <div className="container">
        <List name="Characters" link="/characters" items={data.characters} />
        <List name="Comics" link="/comics" items={data.comics} />
        <List name="Series" link="/series" items={data.series} />
        <List name="Events" link="/events" items={data.events} />
        <List name="Stories" link="/stories" items={data.stories} />
        <List name="Creators" link="/creators" items={data.creators} />
      </div>
    </Container>
  )
}
