import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'

const Aftersignup = () => {
  const velidateUser=useSelector(state=>state.velidateUser)
  const verifyEmail=useSelector(state=>state.verifyEmail)
  const navigate= useNavigate();
  useEffect(() => {
    document.title='Verify Email - Social Paragon'

    if (localStorage.getItem("token")) {
      if(velidateUser!== "pending"){

        if (velidateUser === "true") {
          if (verifyEmail === "true") {
               navigate("/");
          }
        }
      }
    }else{
      navigate("/login");

    }

    // eslint-disable-next-line
  }, [velidateUser]);
  return (
    <>
    <div className='colorful-body'>
 <img src={"https://paragon.learnfacts.xyz/email.png"}  alt="not foud"
            id="email-logo"
            />
            <h3 className='float txt-center color-pink ver-email-size'>A verification email has been sent to your account. Please check your inbox and verify your account</h3>

          
    </div>
    </>
  )
}

export default Aftersignup