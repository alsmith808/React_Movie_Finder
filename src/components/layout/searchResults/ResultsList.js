import React, { useEffect, useContext } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import Grid from '@material-ui/core/Grid'
import ResultsItem from './ResultsItem'
import { SearchContext } from '../../contexts/SearchContext'
import { MovieContext } from '../../contexts/MovieContext'
import Spinner from '../../spinner/Spinner'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    marginTop: '1rem',
    justify: 'center'   
  },
  inline: {
    display: 'inline'
  }
}))

export default function ResultsList() {
  const classes = useStyles()

  const searchContext = useContext(SearchContext)
  const movieContext = useContext(MovieContext)
  const { movies, loading, query, getMovies, showSearchResults } = searchContext
  const { getMovie } = movieContext
  

  useEffect(() => {
    getMovies(query)
  }, [query])

  const spinner = (
    <div style={{
      display: 'flex',
      minHeight: '20rem',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Spinner size={60} loading={loading} />
    </div>
  )

  return ( showSearchResults &&   
    <section className='results-section' id='Results' style={{      
      marginTop: '2rem',
      marginBottom: '6rem'
    }}>
      {loading ? (spinner) : (
        <Grid container spacing={2}>         
          <List className={classes.root}>
            {movies.map(movie => {
              let img = `https://image.tmdb.org/t/p/w200${movie.poster_path}`
              return (
                <Grid item xs={12} sm={12} md={12} lg={10} key={movie.id} >
                  <ResultsItem                  
                    title={movie.title}
                    release={movie.release_date}
                    avatar={img}
                    id={movie.id}
                    getMovie={getMovie}
                  />
                </Grid>
              )
            })}
          </List>                
        </Grid>
      )}      
    </section>
  )
}