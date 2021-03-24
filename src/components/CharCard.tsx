import { useContext, useEffect, useState } from 'react'
import {
  Button,
  Card,
  CardMedia,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Typography
} from '@material-ui/core'

import { Character } from './ImageSlider'
import { db } from '../config/firebase'
import { AuthContext } from '../contexts/AuthContext'

const useStyles = makeStyles(theme => ({
  card: {
    width: '50%',
    height: '50%',
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
      margin: 'auto',
      width: '80%',
      height: '60%'
    }
  },

  list: {
    width: '80%',
    margin: 'auto',
    [theme.breakpoints.up('md')]: {
      width: '50%'
    }
  }
}))

const CharCard: React.FC<Character> = ({
  name,
  thumbnail,
  comics,
  description,
  id
}) => {
  const [favorite, setFavorite] = useState(false)

  const { user } = useContext(AuthContext)

  const styles = useStyles()

  const docRef = db().collection('Favorites').doc(user?.uid)

  useEffect(() => {
    ;(async () => {
      const snapshot = await docRef.get()

      if (snapshot.exists) {
        const charactersArray: number[] = snapshot.data().characters

        const exist = charactersArray.find(chaId => chaId === id)

        if (!exist) {
          setFavorite(false)
        } else {
          setFavorite(true)
        }
      } else {
        db().collection('Favorites').doc(user?.uid).set({
          characters: []
        })
      }
    })()
  }, [])

  async function handleFavorite() {
    setFavorite(state => !state)

    const snapshot = await docRef.get()

    const charactersArray: number[] = snapshot.data().characters

    if (!favorite) {
      charactersArray.push(id)

      snapshot.ref.update({
        characters: charactersArray
      })
    } else {
      const exist = charactersArray.find(a => a === id)

      if (exist) {
        snapshot.ref.update({
          characters: charactersArray.filter(a => a !== id)
        })
      }
    }
  }

  return (
    <>
      <Card className={styles.card}>
        <CardMedia
          alt={name}
          image={thumbnail.path + '.' + thumbnail.extension}
          component="img"
        />
      </Card>
      <List className={styles.list}>
        <ListItem divider>
          <Typography variant="h4">{name}</Typography>
        </ListItem>
        <ListItem divider>
          <ListItemText
            primary={description || "This character don't need description"}
          />
        </ListItem>
        <ListItem divider>
          <ListItemText
            primary={
              comics
                ? 'Comics: ' + comics.available
                : 'There are no comics available for this character'
            }
          />
        </ListItem>
        <ListItem>
          {favorite ? (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleFavorite}
            >
              Unfavorite
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleFavorite}
            >
              Favorite
            </Button>
          )}
        </ListItem>
      </List>
    </>
  )
}

export default CharCard
