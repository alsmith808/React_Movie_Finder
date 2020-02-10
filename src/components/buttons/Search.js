import React from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { red } from '@material-ui/core/colors'

const ColorButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[600]
    }
  }
}))(Button)

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  }
}))

export default function Search() {
  const classes = useStyles()

  return (
    <div>
      <ColorButton
        variant="contained"
        color="primary"
        type="submit"
        className={classes.margin}
      >
        Search
      </ColorButton>
    </div>
  )
}
