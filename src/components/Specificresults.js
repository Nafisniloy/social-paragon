import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Specificresults = (props) => {
    const navigate= useNavigate()
    const [profile, setprofile] = useState("https://paragon.learnfacts.xyz/default-profile-picture.png");
    const { name } = props;
    const asyncfunc= async()=>{
        const url = `https://social-paragon-backend.vercel.app/api/profile/others/profile/image/`;

        const headers = { "Content-Type": "application/json" };

        const res = await fetch(url, {
          method: "POST",
          headers: headers,
          body: JSON.stringify({ id: `${name._id}` }),
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
    }
    useEffect(() => {
        asyncfunc()
       
    }, []);
  return (
    <div className='display-flex margin-between'>
        <div className='display-flex horizontal-center'>

        <img className='logo-main profile-round cursor-pointer' alt='Profile Pic' onClick={()=>{
                navigate(`/user/profile/?id=${name._id}`)
            }} src={profile}/>
        <h3 className="mx-5 cursor-pointer" onClick={()=>{
                navigate(`/user/profile/?id=${name._id}`)
            }}>{name.name}</h3>
        </div>
        <div className='display-flex horizontal-center'>
            {/* <button className='btn-green mx-2'>Add Friend</button> */}
            <button className='btn-green mx-2' onClick={()=>{
                navigate(`/user/profile/?id=${name._id}`)
            }} >View Profile</button>
        </div>
        
    </div>

  )
}

export default Specificresults