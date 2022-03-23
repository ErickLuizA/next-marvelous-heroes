import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { Container } from '../../components/Container'
import { AppBar } from '../../components/AppBar'
import * as api from '../../services/network'
import styles from '../../styles/characters.module.css'
import { Character } from '../../types/character'
import { ItemCard } from '../../components/ItemCard'

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
              item={{
                id: character.id,
                poster:
                  character.thumbnail.path +
                  '.' +
                  character.thumbnail.extension,
                title: character.name
              }}
              link={'/characters/' + character.id}
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
