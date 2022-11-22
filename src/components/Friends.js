import React, { useEffect, useState } from 'react'
import Friendsandrequest from './Friendsandrequest';

const Friends = () => {
    const [allFriends, setallFriends] = useState(null);
    const [sentrequest, setsentrequest] = useState("true");
    const [havefriends, sethavefriends] = useState("true");
    const [haverequest, sethaverequest] = useState("true");
    const gettingFriends = async()=>{
        const response = await  fetch(`https://social-paragon-backend.vercel.app/api/friends/get/all/friends`, {
            method: "POST",
            headers: {
              "auth-token": `${localStorage.getItem('token')}`,
            }
          })
          const json = await response.json()
          setallFriends(json)
          // console.log(json)
    }
    useEffect(() => {
      document.title='Friends - Social Paragon'

    gettingFriends();
    }, []);

    // console.log(allFriends)
  return (
    <div>
      {allFriends && <div>{
        allFriends.success==="true"?
          <div>    
            <h2 className='max-width-card txt-center'>Received requests</h2>
            {
          allFriends.allFriends.map((allFriends)=>{
            if(allFriends.friendsId.length===24){
              return (
                <div>
                    {allFriends.status==="received"?<><Friendsandrequest key={allFriends.friendsId} allFriends={allFriends}/>{haverequest&& sethaverequest(null)}</>:<p> </p>}
                    
                  {/* {allFriends.status==="received"?<><h2>Received request</h2><Friendsandrequest key={allFriends.friendsId} allFriends={allFriends}/></>:allFriends.status==="sent"?<Friendsandrequest key={allFriends.friendsId} allFriends={allFriends}/>:<Friendsandrequest key={allFriends.friendsId} allFriends={allFriends}/>} */}
                </div>
              )
            }
          })}
          {haverequest&&<p className='medium-width-card txt-center'>You do not have any new request.</p>}
                <h2 className='max-width-card txt-center'>Sent requests</h2>
            {
          allFriends.allFriends.map((allFriends)=>{
            if(allFriends.friendsId.length===24){
              return (
                <div>
                    {allFriends.status==="sent"?<><Friendsandrequest key={allFriends.friendsId} allFriends={allFriends}/>{sentrequest&& setsentrequest(null)}</>:<p></p>}
                  {/* {allFriends.status==="received"?<><h2>Received request</h2><Friendsandrequest key={allFriends.friendsId} allFriends={allFriends}/></>:allFriends.status==="sent"?<Friendsandrequest key={allFriends.friendsId} allFriends={allFriends}/>:<Friendsandrequest key={allFriends.friendsId} allFriends={allFriends}/>} */}
                </div>
              )
            }
          })}
           {sentrequest&&<p className='medium-width-card txt-center'>You do not have any pending request.</p>}
                <h2 className='max-width-card txt-center'>Friends</h2>
            {
          allFriends.allFriends.map((allFriends)=>{
            if(allFriends.friendsId.length===24){
              return (
                <div>
                    {allFriends.status==="friends"?<><Friendsandrequest key={allFriends.friendsId} allFriends={allFriends}/>{havefriends&& sethavefriends(null)}</>:<p></p>}
                  {/* {allFriends.status==="received"?<><h2>Received request</h2><Friendsandrequest key={allFriends.friendsId} allFriends={allFriends}/></>:allFriends.status==="sent"?<Friendsandrequest key={allFriends.friendsId} allFriends={allFriends}/>:<Friendsandrequest key={allFriends.friendsId} allFriends={allFriends}/>} */}
                </div>
              )
            }
          })}
           {havefriends&&<p className='medium-width-card txt-center'>You do not have any friends yet.</p>}

          </div>:<div className='max-width-card diplay-flex flex-center-both'>
            <h3 className='txt-center '>No friends to show</h3>
            <img src='https://paragon.learnfacts.xyz/no-friends-to-show.jpg' className='no-friend-image' alt='No Friends'/>
        </div>}
        </div>
        }


    </div>
  )
}

export default Friends