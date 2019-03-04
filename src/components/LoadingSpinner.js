import React from 'react'
import { Pane, Spinner } from 'evergreen-ui'

const LoadingSpinner = () =>
  <Pane display="flex" alignItems="center" justifyContent="center" height={400}>
    <Spinner />
  </Pane>

export default LoadingSpinner
