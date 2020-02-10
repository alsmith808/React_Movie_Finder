import React from 'react'
import styles from './Discog.module.css'

export default function Discog({ credits, index }) { 

  const creditsList = credits.map((movie, i) => (
    <li key={i} 
        >
      {credits[index][i]}
    </li>
  ))

  return (
    <ul className={styles.Discog}>
      {creditsList}
    </ul>
  )
}