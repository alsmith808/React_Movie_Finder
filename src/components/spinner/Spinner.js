import React from 'react'

import { FlapperSpinner } from 'react-spinners-kit'

const Spinner = ({ size, loading }) => {
  return (
    <FlapperSpinner
      size={size}
      color='#fd3434'
      loading={loading}
    />
  )
}

export default Spinner
    
