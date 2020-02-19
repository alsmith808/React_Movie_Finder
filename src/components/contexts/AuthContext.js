import React, { useState, useEffect, createContext } from 'react'

const key = `${process.env.REACT_APP_MOVIE_API_KEY}`

const AuthContext = createContext()

const AuthProvider = props => {
  const [showFavSect, setShowFavSect] = useState(false)
  const [sessionCreated, setSessionCreated] = useState(false)
  const [tknApproved, setTknApproved] = useState(false)
  const [tknVal, setTknVal] = useState('')
  const [sessId, setSessId] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [loading, setLoading] = useState(false)
  const [watchLater, setWatchLater] = useState([])
  const [userID, setUserID] = useState([])

  // on app mount check url for an approved token
  useEffect(() => {
    checkIfToken()   
  }, [])


  // Create a session after redirect from TMDB
  useEffect(() => {
    if (tknApproved !== false) {           
      createSession(tknVal)
    }
  }, [tknApproved])


//   useEffect(() => {
//     if (sessionCreated !== false) {
//       getWatchlist().then(setWatchLater)
//     }
//   }, [watchLater])


  const reqToken = async () => {
    // get a request token for approval
    try {
      setShowFavSect(true)
      const url = `https://api.themoviedb.org/3/authentication/token/new?api_key=${key}`
      const response = await fetch(url)
      const jsonResObj = await response.json()
      const token = jsonResObj.request_token
      setTknVal(token)     
      return token
    } catch (error) {
      console.error(error)
    }    
  }

  const checkIfToken = () => {
    // check url for a user approved token..T/F     
    const myUrl = window.location.href    
    const fullPath = new URL(myUrl)
    const searchParams = new URLSearchParams(fullPath.search)
    const token = searchParams.get('request_token')
    setTknVal(token)    
    if(searchParams.has('request_token')) {
      setShowFavSect(true) 
      setTknApproved(true)                   
    }
  }

  const createSession = async () => {
    // returns session object with session_id
    try {
      const url = `https://api.themoviedb.org/3/authentication/session/new?api_key=${key}`
      const sessionObj = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({
            "request_token": tknVal
          })
      })
      const jsonResObj = await sessionObj.json() 
      console.log(jsonResObj)     
      const session_id = jsonResObj.session_id 
      console.log(session_id)     
      setSessId(session_id)
      setSessionCreated(true)
    } catch (error) {
      console.error(error)
    }    
  }

  const getUserDetails = async () => {
    // returns user id needed for watchlist requests
    try {
      const url = `https://api.themoviedb.org/3/account?api_key=${key}&session_id=${sessId}`
      const response = await fetch(url)
      const jsonResObj = await response.json()     
      const userId = jsonResObj.id
      const userName = jsonResObj.username
      setUserID(userId)
      setDisplayName(userName)
      return userId      
    } catch (error) {
      console.error(error)
    }
  }

  const getWatchlist = async () => {
    // returns results array of movies to watchlater
    try {
      setLoading(true)
      const details = await getUserDetails()
      const userId = details.id
      const url = `https://api.themoviedb.org/3/account/${userId}/watchlist/movies?api_key=${key}&session_id=${sessId}&language=en-US&sort_by=created_at.asc&page=1`
      const response = await fetch(url)
      const jsonResObj = await response.json()
      const watchList = jsonResObj.results
      console.log(watchList)
      setWatchLater(watchList)
      setLoading(false)
      return watchList      
    } catch (error) {
      console.error(error)
    }
  }

  const addToWatchList = async (id, tf) => {
    // 
    try {
      const details = await getUserDetails()
      const userId = details.id
      const url = `https://api.themoviedb.org/3/account/${userId}/watchlist?api_key=${key}&session_id=${sessId}`
      const movieToWatch = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({
            "media_type": "movie",
            "media_id": id,
            "watchlist": tf
          })
      })
    } catch (error) {
      console.error(error)
    }    
  }


  return (
    <AuthContext.Provider
      value={{
        reqToken,
        tknVal,
        sessionCreated,
        getWatchlist,
        addToWatchList,
        displayName,
        loading,
        watchLater,
        userID,
        showFavSect
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthProvider, AuthContext }
