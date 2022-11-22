import React, {  useEffect, useRef, useState } from "react";
import Resizer from "react-image-file-resizer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
// const axios = require('axios').default;

const Afterverification = () => {
  const navigate=useNavigate();
  const ref = useRef(null)
  const getProfilePic=useSelector(state=>state.getMyprofilePic)

  const defaultimg= require('../default-profile-picture.png')
const [profileType, setprofileType] = useState(null);
const [selectedImage, setSelectedImage] = useState(defaultimg);
useEffect(() => {
  document.title='Upload Profile - Social Paragon'

}, [selectedImage]);

  const resizeFile = (file) => new Promise(resolve => {
    Resizer.imageFileResizer(file, 300, 300, 'WEBP', 100, 0,
    image => {
      Object.assign(image);
      resolve(image);
      
    },  "file" );

    });
    return (
    <div className="afterver-container max-width-card">
      <h2 className="my-5">Upload Profile Picture</h2>
      {selectedImage && (
        <div className="cross-icon-parent">
       {profileType&&<img alt="not fount" width={"200px"} className="my-5" height={"200px"} src={URL.createObjectURL(selectedImage)} />}
       {/* {profileType&&<img alt="not fount" width={"200px"} className="my-5" height={"200px"} src={selectedImage} />} */}
       {!profileType&&<img alt="not fount" width={"200px"} className="my-5" height={"200px"} src={getProfilePic} />}
        <br />
     { profileType &&<button className="my-5 cross-icon" onClick={()=>{setSelectedImage(null); setprofileType(null); navigate(0)
}}>&#10060;</button> }
        </div>
      )}
      <br />
      <input
      
        type="file"       
        ref={ref}
        name="myImage"
        accept="image/*"
        style={{ display: "none" }}
        onChange={async(event) => {
          const file=event.target.files[0];
          const image = await resizeFile(file);
          setprofileType(true)
          setSelectedImage(image);
        }}
        // value={selectedImage}
      />
      <div>
        
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
      <button className="btn-green mx-2" onClick={(e)=>{ e.preventDefault(); ref.current.click();
}}>Select Profile</button>
      <button   onClick={async()=>{
  const url="https://social-paragon-backend.vercel.app/api/profile/upload/propic"
  const formData = new FormData()
  formData.append('profilePic',selectedImage)
 const headers = {'auth-token': localStorage.getItem('token')}
 const response = await toast.promise( axios.post(url,formData,{headers: headers}),
  {
    pending: "Uploading image",
    
  })
  // const json = await response.json();
  
  if (response.data.success==="true") {
    function delay(time) {
      return new Promise((resolve) => setTimeout(resolve, time));
    }
   toast.success(`${response.data.message}`);
   await delay(1500);

   navigate("/edit/profile/details");
   navigate(0)
  
 } else {
   toast.error(`${response.data.message}`);


 }
}} disabled={!profileType} className="btn-green mx-2" >Upload</button>
</div>
<button className="btn-yellow mx-4" onClick={()=>{navigate("/edit/profile/details")}}>Skip</button>
    </div>
  );
};

export default Afterverification;