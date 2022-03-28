import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { AppBar } from '../../components/AppBar'
import { Container } from '../../components/Container'
import { ItemCard } from '../../components/ItemCard'
import * as api from '../../services/network'
import styles from '../../styles/page-list.module.css'
import { Comic } from '../../types/comic'

export default function Comics({
  data
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <AppBar />
      <div className={styles.container}>
        <h1 className={styles.header}>Comics</h1>
        <ul className={styles.list}>
          {data.map((comic) => (
            <ItemCard
              key={comic.id}
              item={{
                id: comic.id,
                poster: comic.thumbnail.path + '.' + comic.thumbnail.extension,
                title: comic.title
              }}
              link={'/comics/' + comic.id}
              scale
            />
          ))}
        </ul>
      </div>
    </Container>
  )
}

export const getStaticProps: GetStaticProps<{
  data: Comic[]
}> = async () => {
  const data = await api.getComics({ limit: 100 })

  return {
    props: {
      data
    }
  }
}
