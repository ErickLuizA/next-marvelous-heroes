import {
  Avatar,
  Box,
  CardMedia,
  List,
  makeStyles,
  Typography
} from '@material-ui/core'
import { useRouter } from 'next/router'

import { Character } from './ImageSlider'

interface User {
  displayName: string
  photoURL: string
}

interface IProfile {
  user: User
  favorites: Character[]
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
  },

  align: {
    textAlign: 'center',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      textAlign: 'start'
    }
  }
}))

const ProfilePage: React.FC<IProfile> = ({ user, favorites }) => {
  const styles = useStyles()

  const router = useRouter()

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
        <Typography variant="h5" className={styles.align}>
          Favorite Characters
        </Typography>
        <List
          style={{
            display: 'flex',
            gap: '1em',
            flexWrap: 'wrap'
          }}
        >
          {favorites.length > 0 ? (
            favorites.map(fav => (
              <CardMedia
                onClick={async () => {
                  await router.push(`/characters/${fav.id}`)
                }}
                key={fav.id}
                component="img"
                alt={fav.name}
                style={{ width: '30%', height: '30%' }}
                image={fav.thumbnail.path + '.' + fav.thumbnail.extension}
              />
            ))
          ) : (
            <p className={styles.align}>No favorites to display</p>
          )}
        </List>
      </Box>
    </>
  )
}

export default ProfilePage
