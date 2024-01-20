import { Box } from '@mui/material'
import React from 'react'
import img from '../../assets/paymet/tick.png'

const Confirmation = () => {
  return (
    <div style={{width:"100%", margin:"80px auto"}}>
      <Box display="flex" alignItems="center" flexDirection="column" justifyContent="center">
        <img src={img} width="10%" style={{mixBlendMode:"multiply"}}/><br/>
        <h1>Thank you for your purchasing. We hope to see you again in the future</h1>
      </Box>
    </div>
  )
}

export default Confirmation
