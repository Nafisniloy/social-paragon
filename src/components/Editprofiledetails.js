import React, { useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from "react-toastify";
const Editprofiledetails = () => {
  function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }
  const [details, setdetails] = useState({ bio: "", places: "", religion: "" });
  const getMyProfile=  useSelector(state=>state.getMyProfile)
  useEffect(() => {
    document.title='Edit Profile Details - Social Paragon'

    // gettingProfile=async()=>{
      if (getMyProfile) {
        setdetails({bio:getMyProfile.myProfile.Bio,religion:getMyProfile.myProfile.religion,places:getMyProfile.myProfile.places})
      }

    }, [getMyProfile]);
    // }
    const onChange = (e) => {
      setdetails({ ...details, [e.target.name]: e.target.value });
    };
    const navigate= useNavigate()
    if(!localStorage.getItem('token')){
      navigate('/login')
      navigate(0)
    }

  return (
    <div className='afterver-container max-width-card'>
              <h2 className="mt-2">Edit Profile Details</h2>

              <form className='display-flex flex-center-both flex-dir-col'>
                <label htmlFor={"bio"} className="big-font mt-5" >Edit Bio</label>
                <textarea value={details.bio}  name='bio' onChange={onChange}  maxlength="180" className='default-txt-area' id='bio' placeholder={"Write something about yourself."}/>
                <label htmlFor={"places"} className="big-font mt-5" >Edit places</label>
                <input value={details.places}  name='places' maxlength="80" onChange={onChange} className='input  input-focus i-pad' id='places' placeholder={"Enter the city where you live in."}/>
                <label htmlFor={"religion"} className="big-font mt-5" >Edit Religion</label>
                <input value={details.religion} name='religion' maxlength="50" onChange={onChange} className='input  input-focus i-pad' id='religion' placeholder={"Enter your religion."}/>

                <div className='mt-5'>
                <button className="btn-green mx-2"
                 onClick={async(e)=>{
                   e.preventDefault();
                   const respone = await toast.promise(
                    fetch(`https://social-paragon-backend.vercel.app/api/profile/update/details`, {
                      method: "POST", headers: {
                        "Content-Type": "application/json",
                        'auth-token': localStorage.getItem('token')
                      },body: JSON.stringify({
                       bio:details.bio,
                       places:details.places,
                       religion:details.religion
                      }),
                    },
                    ),
                    {
                      pending: "Updating profile details",
                      // success: 'Promise resolved 👌',
                      // error: 'Promise rejected 🤯'
                    }
                  );
                  const json=  await  respone.json()
                  if(json.success==="true"){
                    toast.success(json.message)
                    await delay(1500);

                    navigate("/");
                  }else{
                    toast.error(json.message)
                  }
                }}>Update Details</button> 

                <button className="btn-yellow mx-2" onClick={()=>{navigate("/")}}>Skip</button>
                </div>

              </form>
      
              <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  )
}

export default Editprofiledetails