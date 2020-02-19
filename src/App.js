import React, { Fragment } from 'react'

import './App.css'
import {  BrowserRouter as Router, Route } from 'react-router-dom'
import SearchArea from './components/layout/searchArea/SearchArea'
import Footer from './components/layout/footer/Footer'
import ResultsList from './components/layout/searchResults/ResultsList'
import NowShowing from './components/layout/showing/NowShowing'
import Upcoming from './components/layout/upcoming/Upcoming'
import Container from '@material-ui/core/Container'
import BestOf from './components/layout/bestOf/BestOf'
import Movie from './components/layout/movieDetails/Movie'
import Cast from './components/layout/movieDetails/Cast'
import { SearchProvider } from './components/contexts/SearchContext'
import { MovieProvider } from './components/contexts/MovieContext'
import { AuthProvider } from './components/contexts/AuthContext'
import PersistentDrawerLeft from './components/layout/drawer/Drawer'
import WatchList from './components/layout/watchList/WatchList'


function App(props) {    
  return (
    <Router>
      <AuthProvider>
        <SearchProvider>
          <Fragment>
            <MovieProvider>
              <PersistentDrawerLeft />
              <SearchArea />
                <Container>                                  
                  <ResultsList />            
                  <Movie />
                  <Cast />
                  <NowShowing />
                  <Upcoming />
                  <WatchList />
                  <BestOf />
                </Container>
              <Footer />
            </MovieProvider>
          </Fragment>
        </SearchProvider>
      </AuthProvider>
    </Router>
  )
}

export default App



