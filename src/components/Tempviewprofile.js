import React, {  useEffect, useState } from 'react'
import { useSelector } from 'react-redux';



const Tempviewprofile = () => {
  const [profile, setprofile] = useState(null);
  const getMyProfile=  useSelector(state=>state.getMyProfile)
  const func= async() => {

    const url=`https://social-paragon-backend.vercel.app/api/profile/get/profile/image/`

    const headers = {'auth-token': localStorage.getItem('token')}

    const response= await fetch(url,{ headers:headers})
    
     const funct=async()=> {
       console.log(response)

      let  myBlob=await response.blob()
      console.log(myBlob)
      var objectURL = URL.createObjectURL(myBlob);
      console.log(objectURL)
      setprofile( objectURL);
    }
    funct()
  }
  useEffect(() => {
   
    func();
  }, []);
  const newfunc= async()=>{
    // let  myBlob=await getMyProfile.myProfile. .blob()
    // var objectURL = URL.createObjectURL(myBlob);
    // setprofile( objectURL);
    console.log(getMyProfile.myProfile)
    console.log(profile)
  }
  newfunc()
  return (

    <div>
<img alt='Profile Pic' src={`${profile}`} />
    </div>
  )
}

export default Tempviewprofile