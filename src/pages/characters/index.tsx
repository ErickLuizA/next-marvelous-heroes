import { useContext } from 'react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { Container } from '@material-ui/core'

import api from '../../services/api'

import { AuthContext } from '../../contexts/AuthContext'

import { Character } from '../../components/ImageSlider'
import Header from '../../components/Header'
import CharCard from '../../components/CharCard'
import Loading from '../../components/Loading'

const Characters: React.FC = ({
  data
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { loading } = useContext(AuthContext)

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <Header />
      <Container maxWidth="lg" style={{ padding: '1em' }}>
        {data.map((char: Character) => (
          <CharCard
            id={char.id}
            name={char.name}
            comics={char.comics}
            thumbnail={char.thumbnail}
            description={char.description}
            key={char.id}
          />
        ))}
      </Container>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await api.get('/characters?', {
    params: {
      orderBy: '-modified'
    }
  })
  const data = res.data.data.results

  return {
    props: {
      data
    }
  }
}

export default Characters
