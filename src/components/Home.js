import React, { useEffect, useRef, useState } from "react";
import Resizer from "react-image-file-resizer";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Contactsforhome from "./Contactsforhome";
import Feed from "./Feed";
// import Friendsandrequest from "./Friendsandrequest";

// import Checkuser from './Checkuser'

const Home = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [selectedImage3, setSelectedImage3] = useState(null);
const [description, setdescription] = useState(null);
  const velidateUser=useSelector(state=>state.velidateUser)
  const verifyEmail=useSelector(state=>state.verifyEmail)
  const navigate = useNavigate();
  
  const ref = useRef(null)
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
    document.title='Home - Social Paragon'
    function delay(time) {
      return new Promise(resolve => setTimeout(resolve, time));
    }
    gettingFriends();
    const waiting= async()=>{
await delay(5000)
  // console.log(user)
    // console.log(verified)
    if (localStorage.getItem("token")) {
      if(velidateUser!== "pending"){

        if (velidateUser === "true") {
          if (verifyEmail === "true") {
          } else {
            navigate("/verify/account");
            navigate(0);
          }
        } else {

          localStorage.removeItem("token");
          navigate("/login");
          navigate(0);
          // console.log(verified,user)
        }
        
      }else{

      }
    } else {
      navigate("/login");
      navigate(0);
    }

    }
    waiting();
  

    // if (!localStorage.getItem('token')) {
    //     navigate('/login');
    //     navigate(0);
    // }
    // eslint-disable-next-line
  }, [velidateUser]);
  const resizeFile = (file) => new Promise(resolve => {
    Resizer.imageFileResizer(file, 300, 300, 'WEBP', 100, 0,
    image => {
      Object.assign(image);
      resolve(image);
      
    },  "file" );

    });
  return(
    <div className="scroll display-flex ">
   
      <div  className=" home-post-section my-5  force-center-both-mobile">
       <div className="display-flex home-post-section-card flex-center-both flex-dir-col">
      <h3 className="txt-center my-2">Create new post</h3>
      <hr className="short-line "></hr>
      <div className="display-flex flex-center-both flex-dir-col my-2">

      <label htmlFor={"description"} className="big-font my-2" >Add description</label>
     
                <textarea  name='description' onChange={()=>{
                  setdescription(document.getElementById("description").value)
                  if(document.getElementById("description").value.length===180){
                    toast.warn("You have reached the maximum input limit 180 characters")
                  }
                }} maxLength="180" className='default-txt-area' id='description' placeholder={"Whats on your mind?."}/>
      </div>


        <input
      
      type="file"       
      ref={ref}
      id="image1"
    
      name="myImage"
      accept="image/*"
      style={{ display: "none" }}
      onChange={async(event) => {
        // console.log(event.target.files)
        let files=await event.target.files
        if(selectedImage){
          if(selectedImage2){
            if(selectedImage3){
          toast.warn("Only 3 files accepted.");
          event.preventDefault();
          }
        }
      }
        for (let i = 0; i < files.length; i++) {
         
              const file=files[i]
              const image = await resizeFile(file);
              if(!selectedImage){
                setSelectedImage(image);

              }else if(!selectedImage2){
                setSelectedImage2(image)
              }else if(!selectedImage3){
                setSelectedImage3(image)
              }
      }
      document.getElementById('image1').value = ''
   
    
      }}
      // value={selectedImage}
    />
    <div className="display-flex flex-wrap flex-center-both">
     {selectedImage&&<div className="cross-icon-parent-small mx-5 my-5">
   {selectedImage&&<img alt="not fount" width={"90px"} className="my-5" height={"90px"} src={URL.createObjectURL(selectedImage)} />}
   { selectedImage &&<button className="my-5 cross-icon" onClick={()=>{setSelectedImage(null); document.getElementById('image1').value = ''
}}>&#10060;</button> }
     </div>}
     {selectedImage2&&<div className="cross-icon-parent-small mx-5 my-5">
   {selectedImage2&&<img alt="not fount" width={"90px"} className="my-5" height={"90px"} src={URL.createObjectURL(selectedImage2)} />}
   { selectedImage2 &&<button className="my-5 cross-icon" onClick={()=>{setSelectedImage2(null); document.getElementById('image1').value = ''
}}>&#10060;</button> }
     </div>}
     {selectedImage3&&<div className="cross-icon-parent-small mx-5 my-5">
   {selectedImage3&&<img alt="not fount" width={"90px"} className="my-5" height={"90px"} src={URL.createObjectURL(selectedImage3)} />}
   { selectedImage3 &&<button className="my-5 cross-icon" onClick={()=>{setSelectedImage3(null); document.getElementById('image1').value = ''
}}>&#10060;</button> }
     </div>}
     </div>
     <div className=" my-5">
      {!selectedImage?<button className="btn-green mx-2" onClick={(e)=>{ e.preventDefault(); ref.current.click(); document.getElementById('image1').value = ''
}}>Add Images</button>:!selectedImage2?<button className="btn-green mx-2" onClick={(e)=>{ e.preventDefault(); ref.current.click(); document.getElementById('image1').value = ''
}}>Add more Images</button>:!selectedImage3?<button className="btn-green mx-2" onClick={(e)=>{ e.preventDefault(); ref.current.click(); document.getElementById('image1').value = ''
}}>Add more Images</button>:<></>}
      <button className="btn-green mx-2 " onClick={async(e)=>{ 
        e.preventDefault(); 
        const url="https://social-paragon-backend.vercel.app/api/posts/create/new"
        const formData = new FormData()
        formData.append('images',selectedImage)
        formData.append('images',selectedImage2)
        formData.append('images',selectedImage3)
        formData.append('description',description)
        const headers = {'auth-token': localStorage.getItem('token')}
        const response = await toast.promise( axios.post(url,formData,{headers: headers}),
        {
          pending: "Uploading Post",
          
        })
      
        if (response.data.success==="true") {      
         toast.success(`${response.data.message}`);
         document.getElementById("description").value=""
         setSelectedImage(null)
         setSelectedImage2(null)
         setSelectedImage3(null)
         setdescription(null)
       } else {
         toast.error(`${response.data.message}`);
       }
}}>Publish</button>

     </div>
    
       </div>
       <div>
          <Feed allFriends={allFriends}/>
        </div>
        </div>

      <div className="sticky-sidebar-home my-5">
      {allFriends && <div>{
        allFriends.success==="true"?<div>     <h2 className='max-width-card txt-center'>Friends</h2>
        {
      allFriends.allFriends.map((allFriends)=>{
        if(allFriends.friendsId.length===24){
          return (
            <div>
                {allFriends.status==="friends"?<><Contactsforhome key={allFriends.friendsId} allFriends={allFriends}/>{havefriends&& sethavefriends(null)}</>:<p></p>}
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

  )
};

export default Home;
