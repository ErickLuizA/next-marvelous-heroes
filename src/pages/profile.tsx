// eslint-disable-next-line no-use-before-define
import React, { useContext, useEffect, useState } from 'react'
import { Container, makeStyles } from '@material-ui/core'
import Header from '../components/Header'
import { AuthContext } from '../contexts/AuthContext'
import ProfilePage from '../components/ProfilePage'
import { db } from '../config/firebase'
import useFetch from '../hooks/useFetch'

const useStyles = makeStyles(theme => ({
  flex: {
    display: 'flex',
    flexDirection: 'column',
    padding: '2em',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row'
    }
  }
}))

const Profile: React.FC = () => {
  const { user, loading } = useContext(AuthContext)
  const [favorites, setFavorites] = useState([])

  const styles = useStyles()

  useEffect(() => {
    if (!loading) {
      ;(async () => {
        const docRef = db()
          .collection('Favorites')
          .where('userId', '==', user.uid)

        const snapshot = await docRef.get()

        if (!snapshot.empty) {
          snapshot.forEach(async snap => {
            const response: any = await useFetch(snap.data().Characters)

            const array = []

            response.forEach(res => array.push(res.data.results[0]))

            setFavorites(array)
          })
        }
      })()
    }
  }, [])

  return (
    <>
      <Header />
      <Container maxWidth="lg" className={styles.flex}>
        <ProfilePage user={user} favorites={favorites} />
      </Container>
    </>
  )
}

export default Profile
