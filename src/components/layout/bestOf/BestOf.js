import React, { useState, useEffect, useContext } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import BestOfTable from './BestOfTable'
import { getTopTen } from '../../../helpers/helpers'
import Grid from '@material-ui/core/Grid'
import { MovieContext } from '../../contexts/MovieContext'
import Heading from '../sectionHeading/Heading'
import Spinner from '../../spinner/Spinner'


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto'
  },
  movieLink: {
    color: '#2bbdbd'
  },
  genre: {
    color: '#ffffff',
    background: '#2bbdbd'
  },
  hover: {
    '& :hover': {
      cursor: 'pointer',
      background: '#f7f7f7'
    }
  }
}))

export default function BestOf() {
  const classes = useStyles()

  const movieContext = useContext(MovieContext)
  const { getMovie } = movieContext

  const [topHorror, setTopHorror] = useState([])
  const [topKids, setTopKids] = useState([])
  const [topAction, setTopAction] = useState([])
  const [topComedy, setTopComedy] = useState([])
  const [topSciFi, setTopSciFi] = useState([])
  const [topDrama, setTopDrama] = useState([])
  const [loading, setLoading] = useState(true)

  const year = new Date().getFullYear() -1

  useEffect(() => {
    getTopHorror()
    getTopKids()
    getTopDrama()
    getTopSciFi()
    getTopAction()
    getTopComedy()
    setLoading(false)
  }, [])

  const getTopHorror = async () => {
    const slice = await getTopTen(27)
    setTopHorror(slice)
  }

  const getTopKids = async () => {
    const slice = await getTopTen(16)
    setTopKids(slice)
  }

  const getTopAction = async () => {
    const slice = await getTopTen(28)
    setTopAction(slice)
  }

  const getTopComedy = async () => {
    const slice = await getTopTen(35)
    setTopComedy(slice)
  }

  const getTopSciFi = async () => {
    const slice = await getTopTen(878)
    setTopSciFi(slice)
  }

  const getTopDrama = async () => {
    const slice = await getTopTen(18)
    setTopDrama(slice)
  }

  const handleClick = getMovie

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

  const tables = (
    <Grid container spacing={3}>
      <BestOfTable
        classes={classes}
        rows={topDrama}
        genre="Drama"
        handleClick={handleClick}
      />
      <BestOfTable
        classes={classes}
        rows={topAction}
        genre="Action"
        handleClick={handleClick}
      />
      <BestOfTable
        classes={classes}
        rows={topSciFi}
        genre="SciFi"
        handleClick={handleClick}
      />
      <BestOfTable
        classes={classes}
        rows={topComedy}
        genre="Comedy"
        handleClick={handleClick}
      />
      <BestOfTable
        classes={classes}
        rows={topHorror}
        genre="Horror"
        handleClick={handleClick}
      />
      <BestOfTable
        classes={classes}
        rows={topKids}
        genre="Kids"
        handleClick={handleClick}
      />
    </Grid>
  )

  return (
    <section id='Best' 
      style={{
        marginBottom: '5rem'
      }}>
      <Heading>
        <h2>Best Movies of {year}</h2>
      </Heading>
      {loading ? (spinner) : (tables)}      
    </section>
  )
}


