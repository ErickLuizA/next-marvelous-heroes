// eslint-disable-next-line no-use-before-define
import React, { useContext } from 'react'
import { Container, makeStyles } from '@material-ui/core'
import Header from '../components/Header'
import { AuthContext } from '../contexts/AuthContext'
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
  const { user } = useContext(AuthContext)

  const styles = useStyles()

  return (
    <>
      <Header />
      <Container maxWidth="lg" className={styles.flex}>
        <ProfilePage user={user} />
      </Container>
    </>
  )
}

export default Profile
