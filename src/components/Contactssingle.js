import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Contactsingle = (props) => {
    const navigate = useNavigate()
    const [name, setname] = useState(null);
    const [message, setmessage] = useState(null);
    const [emptyMessage, setemptyMessage] = useState(null);
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
       useEffect(() => {
     asyncfunc()
     const lastMessage= async()=>{
        const response=  await  fetch('https://social-paragon-backend.vercel.app/api/messages/get/last/one', {
            method: "POST",
            headers: {
              "auth-token" : `${localStorage.getItem("token")}`,
              "Content-Type" : "application/json",
            },
            body: JSON.stringify({
              "friendsId": `${allFriends.friendsId}`
            }),
          })
          const json= await response.json()
          if(json.message){
            setemptyMessage(json.message)
          }else{
            setmessage(json.allMessages)
          }
     }
     lastMessage()
    
       }, []);
  return (
    <div>
         <div className='medium-width-card display-flex margin-between horizontal-center'>
         <div className='display-flex  horizontal-center '>

<img className='logo-main profile-round cursor-pointer' alt='Profile Pic' onClick={()=>{
          navigate(`/messages/user/?id=${allFriends.friendsId}`)
      }} src={profile}/>
      <div>
<h3 className='mx-5 cursor-pointer' onClick={()=>{  navigate(`/messages/user/?id=${allFriends.friendsId}`)}}> {name} </h3> 
{message&&<p className='mx-5 cursor-pointer' onClick={()=>{  navigate(`/messages/user/?id=${allFriends.friendsId}`)}}>{message.message.length>18?message.message.substr(0, 19)+'...':message.message}</p>}
{!message&&emptyMessage&&<p className='mx-5 cursor-pointer' onClick={()=>{  navigate(`/messages/user/?id=${allFriends.friendsId}`)}}>{emptyMessage}</p>}
      </div>
</div>
</div>
    </div>
  )
}

export default Contactsingle