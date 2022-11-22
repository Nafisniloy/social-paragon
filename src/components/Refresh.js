import React from 'react'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
const Refresh = () => {
  return (
 <div className='display-flex flex-center-both horizontal-center-forcely'>
    <h1 className=''>Please wait..</h1>
        <Backdrop
    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={true}
  >
    <CircularProgress color="inherit" />
  </Backdrop>
 </div>

  )
}

export default Refresh