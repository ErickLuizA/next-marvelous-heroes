// eslint-disable-next-line no-use-before-define
import React from 'react'
import Header from '../components/Header'
import {
  Container,
  Box,
  makeStyles,
  Typography,
  Button
} from '@material-ui/core'
import api from '../services/api'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import ImageSlider, { Character } from '../components/ImageSlider'
import Link from 'next/link'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    height: '85%',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
      height: '100%'
    }
  },

  leftBox: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },

  rightBox: {
    position: 'relative',
    width: '50%',
    height: '100%',
    marginTop: '20px',
    marginBottom: '10px',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },

  buttonBox: {
    margin: '10px'
  },

  alignText: {
    textAlign: 'center'
  },

  button: {
    margin: '10px',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  }
}))

const Home: React.FC = ({
  data
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const styles = useStyles()
  return (
    <>
      <Header />
      <Container className={styles.container} maxWidth="lg">
        <Box className={styles.leftBox}>
          <Typography className={styles.alignText} variant="h2">
            Welcome to Fanarvel
          </Typography>
          <Typography className={styles.alignText} variant="h5">
            Every Marvel fan favorite place
          </Typography>
          <Typography className={styles.alignText} variant="h6">
            Join us!
          </Typography>
          <Box className={styles.buttonBox}>
            <Link href="login">
              <Button className={styles.button} variant="contained">
                <a>Login</a>
              </Button>
            </Link>
            <Link href="register">
              <Button className={styles.button} variant="outlined">
                <a>Register</a>
              </Button>
            </Link>
          </Box>
        </Box>
        <Box className={styles.rightBox}>
          {data?.map((item: Character) => {
            return (
              <ImageSlider
                key={item.id}
                comics={item.comics}
                description={item.description}
                name={item.name}
                thumbnail={item.thumbnail}
              />
            )
          })}
        </Box>
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

export default Home
