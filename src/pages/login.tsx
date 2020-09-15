// eslint-disable-next-line no-use-before-define
import React from 'react'
import { Container } from '@material-ui/core'
import Header from '../components/Header'
import Form from '../components/Form'

const Login: React.FC = () => {
  return (
    <>
      <Header />
      <Container maxWidth="lg" style={{ height: '90%' }}>
        <Form type="Login" />
      </Container>
    </>
  )
}

export default Login
