import { useContext, useEffect, useState } from 'react'
import { Container, makeStyles } from '@material-ui/core'

import { db } from '../config/firebase'
import { AuthContext } from '../contexts/AuthContext'

import useFetch from '../hooks/useFetch'

import Header from '../components/Header'
import ProfilePage from '../components/ProfilePage'

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
        const docRef = db().collection('Favorites').doc(user?.uid)
        const snapshot = await docRef.get()

        if (snapshot.exists) {
          try {
            const response: any = await useFetch(snapshot.data().characters)

            const array = []

            response.forEach(res => array.push(res.data.results[0]))

            setFavorites(array)
          } catch (e) {
            alert('Error in trying to load favorites')
          }
        }
      })()
    }
  }, [loading])

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
