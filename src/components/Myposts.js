import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { AiOutlineLike,AiOutlineDislike,AiTwotoneDislike,AiTwotoneLike } from "react-icons/ai";
const Myposts = (props) => {
  const getMyProfile=  useSelector(state=>state.getMyProfile)
  const getProfilePic=useSelector(state=>state.getMyprofilePic)
  const [image1, setimage1] = useState(null);
  const [image2, setimage2] = useState(null);
  const [image3, setimage3] = useState(null);
  const [like, setlike] = useState(null);
  const [dislike, setdislike] = useState(null);
  const [liked, setliked] = useState(null);
  const [disliked, setdisliked] = useState(null);
  const {allPosts}= props;
 
  const asyncfunc= async()=>{
    setlike(allPosts.like)
    setdislike(allPosts.dislike)
    const likedOrDisliked= async()=>{
      const response = await fetch('https://social-paragon-backend.vercel.app/api/posts/like/status',{
        method: "POST", headers: {
          'auth-token': localStorage.getItem('token'),
          "Content-Type": "application/json" 
        }, body:JSON.stringify({
          postId: allPosts._id
        })
      })
      const json = await response.json()
      setliked(json.liked)
      setdisliked(json.disliked)
      
      
    }
    likedOrDisliked()

    if(allPosts.images.length>0){
 
      //Getting images one by one
      for (let i = 0; i < allPosts.images.length; i++) {
        const element = allPosts.images[i];
        
        if(element.img[0].data.length!==0){
          
          const response = await fetch('https://social-paragon-backend.vercel.app/api/posts/get/single/image',{
          // const response = await fetch('http://localhost:3530/api/posts/get/single/image',{
            method: "POST", headers: {
              'auth-token': localStorage.getItem('token'),
              "Content-Type": "application/json" 
            }, body:JSON.stringify({
              filename: element.img[0].data
            })
          })
          let  myBlob=await response.blob()
      
          var objectURL = URL.createObjectURL(myBlob);
          if(i===0){
            setimage1(objectURL)

          }else if(i===1){
            setimage2(objectURL)
          }else if(i===2){
            setimage3(objectURL)

          }
        }
        
      }
  
    
      }
      
      
  
    
  }
  useEffect(() => {
  asyncfunc();
  }, []);
  return (
    <div className='post-card'>
      <div className='display-flex horizontal-center'>
      
        <img className='post-profile' src={getProfilePic} alt=''/>
        <div>
        {getMyProfile&&<h4 className='mx-5'>{getMyProfile.name}</h4>}
        {allPosts&&<p className='mx-5'>{allPosts.date.slice(0,10)}</p>}
        </div>
      </div>
      <div className='my-5 mx-5'>
      {allPosts.description&&<div>
        {allPosts.description}</div>}
        <div className='my-5 display-flex flex-center-both'>

        {image1&&<img className='post-image '  src={image1} alt='not found'/>}
        {image2&&<img className='post-image '  src={image2} alt='not found'/>}
        {image3&&<img className='post-image ' src={image3} alt='not found'/>}
        </div>

      </div>
      <hr className='simple-line'></hr>
      <div className='display-flex like-area'>
        <div className='lilke-button' id='like' onClick={async()=>{
                    document.getElementById("like").style.pointerEvents="none"
                    if(liked){
                      
                      setliked(false)
                      setlike(like-1)
             
                      const response = await fetch('https://social-paragon-backend.vercel.app/api/posts/remove/like',{
                       method: "POST", headers: {
                         'auth-token': localStorage.getItem('token'),
                         "Content-Type": "application/json" 
                       }, body:JSON.stringify({
                         postId: allPosts._id
                       })
                     })
             
                 
                     document.getElementById("like").style.pointerEvents="auto"
                    }else{
                      if(disliked){
                        setdisliked(false)
                        setdislike(dislike-1)
                        setliked(true)
                        setlike(like+1)
                        const response = await fetch('https://social-paragon-backend.vercel.app/api/posts/remove/dislike',{
                          method: "POST", headers: {
                            'auth-token': localStorage.getItem('token'),
                            "Content-Type": "application/json" 
                          }, body:JSON.stringify({
                            postId: allPosts._id
                          })
                        })
                       
                  

                        if(true){
                        
                         const response = await fetch('https://social-paragon-backend.vercel.app/api/posts/add/like',{
                          method: "POST", headers: {
                            'auth-token': localStorage.getItem('token'),
                            "Content-Type": "application/json" 
                          }, body:JSON.stringify({
                            postId: allPosts._id
                          })
                        })
                               
                        }
                        document.getElementById("like").style.pointerEvents="auto"
                      }else{
                        
                   
                        setliked(true)
                        setlike(like+1)
                        const response = await fetch('https://social-paragon-backend.vercel.app/api/posts/add/like',{
                          method: "POST", headers: {
                            'auth-token': localStorage.getItem('token'),
                            "Content-Type": "application/json" 
                          }, body:JSON.stringify({
                            postId: allPosts._id
                          })
                        })
                        

                 
                      }document.getElementById("like").style.pointerEvents="auto"
                    }
        }} ><p className=' mx-5 likes-dislikes display-flex flex-center-both'> {like}{liked?<AiTwotoneLike className='post-like'/>:<AiOutlineLike className='post-like'/>}</p></div>
        <div className='lilke-button mx-5' id='dislike' onClick={async()=>{
                    document.getElementById("dislike").style.pointerEvents="none"
                    if(disliked){
                      
                          setdisliked(false)
                          setdislike(dislike-1)
                      const response = await fetch('https://social-paragon-backend.vercel.app/api/posts/remove/dislike',{
                       method: "POST", headers: {
                         'auth-token': localStorage.getItem('token'),
                         "Content-Type": "application/json" 
                       }, body:JSON.stringify({
                         postId: allPosts._id
                       })
                     })
                     
                  
                     document.getElementById("dislike").style.pointerEvents="auto"
                    }else{
                      if(liked){
                        setliked(false)
                        setlike(like-1)
                        setdisliked(true)
                        setdislike(dislike+1)
                        const response = await fetch('https://social-paragon-backend.vercel.app/api/posts/remove/like',{
                          method: "POST", headers: {
                            'auth-token': localStorage.getItem('token'),
                            "Content-Type": "application/json" 
                          }, body:JSON.stringify({
                            postId: allPosts._id
                          })
                        })
                       

                        if(true){
                         const response = await fetch('https://social-paragon-backend.vercel.app/api/posts/add/dislike',{
                          method: "POST", headers: {
                            'auth-token': localStorage.getItem('token'),
                            "Content-Type": "application/json" 
                          }, body:JSON.stringify({
                            postId: allPosts._id
                          })
                        })
                      
                        }
                        document.getElementById("dislike").style.pointerEvents="auto"
                      }else{
                        setdisliked(true)
                        setdislike(dislike+1)
                        const response = await fetch('https://social-paragon-backend.vercel.app/api/posts/add/dislike',{
                          method: "POST", headers: {
                            'auth-token': localStorage.getItem('token'),
                            "Content-Type": "application/json" 
                          }, body:JSON.stringify({
                            postId: allPosts._id
                          })
                        })
                 
                        

                        if(true){
                      
                        }
                      }document.getElementById("dislike").style.pointerEvents="auto"
                    }
        }}><p className=' mx-5 likes-dislikes display-flex flex-center-both'>{dislike} {disliked?<AiTwotoneDislike className='post-like'/>:<AiOutlineDislike className='post-like'/>}</p></div>
 
      </div>
    </div>
  )
}

export default Myposts