// eslint-disable-next-line no-use-before-define
import React, { useContext } from 'react'
import { Container } from '@material-ui/core'
import Header from '../../components/Header'
import { useRouter } from 'next/router'

const PersonProfile: React.FC = () => {
  const router = useRouter()

  console.log(router)

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <h1>PersonProfile</h1>
      </Container>
    </>
  )
}

export default PersonProfile
