import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { AiOutlineSend } from "react-icons/ai";
import Singlemessage from './Singlemessage';
import { slice } from 'lodash'

const Conversation = (props) => {
    const navigate= useNavigate()    
    const [SearchParams] = useSearchParams();
    const [messages, setmessages] = useState([]);
    const [emptyMessage, setemptyMessage] = useState(null);
    const id = SearchParams.get("id");
    const [profile, setprofile] = useState(null);
    const [isCompleted, setIsCompleted] = useState(false)
  const [index, setIndex] = useState(8)
  const {socket}= props
  const initialPosts = slice(messages, 0, index)
  const [profileDetails, setprofileDet] = useState(null);
  const loadMore = () => {
    setIndex(index + 5)
    if (index >= messages.length) {
      setIsCompleted(true)
    } else {
      setIsCompleted(false)
    }
  }
  useEffect(() => {
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
            }else{
              setprofile("https://paragon.learnfacts.xyz/default-profile-picture.png");

          }
          };
          funct();
        } 
      }
    };
    useasyncfunc();

    if(profileDetails){
      document.title=`${profileDetails.name} - Social Paragon`

    }
    const gettingMessages= async()=>{
      const response=  await  fetch('https://social-paragon-backend.vercel.app/api/messages/get/all', {
        method: "POST",
        headers: {
          "auth-token" : `${localStorage.getItem("token")}`,
          "Content-Type" : "application/json",
        },
        body: JSON.stringify({
          "friendsId": `${id}`
        }),
      })
      const json= await response.json()
      if(json.message){
        setemptyMessage(json.message)
      }else{
        setmessages(json.allMessages.messages.reverse())
      }
    }
      gettingMessages()
      // console.log(messages)
  }, []);
  useEffect(() => {
    const myInterval = setInterval(fetchQuote, 5000);
    

    return () => {
      // should clear the interval when the component unmounts
      clearInterval(myInterval)
    }
  }, []);

  const fetchQuote = () => {
    const gettingMessages= async()=>{
      const response=  await  fetch('https://social-paragon-backend.vercel.app/api/messages/get/all', {
        method: "POST",
        headers: {
          "auth-token" : `${localStorage.getItem("token")}`,
          "Content-Type" : "application/json",
        },
        body: JSON.stringify({
          "friendsId": `${id}`
        }),
      })
      const json= await response.json()
      if(json.message){
        setemptyMessage(json.message)
      }else{
        if(json.allMessages.messages.length>messages.length){

          navigate(`/messages/user/?id=${id}`)
        }
        setmessages(json.allMessages.messages.reverse())
      }
    }

      gettingMessages()
    // your current code
  };

  return (
    <div className='message-sec'>

    <div className='message-area-full'>
        <div className='max-width-card message-top-area display-flex flex-center-both'>
        {profile&&<img src={profile} className="message-page-logo ms-logo profile-round " />}
        {profileDetails&&<h4>{profileDetails.name}</h4>}
        </div>
        <div className='messages-container'>
       
          {emptyMessage&&<div className='single-message-card my-5'>{emptyMessage}</div>}
         {!emptyMessage&&<div>
         {messages&& initialPosts.reverse().map((messages)=>{
          // {console.log(messages)}
          return(
<>

<Singlemessage key={messages._id} messages={messages} />
</>
          )
        })
      }
           </div>}
          
      {!emptyMessage&&isCompleted&&<div className='single-message-card my-5 txt-center'>No more messages to show</div>}
          {!emptyMessage&&!isCompleted&&<div onClick={loadMore} className='more-btn btn btn-green'>More</div>}
        </div>
        <div className='max-width-card bottom-fixed-centered display-flex flex-center-both'>
            <textarea type='text'className='message-input' name="message" id='message' placeholder="Enter your message.." />
           <AiOutlineSend onClick={async()=>{
              const message= document.getElementById('message').value
              const newmessage= {message:message,forMe:"sent",status:"unseen"}
             if(document.getElementById('message').value.length>0){
              if(messages.length>0){

                messages.push(newmessage)
              }else{
                messages.push(newmessage)
                navigate(0)
              }
              navigate(`/messages/user/?id=${id}`)
               await  fetch('https://social-paragon-backend.vercel.app/api/messages/send/new', {
              //  await  fetch('http://localhost:3530/api/messages/send/new', {
        method: "POST",
        headers: {
          "auth-token" : `${localStorage.getItem("token")}`,
          "Content-Type" : "application/json",
        },
        body: JSON.stringify({
          "friendsId": `${id}`,
          "message": document.getElementById('message').value
        }),
      })
    await socket.emit("newMessage",id)
      document.getElementById('message').value=""
    }
           }} className='send-button'/>
        </div>
    </div>
    </div>
  )
}

export default Conversation