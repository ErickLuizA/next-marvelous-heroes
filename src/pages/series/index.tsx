import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { AppBar } from '../../components/AppBar'
import { Container } from '../../components/Container'
import { ItemCard } from '../../components/ItemCard'
import * as api from '../../services/network'
import styles from '../../styles/page-list.module.css'
import { Serie } from '../../types/serie'

export default function Series({
  data
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <AppBar />
      <div className={styles.container}>
        <h1 className={styles.header}>Series</h1>
        <ul className={styles.list}>
          {data.map((serie) => (
            <ItemCard
              key={serie.id}
              item={{
                id: serie.id,
                poster: serie.thumbnail.path + '.' + serie.thumbnail.extension,
                title: serie.title
              }}
              link={'/series/' + serie.id}
              scale
            />
          ))}
        </ul>
      </div>
    </Container>
  )
}

export const getStaticProps: GetStaticProps<{
  data: Serie[]
}> = async () => {
  const data = await api.getSeries({ limit: 100 })

  return {
    props: {
      data
    }
  }
}
