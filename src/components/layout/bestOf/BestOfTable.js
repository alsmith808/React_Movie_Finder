import React from 'react'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

const BestOfTable = ({ rows, classes, genre, handleClick }) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={4}>
      <Paper className={classes.root}>
        <Table>
          <TableHead>
            <TableRow className={classes.genre}>
              <TableCell className={classes.genre}>{genre}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id} className={classes.hover}>               
                <TableCell
                  component="th"
                  scope="row"
                  onClick={() =>  handleClick(row.id)}
                  id={row.id}
                  className={classes.movieLink}
                >
                  {row.title}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Grid>
  )
}

export default BestOfTable
