import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { AppBar } from '../../components/AppBar'
import { Container } from '../../components/Container'
import { ItemCard } from '../../components/ItemCard'
import * as api from '../../services/network'
import styles from '../../styles/page-list.module.css'
import { Event } from '../../types/event'

export default function Events({
  data
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <AppBar />
      <div className={styles.container}>
        <h1 className={styles.header}>Events</h1>
        <ul className={styles.list}>
          {data.map((event) => (
            <ItemCard
              key={event.id}
              item={{
                id: event.id,
                poster: event.thumbnail.path + '.' + event.thumbnail.extension,
                title: event.title
              }}
              link={'/events/' + event.id}
              scale
            />
          ))}
        </ul>
      </div>
    </Container>
  )
}

export const getStaticProps: GetStaticProps<{
  data: Event[]
}> = async () => {
  const data = await api.getEvents({ limit: 100 })

  return {
    props: {
      data
    }
  }
}
