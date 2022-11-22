import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
const Friendsandrequest = (props) => {
  function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }
  const navigate = useNavigate()
  const [itsme, setitsme] = useState("false");
  const [name, setname] = useState(null);
  const [profile, setprofile] = useState("https://paragon.learnfacts.xyz/default-profile-picture.png");
   const{allFriends}= props
   const asyncfunc= async()=>{
    const response = await  fetch(`https://social-paragon-backend.vercel.app/api/profile/friends/username`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: allFriends.friendsId
      }),
    })
    const json = await response.json()
    if(json.success==="true"){
      setname(json.userName.name)
      const url = `https://social-paragon-backend.vercel.app/api/profile/others/profile/image/`;

      const headers = { "Content-Type": "application/json" };

      const res = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ id: `${allFriends.friendsId}` }),
      });

      const funct = async () => {
          if(res.status===200){
              
              let myBlob = await res.blob();

              if(myBlob.size>0){
                  var objectURL = URL.createObjectURL(myBlob);
                  setprofile(objectURL);
                  // console.log(myBlob)

              }else{
                  setprofile("https://paragon.learnfacts.xyz/default-profile-picture.png");

              }

          }else{
              setprofile("https://paragon.learnfacts.xyz/default-profile-picture.png");
              // console.log("i am also firing")
          }
      };
      funct();
    }else{
      
    }
   }
  
  const checkingifhimself= async()=>{
    const response=  await   fetch('https://social-paragon-backend.vercel.app/api/auth/get/id', {
      method: "GET",
      headers: {
        "auth-token" : `${localStorage.getItem("token")}`,
}})
const json = await response.json()
if(json.success==="true"){
  if(json.userId===allFriends.friendsId) {
  setitsme(null)
  }else{
    setitsme("null")
  }
}else{
  setitsme("s")
}
  }
   useEffect(() => {
  asyncfunc()
  checkingifhimself()
   }, []);
  return (
  <div>
    {itsme && <div className='medium-width-card display-flex margin-between horizontal-center'>
      <div className='display-flex  horizontal-center '>

      <img className='logo-main profile-round cursor-pointer' alt='Profile Pic' onClick={()=>{
                navigate(`/user/profile/?id=${allFriends.friendsId}`)
            }} src={profile}/>
     <h3 className='mx-5 cursor-pointer' onClick={()=>{  navigate(`/user/profile/?id=${allFriends.friendsId}`)}} > {name} </h3> 
      </div>
    <div className='display-flex flex-center-both flex-wrap'>
     {allFriends.status==="sent"?<><button className='btn-yellow mx-2 my-2' onClick={async(e)=>{
                e.preventDefault();
                const response = await toast.promise(
                fetch('https://social-paragon-backend.vercel.app/api/friends/cancel/request', {
                  method: "POST",
                  headers: {
                    "auth-token" : `${localStorage.getItem("token")}`,
                    "Content-Type" : "application/json",
                  },
                  body: JSON.stringify({
                    "friendsId": `${allFriends.friendsId}`
                  }),
                }), {
                  pending: 'Canceling request.',
                }
                )
                const json = await response.json();

                if (json.success==="true") {
                  //redirect
                 
                  toast.success(json.message,{autoClose:2000});
                  navigate('/refresh')
                  await delay(5);
                  navigate(`/friends`)
                  //navigate(0)
                } else {
                    toast.error(json.message);
                    await delay(1000);
                    navigate('/refresh')
                    await delay(5);
                    navigate(`/friends`)
                }
            
              }}>Cancel</button></>:allFriends.status==="received"?<><button className='btn-green mx-2 my-2'  onClick={async(e)=>{
                e.preventDefault();
                const response = await toast.promise(
                  fetch('https://social-paragon-backend.vercel.app/api/friends/accept/request', {
                    method: "POST",
                    headers: {
                      "auth-token" : `${localStorage.getItem("token")}`,
                      "Content-Type" : "application/json",
                    },
                    body: JSON.stringify({
                      "friendsId": `${allFriends.friendsId}`
                    }),
                  }), {
                    pending: 'Accepting request.',
                  }
                  )
                  const json = await response.json();
  
                  if (json.success==="true") {
                    //redirect
                   
                    toast.success(json.message,{autoClose:2000});
  
                    // navigate(0)
                    navigate('/refresh')
                    await delay(5);
                    navigate(`/friends`)
                  } else {
                      toast.error(json.message);
                      await delay(1000);
                      navigate('/refresh')
                      await delay(5);
                      navigate(`/friends`)
                  }}} >Confirm</button></>:<><button className='btn-green mx-2 my-2' onClick={(e)=>{
                    e.preventDefault();
                    navigate(`/messages/user/?id=${allFriends.friendsId}`)
                  }} >Message</button></>}
     <button className='btn-green mx-2 my-2' onClick={()=>{
                navigate(`/user/profile/?id=${allFriends.friendsId}`)
            }}>View Profile</button>
    </div>
    </div>}
    
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
  
export default Friendsandrequest