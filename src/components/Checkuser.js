import React from 'react'
import { useNavigate } from 'react-router-dom';

const Checkuser = () => {
    const navigate =useNavigate();
    const refreshPage =async () => {
        if (!localStorage.getItem('token')) {    
            navigate('/login');
            //navigate(0);
            }
    
      }
      Window.onload = refreshPage();
      document.title='Checking User - Social Paragon'

  return (
    <div></div>
  )
}

export default Checkuser