// eslint-disable-next-line no-use-before-define
import React, { FormEvent, useContext, useState } from 'react'
import { Container, TextField } from '@material-ui/core'
import Header from '../components/Header'
import { AuthContext } from '../contexts/AuthContext'
import { Autocomplete } from '@material-ui/lab'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import api from '../services/api'
import { Character } from '../components/ImageSlider'
import { useRouter } from 'next/router'

const Dashboard: React.FC = ({
  characters
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { user } = useContext(AuthContext)

  const [selectedChar, setSelectedChar] = useState<string | null>(null)
  const [error, setError] = useState(false)

  const router = useRouter()

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    setError(false)

    const charac = characters.filter(
      (char: Character) =>
        char.name.toLowerCase() === selectedChar?.toLowerCase()
    )

    if (charac[0]?.id) {
      await router.push(`/characters/${charac[0].id}`)
    } else {
      const res = await api.get('/characters', {
        params: { name: selectedChar }
      })

      if (res?.data.data.results.length === 1) {
        const data = res.data.data.results
        await router.push(`characters/${data.id}`)
      } else if (res?.data.data.results.length > 1) {
        await router.push('characters')
      } else {
        setError(true)
      }
    }
  }

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Autocomplete
          freeSolo
          value={selectedChar}
          onChange={(event, newValue) => setSelectedChar(newValue)}
          options={characters.map((character: Character) => character.name)}
          renderInput={params => (
            <form onSubmit={handleSubmit}>
              <TextField
                {...params}
                error={error}
                helperText={error ? 'This character does not exist' : ''}
                label="Search a character"
                margin="normal"
                variant="outlined"
              />
            </form>
          )}
        />
        <h1>Welcome {user?.displayName}</h1>
      </Container>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await api.get('/characters?', {
    params: {
      orderBy: '-modified',
      limit: 100
    }
  })

  const data = res.data.data.results

  return {
    props: {
      characters: data
    }
  }
}

export default Dashboard
