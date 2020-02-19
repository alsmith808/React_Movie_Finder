import React, { useContext, useEffect, Fragment } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import Grid from '@material-ui/core/Grid'
import { MovieContext } from '../../contexts/MovieContext'
import { AuthContext } from '../../contexts/AuthContext'
import Spinner from '../../spinner/Spinner'
import styles from './WatchList.module.css'
import Heading from '../sectionHeading/Heading'
import Button from '@material-ui/core/Button'
import WatchItem from './WatchItem'

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

function WatchList() {
  const classes = useStyles()

  const movieContext = useContext(MovieContext)
  const { getMovie } = movieContext

  const authContext = useContext(AuthContext)
  const { tknVal, sessionCreated, getWatchlist, addToWatchList, 
    displayName, watchLater, loading, userID, showFavSect } = authContext


  const spinner = (
    <div style={{
      display: 'flex',
      minHeight: '6rem',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Spinner size={40} loading={loading} />
    </div>
  )

  return (
    <section className={styles.watchlist} id='Watchlist'>
      {showFavSect && (
    <Fragment>
      <Heading>
        <h2>My WatchList</h2>
      </Heading>
      {!sessionCreated && (<Button variant="contained" color="primary"><a href={`https://www.themoviedb.org/authenticate/${tknVal}?redirect_to=http://www.flikz.greenshell.ie/`}>VALIDATE</a></Button>)}      
      {sessionCreated && (<h3>Welcome {displayName}!</h3>)}
      {sessionCreated && (<Button onClick={getWatchlist} variant="contained" color="primary">View Watchlist</Button>)}        
      {loading ? (spinner) : (
        <Grid container spacing={2}>         
          <List className={classes.root}>
            {watchLater.map(movie => {
              let img = `https://image.tmdb.org/t/p/w200${movie.poster_path}`
              return (
                <Grid item xs={12} sm={12} md={12} lg={10} key={movie.id} >
                  <WatchItem                  
                    title={movie.title}
                    release={movie.release_date}
                    avatar={img}
                    id={movie.id}
                    removeMovie={addToWatchList}
                  />
                </Grid>
              )
            })}
          </List>                
        </Grid>
      )}
        </Fragment>
      )}
          
    </section>
  )
}

export default WatchList
