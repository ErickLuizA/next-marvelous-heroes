// eslint-disable-next-line no-use-before-define
import React, { useContext, useEffect, useState } from 'react'
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

  useEffect(() => {
    ;(async () => {
      const docRef = db()
        .collection('Favorites')
        .where('userId', '==', user?.uid)

      await docRef.get().then(snapshot => {
        snapshot.forEach(snap => {
          const charactersArray = snap.data().Characters

          const exist = charactersArray.find(cha => cha === id)

          console.log(charactersArray.find(cha => cha === id))

          if (!exist) {
            setFavorite(false)
          } else {
            setFavorite(true)
          }
        })
      })
    })()
  }, [favorite])

  async function handleFavorite() {
    setFavorite(state => !state)
    const docRef = db().collection('Favorites').where('userId', '==', user.uid)

    console.log('docRef', docRef)
    if (!favorite) {
      await docRef.get().then(snapshot => {
        console.log('after snapshot', snapshot)
        snapshot.forEach(async snap => {
          console.log('after snap')
          if (snap.data().Characters > 0) {
            const array = snap.data().Characters
            array.push(id)
            snap.ref.update({
              Characters: array
            })
            console.log('after update')
          } else {
            await db()
              .collection('Favorites')
              .add({
                Characters: [id],
                userId: user?.uid
              })
            console.log('after add first time')
          }
        })
      })
    } else {
      await docRef.get().then(snapshot => {
        snapshot.forEach(async snap => {
          const array = snap.data().Characters
          const exist = array.filter(a => a === id)
          if (exist) {
            await snap.ref.delete()
            console.log('after delete')
          }
        })
      })
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
