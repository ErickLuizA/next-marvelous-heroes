import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { AppBar } from '../../components/AppBar'
import { Container } from '../../components/Container'
import { ItemCard } from '../../components/ItemCard'
import * as api from '../../services/network'
import styles from '../../styles/page-list.module.css'
import { Character } from '../../types/character'

export default function Characters({
  data
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <AppBar />
      <div className={styles.container}>
        <h1 className={styles.header}>Characters</h1>
        <ul className={styles.list}>
          {data.map((character) => (
            <ItemCard
              key={character.id}
              item={{
                id: character.id,
                poster:
                  character.thumbnail.path +
                  '.' +
                  character.thumbnail.extension,
                title: character.name
              }}
              link={'/characters/' + character.id}
              scale
            />
          ))}
        </ul>
      </div>
    </Container>
  )
}

export const getStaticProps: GetStaticProps<{
  data: Character[]
}> = async () => {
  const data = await api.getCharacters({ limit: 100 })

  return {
    props: {
      data
    }
  }
}
