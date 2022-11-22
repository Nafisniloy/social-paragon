import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Contactsforhome from "./Contactsforhome";
const Friendsoffriends = () => {
    const [SearchParams] = useSearchParams();
    const [notfriends, setnotfriends] = useState(null);
    const [allFriends, setallFriends] = useState(null);
  const id = SearchParams.get("id");
    const asyncfunc= async()=>{
        const response = await fetch('https://social-paragon-backend.vercel.app/api/friends/get/others/friends',{
          method: "POST", headers: {
            'auth-token': localStorage.getItem('token'),
            'Content-type':'application/json'
          },body:JSON.stringify({
            id:id
          })
        })
        let json= await response.json()
     
        if(json.success==="true"){
    
          setallFriends(json)
        }else{
          setnotfriends(json.message)
        }
      }

      useEffect(() => {
      asyncfunc();
      document.title='Friends - Social Paragon'


      }, []);
  return (
    <div>
              {allFriends && <div>{
        allFriends.success==="true"?<div>     <h2 className='max-width-card txt-center'>Friends</h2>
        {
      allFriends.allFriends.map((allFriends)=>{
        if(allFriends.friendsId.length===24){
          return (
            <div>
                {allFriends.status==="friends"?<><Contactsforhome key={allFriends.friendsId} allFriends={allFriends}/></>:<p></p>}
              {/* {allFriends.status==="received"?<><h2>Received request</h2><Friendsandrequest key={allFriends.friendsId} allFriends={allFriends}/></>:allFriends.status==="sent"?<Friendsandrequest key={allFriends.friendsId} allFriends={allFriends}/>:<Friendsandrequest key={allFriends.friendsId} allFriends={allFriends}/>} */}
            </div>
          )
        }
      })}

      </div>:<div className=''>

    </div>}
      </div>}
      {!allFriends && !notfriends&&<div className='post-card txt-center'> No Friends to show</div>}
        {notfriends &&<div className='post-card txt-center'>{notfriends}</div>}
    </div>
  )
}

export default Friendsoffriends