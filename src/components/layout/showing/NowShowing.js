import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import MovieCard from './MovieCard'
import Heading from '../sectionHeading/Heading'
import Spinner from '../../spinner/Spinner'


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: '2rem',
    marginBottom: '4rem'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}))

export default function NowShowing() {
  const classes = useStyles()

  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getShowing()    
  }, [])

  const key = `${process.env.REACT_APP_MOVIE_API_KEY}`
  const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US&page=1`
  const limit = 12

  const getShowing = async () => {
    const response = await fetch(url)
    const data = await response.json()
    const slice = data.results.slice(0, limit)
    setMovies(slice)
    setLoading(false)
  }

  const spinner = (
    <div style={{
      display: 'flex',
      minHeight: '20rem',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Spinner size={60}/>
    </div>
  )

  const nowShowing = movies.map(movie => (   
    <Grid item xs={12} sm={6} md={4} lg={4} key={movie.id}>
      <MovieCard
        title={movie.title}
        image={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
        id={movie.id}
      />
    </Grid>
  ))

  return (
    <section className={classes.root} id='Showing'>
      <Heading>
        <h2>Now Showing in Theatres..</h2>
      </Heading>
      {loading ? (spinner) : 
      (<Grid container spacing={3}>
        {nowShowing}
      </Grid>)}
    </section>
  )
}
