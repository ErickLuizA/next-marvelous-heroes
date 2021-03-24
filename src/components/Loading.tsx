import React from 'react'
import { Box, CircularProgress } from '@material-ui/core'

export default function Loading(): JSX.Element {
  return (
    <Box
      style={{
        width: '100%',
        height: '100%',
        display: 'grid',
        placeItems: 'center'
      }}
    >
      <CircularProgress />
    </Box>
  )
}
