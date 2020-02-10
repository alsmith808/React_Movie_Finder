import React, { useEffect, useContext } from 'react'
import Grid from '@material-ui/core/Grid'
import Flippy, { FrontSide, BackSide } from 'react-flippy'
import { MovieContext } from '../../contexts/MovieContext'
import styles from './Cast.module.css'
import Discog from './discogList/Discog'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
import noApiImage from './actor_ph.jpeg'
import Scroll from "react-scroll"

let { Element } = Scroll

export default function Cast() {

const movieContext = useContext(MovieContext)
const { cast, discogs, movieDetails, showCast } = movieContext

useEffect(() => {
}, [movieDetails])

  const castMembers = cast.map((actor, i) => (
       
    <Grid item xs={12} sm={4} md={4} lg={3} key={actor.id} className={styles.Card}>
      <Flippy
        flipOnHover={false} // default false
        flipOnClick={true} // default false
        flipDirection="horizontal" // horizontal or vertical
        
        // ref={(r) => this.flippy = r} to use toggle method like this.flippy.toggle()
        // if you pass isFlipped prop component will be controlled component.
        // and other props, which will go to div         
      >
        <FrontSide
          style={{
            backgroundColor: 'white',
            padding: 0
          }}
        >
          <div className={styles.Actor}>
            <div className={styles.Actorimage}>
              {actor.profile_path ? (<img src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`} alt={actor.character} />) 
              : (<img src={noApiImage} alt={actor.character} />) }                                          
            </div>
            <div className={styles.Actorname}>             
              <span>{actor.character}</span>
              <InfoOutlinedIcon className={styles.blink} />             
            </div>
            <p>{actor.name}</p>
          </div>          
        </FrontSide>
        <BackSide
          style={{ 
            backgroundColor: 'white',
            padding: 0,
            height: '400px',
            display: 'flex',
            flexDirection: 'column'}}>
            <h5 style={{
              display: 'flex',
              alignSelf: 'center',
              color: '#3c4444',
              marginTop: '1rem',
              borderBottom: '2px solid #bbb6b6',
              marginBottom: 0,
            }}>
              {actor.name}
            </h5>
            <Discog 
              className={styles.Discog}
              credits={discogs}
              index = {i} 
            />                   
        </BackSide>
      </Flippy>
    </Grid>
  ))

  return (
    <Element name='Cast'>
      <section className='cast-section' id='Cast'>
        <Grid container spacing={6}>
          {showCast && castMembers}
        </Grid>
      </section>
    </Element>
  )
}

