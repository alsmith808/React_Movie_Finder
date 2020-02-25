import React, { useState, useEffect, createContext } from 'react'

import Scroll from "react-scroll"

let { scroller } = Scroll

const MovieContext = createContext()

const MovieProvider = props => {
  
  const [movieDetails, setMovieDetails] = useState({})
  const [cast, setCast] = useState([])
  const [searched, setSearched] = useState(false)
  const [discogs, setDiscogs] = useState([])
  const [loading, setLoading] = useState(false)
  const [showCast, setShowCast] = useState(false)
  const [showMovieDetails, setShowMovieDetails] = useState(false)

  const key = `${process.env.REACT_APP_MOVIE_API_KEY}`

  useEffect(() => {
    compileDiscogs()    
  }, [cast])


  useEffect(() => {    
    showCast ? scrollToSection('Cast') : scrollToSection('Movie')        
  }, [showCast])


  const getMovie = async id => {
    setShowCast(false)
    setSearched(true)  
    setLoading(true)
    setShowMovieDetails(true) 
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${key}&append_to_response=credits,images,reviews,similar`
    const response = await fetch(url)
    const movie = await response.json()
    setMovieDetails(movie)
    setLoading(false)
    scrollToSection('Movie')
    getCast(movie)
  }

  const getCast = movie => {
    const castCrew = movie.credits 
    const actors = castCrew.cast  
    setCast(actors.slice(0, 8))    
  }

  const toggleCast = () => setShowCast(!showCast)

  const getDiscog = async id => {
    const url = `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${key}&language=en-US`
    const response = await fetch(url)
    const movieDiscog = await response.json()
    const history = { ...movieDiscog }
    const movies = history.cast.slice(0, 10)
    const movieList = []
    movies.forEach(movie => {
      movieList.push(movie.title)
    })
    return movieList
  }

  const compileDiscogs = async () => {
    const idArray = []
    cast.forEach(actor => {
      idArray.push(actor.id)
    })
    const discogArray = []
    for (const id of idArray) {
      let discogElement = await getDiscog(id)
      // Remove current movie from discogs list
      let currentMovie = movieDetails.title
      const filteredMovies = discogElement.filter(movie => movie !== currentMovie)     
      discogArray.push(filteredMovies)
    }
    setDiscogs(discogArray)       
  }

  const scrollToSection = section => {
    scroller.scrollTo(section, {
      duration: 1200,
      smooth: 'easeInQuad',
      offset: -50
    })
  }

  return (
    <MovieContext.Provider
      value={{
        movieDetails,
        getMovie,
        getDiscog,
        searched,
        cast,
        discogs,
        loading,
        showCast,
        toggleCast,
        showMovieDetails
      }}
    >
      {props.children}
    </MovieContext.Provider>
  )
}

export { MovieProvider, MovieContext }
