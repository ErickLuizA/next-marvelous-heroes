import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { AppBar } from '../../components/AppBar'
import { Container } from '../../components/Container'
import { ItemCard } from '../../components/ItemCard'
import * as api from '../../services/network'
import styles from '../../styles/page-list.module.css'
import { Story } from '../../types/story'

export default function Stories({
  data
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <AppBar />
      <div className={styles.container}>
        <h1 className={styles.header}>Stories</h1>
        <ul className={styles.list}>
          {data.map((story) => (
            <ItemCard
              key={story.id}
              item={{
                id: story.id,
                poster: story.thumbnail.path + '.' + story.thumbnail.extension,
                title: story.title
              }}
              link={'/stories/' + story.id}
              scale
            />
          ))}
        </ul>
      </div>
    </Container>
  )
}

export const getStaticProps: GetStaticProps<{
  data: Story[]
}> = async () => {
  const data = await api.getStories({ limit: 100 })

  return {
    props: {
      data
    }
  }
}
