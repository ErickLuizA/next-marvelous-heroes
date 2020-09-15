// eslint-disable-next-line no-use-before-define
import React from 'react'
import { Container } from '@material-ui/core'
import Header from '../components/Header'
import Form from '../components/Form'

const Register: React.FC = () => {
  return (
    <>
      <Header />
      <Container maxWidth="lg" style={{ height: '90%' }}>
        <Form type="Register" />
      </Container>
    </>
  )
}

export default Register
