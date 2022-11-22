import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Myposts from "./Myposts";
import "react-toastify/dist/ReactToastify.css";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Othersprofilespost from "./Othersprofilespost";
const Othersprofile = () => {
  function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }
  const [SearchParams] = useSearchParams();
  const id = SearchParams.get("id");
  const navigate = useNavigate();
  const [loading, setloading] = useState("true");
  const [profile, setprofile] = useState(null);
  const [profileDetails, setprofileDet] = useState(null);
  const [allPosts, setallPosts] = useState(null);
   const [notfriends, setnotfriends] = useState(null);
  const asyncfunc= async()=>{
    const response = await fetch('https://social-paragon-backend.vercel.app/api/posts/get/friends/posts',{
      method: "POST", headers: {
        'auth-token': localStorage.getItem('token'),
        'Content-type':'application/json'
      },body:JSON.stringify({
        id:id
      })
    })
    let json= await response.json()
    console.log(json)
    if(json.success==="true"){

      setallPosts(json.allPosts)
    }else{
      setnotfriends(json.message)
    }
  }

  useEffect(() => {

    asyncfunc()
    const useasyncfunc = async () => {
      // eslint-disable-next-lines
      if (!id) {
        navigate("/");
      } else {
        const response = await fetch(
          `https://social-paragon-backend.vercel.app/api/friends/check/status/`,
          {
            method: "POST",
            headers: {
              "auth-token": `${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              friendsId: `${id}`,
            }),
          }
        );
        const json = await response.json();
        setprofileDet(json);
        document.title=`${json.name} - Social Paragon`

        if (json.success === "true") {
          const url = `https://social-paragon-backend.vercel.app/api/profile/others/profile/image/`;

          const headers = { "Content-Type": "application/json" };

          const res = await fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({ id: `${id}` }),
          });

          const funct = async () => {
            if(res.status===200){
            let myBlob = await res.blob();
            var objectURL = URL.createObjectURL(myBlob);
            setprofile(objectURL);
            setloading(null)
            }else{
              setprofile("https://paragon.learnfacts.xyz/default-profile-picture.png");
              setloading(null)

          }
          };
          funct();
        } else {
          toast.error(json.message);
          await delay(1000);
          navigate("/");
          navigate(0)
        }
      }
    };
    useasyncfunc();
    const anotherAsyncFunc= async()=>{
   const response=  await   fetch('https://social-paragon-backend.vercel.app/api/auth/get/id', {
                  method: "GET",
                  headers: {
                    "auth-token" : `${localStorage.getItem("token")}`,
    }})
    const json = await response.json()
    console.log(json)
    if(json.success==="true"){
       if(json.userId===id) {
        navigate('/profile')
       }else{
        
       }
    }else{
      navigate('/')
      navigate(0)
    }
    }
    anotherAsyncFunc();
    if(profileDetails){
      document.title=`${profileDetails.name} - Social Paragon`

    }

 
  }, []);
  return (
    <div>
      {profileDetails && (
        <div className="profile-container">
          <div className="profile-top-section">
            <div className="display-flex flex-center-both pos-rel profile-container-main">
              <img
                src={profile}
                className="profile-pic-profile-page"
                alt="Profile Pic"
              />
            </div>
            {profileDetails && (
              <h1 className="txt-center my-2 ">{profileDetails.name}</h1>
            )}
            <div className="my-5 display-flex flex-center-both">
              {profileDetails.status==="friends"?<><button className="btn-green mx-2" onClick={(e)=>{
                e.preventDefault();
                navigate(`/messages/user/?id=${id}`)
              }} >Message</button><button className="btn-green mx-2"  onClick={(e)=>{
                e.preventDefault();
                navigate(`/friends/user/?id=${id}`)
              }}>Friends</button></>:profileDetails.status==="sent"?<button className="btn-yellow mx-2" onClick={async(e)=>{
                e.preventDefault();
                const response = await toast.promise(
                fetch('https://social-paragon-backend.vercel.app/api/friends/cancel/request', {
                  method: "POST",
                  headers: {
                    "auth-token" : `${localStorage.getItem("token")}`,
                    "Content-Type" : "application/json",
                  },
                  body: JSON.stringify({
                    "friendsId": `${id}`
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
                  navigate(`/user/profile/?id=${id}`)
                  //navigate(0)
                } else {
                    toast.error(json.message);
                    await delay(1000);
                    navigate('/refresh')
                    await delay(5);
                    navigate(`/user/profile/?id=${id}`)
                }
            
              }}>Cancel request</button>:profileDetails.status==="received"?<button className="btn-green mx-2"  onClick={async(e)=>{
                e.preventDefault();
                const response = await toast.promise(
                  fetch('https://social-paragon-backend.vercel.app/api/friends/accept/request', {
                    method: "POST",
                    headers: {
                      "auth-token" : `${localStorage.getItem("token")}`,
                      "Content-Type" : "application/json",
                    },
                    body: JSON.stringify({
                      "friendsId": `${id}`
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
                    navigate(`/user/profile/?id=${id}`)
                  } else {
                      toast.error(json.message);
                      await delay(1000);
                      navigate('/refresh')
                      await delay(5);
                      navigate(`/user/profile/?id=${id}`)
                  }
              }}>Confirm request</button>:<button className="btn-green mx-2"  onClick={async(e)=>{
                e.preventDefault();
                const response = await toast.promise(
                  fetch('https://social-paragon-backend.vercel.app/api/friends/send/request', {
                    method: "POST",
                    headers: {
                      "auth-token" : `${localStorage.getItem("token")}`,
                      "Content-Type" : "application/json",
                    },
                    body: JSON.stringify({
                      "friendsId": `${id}`
                    }),
                  }), {
                    pending: 'Sending request.',
                  }
                  )
                  const json = await response.json();
  
                  if (json.success==="true") {
                    //redirect
                   
                    toast.success(json.message,{autoClose:2000});
                    //navigate(0)
                    navigate('/refresh')
                    await delay(5);
                    navigate(`/user/profile/?id=${id}`)
                  } else {
                      toast.error(json.message);
                      await delay(1000);
                      navigate('/refresh')
                      await delay(5);
                      navigate(`/user/profile/?id=${id}`)
                  }
              }}>Add Friend</button>}
              {profileDetails.status==="received"?<button className="btn-yellow mx-2"  onClick={async(e)=>{
                e.preventDefault();
                const response = await toast.promise(
                fetch('https://social-paragon-backend.vercel.app/api/friends/cancel/request', {
                  method: "POST",
                  headers: {
                    "auth-token" : `${localStorage.getItem("token")}`,
                    "Content-Type" : "application/json",
                  },
                  body: JSON.stringify({
                    "friendsId": `${id}`
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
                  navigate(`/user/profile/?id=${id}`)
                  // navigate(0)
                } else {
                    toast.error(json.message);
                    await delay(1000);
                    navigate('/refresh')
                    await delay(5);
                    navigate(`/user/profile/?id=${id}`)
                }
            
              }}>Cancel request</button>:<></>}
            </div>
          </div>
          {/* <hr className="simple-line"></hr> */}
          <div className="display-flex flex-wrap flex-center-both ">
            <div className="profile-details-container">
              <h2 className="txt-center my-2 ">About</h2>
              <hr className="short-line"></hr>
              <div className="display-flex flex-wrap flex-center-both about-section">
                <div className="bordered-details">
                  <div>
                    <h3 className=" my-2 ">Bio:</h3>
                    {profileDetails.userDetails.Bio && (
                      <p className="profile-details ">
                        {profileDetails.userDetails.Bio}
                      </p>
                    )}
                  </div>
                  <div>
                    <h3 className=" my-2 ">Religion:</h3>
                    {profileDetails.userDetails.religion && (
                      <p className="profile-details ">
                        {profileDetails.userDetails.religion}
                      </p>
                    )}
                  </div>

                  <div>
                    <h3 className=" my-2 ">City:</h3>
                    {profileDetails.userDetails.places && (
                      <p className="profile-details ">
                        {profileDetails.userDetails.places}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="basic-info-container">
              <h2 className="txt-center my-2 ">Basic Info</h2>
              <hr className="short-line"></hr>
              <div className="bordered-details">
                <div>
                  <h3 className=" my-2 ">Gender:</h3>
                  {profileDetails.gender && (
                    <p className="profile-details ">{profileDetails.gender}</p>
                  )}
                </div>
                <div>
                  <h3 className=" my-2 ">Birthday:</h3>
                  {profileDetails.dateOfBirth && (
                    <p className="profile-details ">
                      {profileDetails.dateOfBirth}
                    </p>
                  )}
                </div>
              </div>
            </div>
            {/* <hr className="simple-line"></hr> */}
          </div>
        </div>
      )}
     {loading&&<Backdrop
    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={true}
  >
    <CircularProgress color="inherit" />
  </Backdrop>}
  {allPosts && allPosts.slice(0).reverse().map((allPosts)=>{
          return(
            <Othersprofilespost key={allPosts._id} getMyProfile={profileDetails} profile={profile} allPosts={allPosts} />

          )
        }
        )}
        {!allPosts && !notfriends&&<div className='post-card txt-center'> No posts to show</div>}
        {notfriends &&<div className='post-card txt-center'>{notfriends}</div>}
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
  );
};

export default Othersprofile;
