import React from 'react'
import { useSearchParams } from 'react-router-dom'

const Forgetpassverified = () => {
    const [SearchParams]=useSearchParams();
    console.log(SearchParams.get('id'))
    console.log(SearchParams.get('str'))
  return (
    <div>Forgetpassverified</div>
  )
}

export default Forgetpassverified