import React from 'react'
import { Container } from '@mui/material'


const ContainerComponent = ({ children }) => {
  return (
    <Container maxWidth="xl" className="">
      {children}
    </Container>

  )
}

export default ContainerComponent
