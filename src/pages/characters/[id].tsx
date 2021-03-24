import { useContext } from 'react'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { Container, makeStyles } from '@material-ui/core'

import api from '../../services/api'

import { AuthContext } from '../../contexts/AuthContext'

import { Character as Char } from '../../components/ImageSlider'
import Header from '../../components/Header'
import CharCard from '../../components/CharCard'
import Loading from '../../components/Loading'

const useStyles = makeStyles(theme => ({
  flex: {
    display: 'flex',
    padding: '2em',
    gap: '3em',
    [theme.breakpoints.down('lg')]: {
      flexDirection: 'column'
    }
  }
}))

const Character: React.FC = ({
  data
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter()

  const styles = useStyles()

  const { loading } = useContext(AuthContext)

  if (router.isFallback || loading) {
    return <Loading />
  }

  return (
    <>
      <Header />
      <Container maxWidth="lg" className={styles.flex}>
        {data.map((char: Char) => (
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

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await api.get('/characters', {
    params: {
      orderBy: '-modified',
      limit: 100
    }
  })

  const data = response.data.data.results

  const paths = data.map((char: Char) => ({
    params: { id: char.id.toString() }
  }))

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async context => {
  const response = await api.get(`/characters/${context.params.id}`)

  const data = response.data.data.results

  return {
    props: { data },
    revalidate: 1
  }
}

export default Character
