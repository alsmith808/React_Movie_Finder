import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  copyright: {
    background: '#4dca19',
    color: '#cecbca',
    marginTop: '1rem',
    padding: '1rem'
  }
})

const currentYear = new Date().getFullYear()

export default function Footer() {
  const classes = useStyles()

  return (      
    <Typography variant="h6" component="h6" align='center' className={classes.copyright}>
      {`© ${currentYear} Copyright Flikz`}
    </Typography>
  )
}


