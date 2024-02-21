import React from 'react'
import Registration from './Registration'
import { Stack } from '@mui/material'

function Dashboard() {
  return (
   <>
   <Stack sx={{
    height :'100vh' ,
    width :'100vw'
   }}>
   <Registration />
   </Stack>
    
   </>
  )
}

export default Dashboard