// eslint-disable-next-line no-use-before-define
import React from 'react'
import { Container } from '@material-ui/core'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Header from '../../components/Header'
import { Character } from '../../components/ImageSlider'
import api from '../../services/api'
import CharCard from '../../components/CharCard'

const Characters: React.FC = ({
  data
}: InferGetStaticPropsType<typeof getStaticProps>) => {
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
