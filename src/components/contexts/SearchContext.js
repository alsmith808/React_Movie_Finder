import React, { useState, useEffect, createContext } from 'react'

import { animateScroll as scroll } from 'react-scroll'

const SearchContext = createContext()

const SearchProvider = props => {
  const [searchTerm, setSearchTerm] = useState('')
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [blank, setBlank] = useState(false)
  const [showSearchResults, setShowSearchResults] = useState(false)

  // movies array argument watches for a change to searched movies state
  // scroll down to search results when movies state changes/successfull search
  useEffect(() => {
    setShowSearchResults(true)
    if (movies !== []) {
      scroll.scrollMore(400)     
    }
  }, [movies])

  useEffect(() => {
    setBlank(false)
  }, [])

  // Return 5 movies to the user on search
  const url = 'https://api.themoviedb.org/3/search/movie?'
  const key = `${process.env.REACT_APP_MOVIE_API_KEY}`
  const limit = 5

  const getMovies = async query => {
    if (query && query.trim().length) { // check to ensure search field not blank
      setLoading(true)
      const response = await fetch(`${url}api_key=${key}&query=${query}`)
      const data = await response.json()
      const moviesSlice = data.results.slice(0, limit)
      setMovies(moviesSlice)
      console.log(moviesSlice)     
      setLoading(false)      
    }
    else {
      setLoading(false)
      setBlank(true)       
      setTimeout(() => setBlank(false), 2000)
    }
  }

  const handleChange = e => {
    setSearchTerm(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    setQuery(searchTerm)
    setSearchTerm('')
  }

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        query,
        movies,
        getMovies,
        handleChange,
        handleSubmit,
        loading,
        blank,
        showSearchResults
      }}
    >
      {props.children}
    </SearchContext.Provider>
  )
}

export { SearchProvider, SearchContext }
