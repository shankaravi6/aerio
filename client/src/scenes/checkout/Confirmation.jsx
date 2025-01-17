import { Box, Button } from '@mui/material'
import React from 'react'
import img from '../../assets/paymet/tick.png'

const Confirmation = () => {
  return (
    <div style={{width:"100%", margin:"80px auto"}}>
      <Box display="flex" alignItems="center" flexDirection="column" justifyContent="center">
        <img src='https://static.vecteezy.com/system/resources/previews/007/278/491/non_2x/online-delivery-phone-concept-fast-respond-delivery-package-shipping-on-mobile-free-vector.jpg' width="25%" style={{mixBlendMode:"multiply"}}/><br/>
        <h1>Thank you for your purchase!</h1>
        <p style={{color:"grey", paddingBottom:"1rem"}}>We truly appreciate your support and hope to see you again in the future. Visit us anytime at Aerio for more great products and services.</p>
        <Button variant="contained" color="primary" href="/">Back to Home</Button>
      </Box>
    </div>
  )
}

export default Confirmation
