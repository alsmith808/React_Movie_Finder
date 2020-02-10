import React, { useContext, useEffect, useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import DateRangeIcon from '@material-ui/icons/DateRange'
import VideocamIcon from '@material-ui/icons/Videocam'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'
import ScheduleIcon from '@material-ui/icons/Schedule'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import { MovieContext } from '../../contexts/MovieContext'
import styles from './Movie.module.css'
import popcorn from './poster_ph.jpeg'
import Spinner from '../../spinner/Spinner'
import Scroll from "react-scroll"

let { Element } = Scroll

const useStyles = makeStyles({
  movieSection: {
    marginTop: '2rem',
    marginBottom: '5rem',
    display: 'flex',
    alignItems: 'stretch'
  },
  movieImage: {
    marginBottom: '2rem'
  },
  card: {
    minWidth: 275
  },
  titleArea: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1rem'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  movieStats: {
    marginBottom: 4,
    display: 'flex',
    justify: 'center',
    alignItems: 'center'
  },
  stat: {
    marginLeft: 6,
    minWidth: '8rem'
  },
  green: {
    color: '#4dca19'
  },
  blue: {
    color: '#3baef1'
  },
  navy: {
    color: '#407eb3'
  },
  caption: {
    display: 'flex',
    borderLeft: '2px solid #3baef1',
    paddingLeft: '1rem',
    alignItems: 'center',
    marginBottom: 4
  },
  button: {
    background: '#3baef1',
    color: 'white',
    '&:hover': {
      background: '#098fdc'
    }
  }
})

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export default function Movie() {
  const classes = useStyles()
  const movieContext = useContext(MovieContext)
  const { movieDetails, searched, loading, toggleCast, showMovieDetails, showCast } = movieContext
  const [director, setDirector] = useState('')
  const [genre, setGenre] = useState('')
  const [revenue, setRevenue] = useState(0)
  const [poster, setPoster] = useState(popcorn)
  

  useEffect(() => {
    const castCrew = { ...movieDetails.credits }
    const crew = castCrew.crew
    if (searched === true) {
      const dirName = crew.find(({ department }) => department === 'Directing')
      dirName ? setDirector(dirName.name) : setDirector('Not Listed')
      makeGenres()
      const earned = movieDetails.revenue
      setRevenue(numberWithCommas(earned))
      makePoster()
    }
  }, [movieDetails])

  const taggedArea = (
    <div className={classes.caption}>
      <Typography variant='body2' color='textSecondary' gutterBottom>
        {movieDetails.tagline}
      </Typography>
    </div>
  )

  const spinner = (
    <div style={{
      display: 'flex',
      minHeight: '30rem',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Spinner size={80} loading={loading} />
    </div>
  )
 
  let section = (
    <section className={classes.movieSection} id='Movie'>
      <Grid container>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <img
            className={classes.movieImage} 
            src={poster} 
            alt={movieDetails.title} />
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={8}>
          <Element name='Movie'>
            <Card className={classes.card}>
              <CardContent>
                <div className={classes.titleArea}>
                  <Typography 
                    variant='h5'
                    className={classes.navy} 
                    gutterBottom>
                    {movieDetails.title}
                  </Typography>
                  <Typography
                    variant='subtitle1'
                    className={classes.blue}
                    gutterBottom
                  >
                    {movieDetails.vote_average * 10}%
                  </Typography>
                </div>
                {movieDetails.tagline !== '' ?  taggedArea : null}

                <Divider light variant='middle' />
                <div className={styles.Desc}>
                  <Typography
                    variant='body1'
                    className={styles.MovieDesc}
                    gutterBottom
                  >
                    {movieDetails.overview}
                  </Typography>
                </div>
                <div className={classes.movieStats}>
                  <span>
                    <DateRangeIcon className={classes.green} />
                  </span>
                  <span className={classes.stat}>
                    <Typography display='inline'>Released:</Typography>
                  </span>
                  <span className={classes.stat}>
                    <Typography display='inline' color='textSecondary'>
                      {movieDetails.release_date}
                    </Typography>
                  </span>
                </div>
                <div className={classes.movieStats}>
                  <span>
                    <VideocamIcon className={classes.green} />
                  </span>
                  <span className={classes.stat}>
                    <Typography display='inline'>Director:</Typography>
                  </span>
                  <span className={classes.stat}>
                    <Typography display='inline' color='textSecondary'>
                      {director}
                    </Typography>
                  </span>
                </div>
                <div className={classes.movieStats}>
                  <span>
                    <HelpOutlineIcon className={classes.green} />
                  </span>
                  <span className={classes.stat}>
                    <Typography display='inline'>Genre:</Typography>
                  </span>
                  <span className={classes.stat}>
                    <Typography display='inline' color='textSecondary'>
                      {genre}
                    </Typography>
                  </span>
                </div>
                <div className={classes.movieStats}>
                  <span>
                    <ScheduleIcon className={classes.green} />
                  </span>
                  <span className={classes.stat}>
                    <Typography display='inline'>Runtime:</Typography>
                  </span>
                  <span className={classes.stat}>
                    <Typography display='inline' color='textSecondary'>
                      {movieDetails.runtime} minutes
                    </Typography>
                  </span>
                </div>
                <div className={classes.movieStats}>
                  <span>
                    <AttachMoneyIcon className={classes.green} />
                  </span>
                  <span className={classes.stat}>
                    <Typography display='inline'>Boxoffice:</Typography>
                  </span>
                  <span className={classes.stat}>
                    <Typography display='inline' color='textSecondary'>
                      ${revenue}
                    </Typography>
                  </span>
                </div>
              </CardContent>
              <CardActions>
                <Button 
                  variant='contained'
                  onClick={toggleCast} 
                  className={classes.button}>
                  {showCast ? 'Hide' : 'Cast'}
                </Button>
              </CardActions>
            </Card>
          </Element>
        </Grid>
      </Grid>
    </section>
  )

  if (!showMovieDetails) {
    section = null
  }

  return (
    loading ? (spinner) : (section)
  )

  function makeGenres() {
    const genres = { ...movieDetails.genres }
      if (JSON.stringify(genres) === '{}') {
        setGenre('Not Listed')
      } else {
        const genreName = genres[0]['name']
        setGenre(genreName)
      }
  }

  function makePoster() {
    if (movieDetails.poster_path === null) {
      setPoster(popcorn)
    } else {
      const posterPath = movieDetails.poster_path
      setPoster(`https://image.tmdb.org/t/p/w300${posterPath}`)
    }
  }
}



