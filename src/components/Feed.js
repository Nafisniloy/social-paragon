import React, { useEffect, useState } from 'react'
import Feedposts from './Feedposts';
import { slice } from 'lodash'

const Feed = (props) => {
  const {allFriends}= props
  let friendsArray=[]
  const [allPosts, setallPosts] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false)
  const [index, setIndex] = useState(5)
  const initialPosts = slice(allPosts, 0, index)
  const loadMore = () => {
    setIndex(index + 5)
    console.log(index)
    if (index >= allPosts.length) {
      setIsCompleted(true)
    } else {
      setIsCompleted(false)
    }
  }
  const asyncfunc= async()=>{
    if(allFriends){
      if(allFriends.success==="true"){
        
          allFriends.allFriends.forEach(element => {
            
            if(element.friendsId.length===24){
              if(element.status==="friends"){

                friendsArray.push(element.friendsId)
              }
            }
          });
          const response = await  fetch(`https://social-paragon-backend.vercel.app/api/posts/get/feed`, {
            method: "POST",
            headers: {
              "auth-token": `${localStorage.getItem('token')}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              friendsArray: friendsArray
            }),
          })
          const json = await response.json()
          setallPosts(json)
        }
      }
  }
  useEffect(() => {
    asyncfunc()
  }, [allFriends]);
      if(props){
        // const {allFriends}= props
        if(allFriends){
        if(allFriends.success==="true"){
    
      return (
        <div className=''>
           {allPosts && initialPosts.map((allPosts)=>{
          return(
            <div>
              <Feedposts key={allPosts._id} allPosts={allPosts} />
            
            </div>

          )
        }
        )}
        <div className='load-more-btn-container'>

          {!isCompleted&&allPosts&&<button onClick={loadMore} type="button" className="btn btn-green load-more-btn">
            Load More
          </button>}
        </div>
          {isCompleted&&allPosts&&<div className='post-card txt-center'> No more posts</div>}
        {!allPosts &&<div className='post-card txt-center'> No posts to show</div>}
        </div>
      )        
    }else{
        return (
        <div className='post-card-max txt-center'>Please add some Friends.</div>
        )
    }
  
}}



}

export default Feed