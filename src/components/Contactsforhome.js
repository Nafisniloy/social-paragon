import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Contactsforhome = (props) => {
    const navigate = useNavigate()
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
       useEffect(() => {
     asyncfunc()
       }, []);
  return (
    <div>
         <div className='medium-width-card display-flex margin-between horizontal-center'>
         <div className='display-flex  horizontal-center '>

<img className='logo-main profile-round cursor-pointer' alt='Profile Pic' onClick={()=>{
          navigate(`/user/profile/?id=${allFriends.friendsId}`)
      }} src={profile}/>
<h3 className='mx-5 cursor-pointer' onClick={()=>{  navigate(`/user/profile/?id=${allFriends.friendsId}`)}}> {name} </h3> 
</div>
</div>
    </div>
  )
}

export default Contactsforhome