import React from 'react'

import SearchBox from './SearchBox'
import styles from './SearchArea.module.css'


const SearchArea = () => {
  return (
    <div
      className={styles.SearchArea}
    >
      <SearchBox />
    </div>
  )
}

export default SearchArea
