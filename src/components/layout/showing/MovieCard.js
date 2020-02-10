import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { MovieContext } from '../../contexts/MovieContext'
import blank from './blank.jpeg'


const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    position: 'relative'
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  overlay: {
    position: 'absolute',
    bottom: '0px',
    left: '0px',
    color: 'white'
  },
  orange: {
    color: 'orange',
    '& :hover': {
      backgroundColor: 'none'
    }
  }
})

export default function MovieCard({ title, image, id }) {
  const classes = useStyles()

  const movieContext = useContext(MovieContext)
  const { getMovie } = movieContext

  const setImage = url => {
    // Set movie backdrop manually in case where backdrop is null
    if (!url.includes('.jpg')) {
      return blank
    }
    return image
  }

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={title}
          height="140"
          image={setImage(image)}
          title={title}
          onClick={() => getMovie(id)}
        />
        <CardContent className={classes.overlay}>
          <Typography>{title}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" className={classes.orange} onClick={() => getMovie(id)}>
          Movie Details
        </Button>
      </CardActions>
    </Card>
  )
}
