import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { Container } from '../../components/Container'
import { AppBar } from '../../components/AppBar'
import api from '../../services/network/api'
import { Character as ICharacter } from '../../types/character'

export default function Character({
  data
}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log({ data })

  return (
    <Container>
      <AppBar />
      <div className="full-width">
        <h1>{data.name}</h1>
      </div>
    </Container>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await api.get('/characters', {
    params: {
      orderBy: '-modified',
      limit: 100
    }
  })

  const data = response.data.data.results

  const paths = data.map((char: ICharacter) => ({
    params: { id: char.id.toString() }
  }))

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps: GetStaticProps<{ data: ICharacter }> = async (
  context
) => {
  const response = await api.get(`/characters/${context.params.id}`)

  const data: ICharacter = response.data.data.results[0]

  return {
    props: { data },
    revalidate: 1
  }
}
