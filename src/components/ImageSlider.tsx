// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  makeStyles
} from '@material-ui/core'

export type Character = {
  id?: number
  name: string
  description: string
  thumbnail: { path: string; extension: string }
  comics: { available: number; collectionURI: string }
}

const useStyles = makeStyles(theme => ({
  card: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0,
    transition: 'opacity 1.8s ease'
  },

  img: {
    width: '100%',
    height: '80%',
    objectFit: 'fill'
  },

  content: { paddingTop: '1px', paddingBottom: '5px' }
}))

const ImageSlider: React.FC<Character> = ({
  name,
  thumbnail,
  description,
  comics
}) => {
  const [currentId, setCurrentId] = useState(0)

  useEffect(() => {
    const cards = document.querySelectorAll('.MuiCard-root')
    const length = cards.length

    const interval = setInterval(() => {
      if (currentId !== 0) {
        cards[currentId - 1].classList.remove('selected')
      }

      if (currentId === length) {
        setCurrentId(0)
        cards[0].classList.add('selected')
      } else {
        cards[currentId].classList.add('selected')
      }

      setCurrentId(state => state + 1)
    }, 2000)

    return () => clearInterval(interval)
  }, [currentId])

  const styles = useStyles()

  return (
    <Card className={styles.card}>
      <CardMedia
        component="img"
        alt={name}
        className={styles.img}
        image={thumbnail.path + '/landscape_incredible.' + thumbnail.extension}
      />
      <CardContent className={styles.content}>
        <Typography>{name}</Typography>
        <Typography>
          {description.length > 130
            ? `${description.slice(0, 130)}...`
            : description}
        </Typography>
        <Typography> Comics: {comics.available} </Typography>
      </CardContent>
    </Card>
  )
}

export default ImageSlider
