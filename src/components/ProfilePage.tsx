// eslint-disable-next-line no-use-before-define
import React from 'react'
import { Avatar, Box, makeStyles, Typography } from '@material-ui/core'

interface User {
  displayName: string
  photoURL: string
}

interface IProfile {
  user: User
}

const useStyles = makeStyles(theme => ({
  avatarBox: {
    width: '50%',
    margin: 'auto',
    [theme.breakpoints.up('md')]: {
      width: '35%'
    }
  },

  cardBox: {
    width: '50%',
    margin: 'auto',
    [theme.breakpoints.up('md')]: {
      width: '65%'
    }
  }
}))

const ProfilePage: React.FC<IProfile> = ({ user }) => {
  const styles = useStyles()

  return (
    <>
      <Box className={styles.avatarBox}>
        <Avatar
          alt={user?.displayName}
          src={user?.photoURL}
          style={{
            width: '70%',
            height: '70%',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: '3em'
          }}
        />
        <Typography variant="h4" style={{ textAlign: 'center' }}>
          {user?.displayName}
        </Typography>
      </Box>
      <Box className={styles.cardBox}>
        <h1>Hello World</h1>
      </Box>
    </>
  )
}

export default ProfilePage
