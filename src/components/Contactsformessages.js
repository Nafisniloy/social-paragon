import React, { useEffect, useState } from 'react'
import Contactsingle from './Contactssingle';

const Contactsformessages = () => {
    const [havefriends, sethavefriends] = useState("true");
    const [allFriends, setallFriends] = useState(null);
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
        gettingFriends();
    }, []);

  return (
    <div>
          {allFriends && <div>{
        allFriends.success==="true"?<div>     <h2 className='max-width-card txt-center'>Contacts</h2>
        {
      allFriends.allFriends.map((allFriends)=>{
        if(allFriends.friendsId.length===24){
          return (
            <div>
                {allFriends.status==="friends"?<><Contactsingle key={allFriends.friendsId} allFriends={allFriends}/>{havefriends&& sethavefriends(null)}</>:<p></p>}
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
      </div>}
    </div>
  )
}

export default Contactsformessages