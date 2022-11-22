import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { BsCameraFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import Myposts from './Myposts';

const Profile = () => {
    const getMyProfile=  useSelector(state=>state.getMyProfile)
    const getProfilePic=useSelector(state=>state.getMyprofilePic)
    // console.log(getMyProfile)
    const [allPosts, setallPosts] = useState(null);
    const navigate = useNavigate()
    // console.log(getProfilePic)
    const asyncfunc= async()=>{
      const response = await fetch('https://social-paragon-backend.vercel.app/api/posts/get/my/posts',{
        method: "POST", headers: {
          'auth-token': localStorage.getItem('token')
        }
      })
      let json= await response.json()
      setallPosts(json.allPosts)
   
    }
    
    useEffect(() => {
     asyncfunc()
     if(getMyProfile){

      document.title=`${getMyProfile.name} - Social Paragon`
    }
    }, [getMyProfile]);
  return (
    <div className=''>
   
        {getMyProfile && (
        <div className="profile-container">
          <div className="profile-top-section">
            <div className="display-flex flex-center-both pos-rel profile-container-main">
              <img
                src={getProfilePic}
                className="profile-pic-profile-page"
                alt="Profile Pic"
              />
              <BsCameraFill className="up-img-icon" onClick={() => {
                navigate('update/image')
              }} />
            </div>
            {getMyProfile && (
              <h1 className="txt-center my-2 ">{getMyProfile.myProfile.userName}</h1>
            )}
            <div className="my-5 display-flex flex-center-both">
              {<button className="btn-green mx-2" onClick={(e)=>{
                e.preventDefault()
                navigate('/edit/profile/details')
              }}>Edit Profile</button>}
              <button className="btn-green mx-2" onClick={(e)=>{
                e.preventDefault()
                navigate('/friends')
              }}>Friends</button>
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
                    {getMyProfile.myProfile.Bio && (
                      <p className="profile-details ">
                        {getMyProfile.myProfile.Bio}
                      </p>
                    )}
                  </div>
                  <div>
                    <h3 className=" my-2 ">Religion:</h3>
                    {getMyProfile.myProfile.religion && (
                      <p className="profile-details ">
                        {getMyProfile.myProfile.religion}
                      </p>
                    )}
                  </div>

                  <div>
                    <h3 className=" my-2 ">City:</h3>
                    {getMyProfile.myProfile.places && (
                      <p className="profile-details ">
                        {getMyProfile.myProfile.places}
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
                  {getMyProfile.gender && (
                    <p className="profile-details ">{getMyProfile.gender}</p>
                  )}
                </div>
                <div>
                  <h3 className=" my-2 ">Birthday:</h3>
                  {getMyProfile.dateOfBirth && (
                    <p className="profile-details ">
                      {getMyProfile.dateOfBirth}
                    </p>
                  )}
                </div>
              </div>
            </div>
            {/* <hr className="simple-line"></hr> */}
          </div>
        </div>
      )}
      <div>
        {allPosts && allPosts.slice(0).reverse().map((allPosts)=>{
          return(
            <Myposts key={allPosts._id} allPosts={allPosts} />

          )
        }
        )}
        {!allPosts &&<div className='post-card txt-center'> No posts to show</div>}
      </div>
    </div>
  )
}

export default Profile