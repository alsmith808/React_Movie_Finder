import React, { useContext, Fragment } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import Search from '../../buttons/Search'
import { SearchContext } from '../../contexts/SearchContext'

const useStyles = makeStyles(theme => ({
  well: {
    display: 'flex',
    flexWrap: 'wrap',
    height: '70vh',
    alignItems: 'center'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    height: '30vh',
    alignItems: 'center',
    background: '#f1eff0',
    opacity: '0.9',
    justifyContent: 'center',
    borderRadius: '4px',
    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
  },
  alert: {
    color: 'grey',
    display: 'block',
    flexWrap: 'wrap',
    justify: 'center'
  }
}))

export default function SearchBox(props) {
  const classes = useStyles()

  const searchContext = useContext(SearchContext)

  const {
    searchTerm,
    handleChange,
    handleSubmit,
    blank
  } = searchContext

  
  return (
    <Fragment>
      <Container>
        <div className={classes.well}>
          <form
            className={classes.container}
            noValidate
            autoComplete='off'
            onSubmit={handleSubmit}
          >
            <TextField
              id='searched'
              label='Search'
              value={searchTerm}
              style={{ margin: 8 }}
              placeholder='Search for movie...'
              fullWidth
              onChange={handleChange}
              margin='normal'
              InputLabelProps={{
                shrink: true
              }}
            />
            {blank ? (<div className={classes.alert}>
              <h4>Invalid search term entered! Please try again.</h4>
            </div>) : (<Search />)}                                              
          </form>          
        </div>
      </Container>
    </Fragment>
  )
}
