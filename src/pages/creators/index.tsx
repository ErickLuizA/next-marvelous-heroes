import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { AppBar } from '../../components/AppBar'
import { Container } from '../../components/Container'
import { ItemCard } from '../../components/ItemCard'
import * as api from '../../services/network'
import styles from '../../styles/page-list.module.css'
import { Creator } from '../../types/creator'

export default function Creators({
  data
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <AppBar />
      <div className={styles.container}>
        <h1 className={styles.header}>creators</h1>
        <ul className={styles.list}>
          {data.map((creator) => (
            <ItemCard
              key={creator.id}
              item={{
                id: creator.id,
                poster:
                  creator.thumbnail.path + '.' + creator.thumbnail.extension,
                title: creator.fullName
              }}
              link={'/creators/' + creator.id}
              scale
            />
          ))}
        </ul>
      </div>
    </Container>
  )
}

export const getStaticProps: GetStaticProps<{
  data: Creator[]
}> = async () => {
  const data = await api.getCreators({ limit: 100 })

  return {
    props: {
      data
    }
  }
}
