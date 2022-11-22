import React, { useEffect, useState } from "react";
// eslint-disable-next-line
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaHome ,FaUserFriends } from "react-icons/fa";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { GoThreeBars } from "react-icons/go";
import { bindActionCreators } from "redux";
import { actionCreators } from "../states/index";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import logo from "../paragon-logo.png";
const Navbar = (props) => {
  const navigate = useNavigate();
  const {socket}= props;
  function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }
  const [query, setquery] = useState(null);
const [loading, setloading] = useState(true);
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const velidateUser = useSelector((state) => state.velidateUser);
  // eslint-disable-next-line
  const verifyEmail = useSelector((state) => state.verifyEmail);
  // eslint-disable-next-line
  const getMyProfil = useSelector((state) => state.getMyProfile);
  const { verifyUser, verifiedEmail, getMyProfile, getProfilePic } =
    bindActionCreators(actionCreators, dispatch);
  const [verified, setverified] = useState("pending");
  const [user, setuser] = useState("pending");
  const [myprofile, setmyprofile] = useState(null);
  const [profile, setprofile] = useState(
    "https://paragon.learnfacts.xyz/default-profile-picture.png"
  );
  const picfunc = async () => {
    const url = `https://social-paragon-backend.vercel.app/api/profile/get/profile/image/`;

    const headers = { "auth-token": localStorage.getItem("token") };

    const response = await fetch(url, { headers: headers });
// console.log(response)
if(response.status!==200){
  setprofile("https://paragon.learnfacts.xyz/default-profile-picture.png");
    getProfilePic("https://paragon.learnfacts.xyz/default-profile-picture.png")
}else{
  
  const funct = async () => {
    let myBlob = await response.blob();
    var objectURL = URL.createObjectURL(myBlob);
    setprofile(objectURL);
    getProfilePic(objectURL);
   

  };
  funct();
}
  };
 function showNotification(){
 

 }
  useEffect(()=>{
 socket && socket.on("receivedMessage",()=>{
  if(Notification.permission==="granted"){
    var notification= new Notification("Social Paragon",{
               body:"You a have new message."
             })
          
    // const greeting = new Notification('Hi, How are you?',{
    //   body: 'Have a good day',
    //   icon: './img/goodday.png'
    // });
          
            }
    })
  },[socket])
  useEffect(() => {
    
    const func = async () => {
      const response = await fetch(
        `https://social-paragon-backend.vercel.app/api/auth/verify/user/`,
        {
          method: "GET",
          headers: {
            "auth-token": `${localStorage.getItem("token")}`,
          },
        }
      );
      const json = await response.json();
      if (json.user === "true") {
        if (json.verified === "true") {
          const newverified = true;
          const newuser = true;
          setverified(newverified);
          setuser(newuser);
        } else {
          const newverified = false;
          const newuser = true;
          setverified(newverified);
          setuser(newuser);
        }
      } else {
        const newverified = false;
        const newuser = false;
        setverified(newverified);
        setuser(newuser);
      }
    };
    func();
    const fetchProfile = async () => {
      const response = await fetch(
        "https://social-paragon-backend.vercel.app/api/profile/get/details",
        {
          method: "GET",
          headers: {
            "auth-token": `${localStorage.getItem("token")}`,
          },
        }
      );
      const json = await response.json();
      setloading(null)

      setmyprofile(json);
    
    };
    fetchProfile();
    picfunc();
    if(Notification.permission==="granted"){

    }else if(Notification.permission!=="denied"){
      console.log("default"+Notification.permission)
      Notification.requestPermission().then(permission=>{
      })
    }else{
    }
    // eslint-disable-next-line
  }, []);

  // console.log(velidateUser)
  // console.log(verifyEmail)
  getMyProfile(myprofile);

  if (localStorage.getItem("token")) {
    // eslint-disable-next-line
    async function navSlide() {
      const burger = await document.getElementById("burger");
      const nav = document.getElementById("nav-links");
      const navLinks = document.querySelectorAll(".nav-links li");

      const onClick = () => {
        //Toggle Nav
        nav.classList.toggle("nav-active");

        //Animate Links
        navLinks.forEach((link, index) => {
          if (link.style.animation) {
            link.style.animation = "";
          } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${
              index / 7 + 0.5
            }s`;
          }
        });
        //Burger Animation
        burger.classList.toggle("toggle");
      };
      onClick();
    }
    if (user !== "pending") {
      if (user) {
        if (verified) {
          verifiedEmail("true");
          verifyUser("true");

          return (

            <div className=" sticky-nav">
              <div className="display-flex margin-between nav-div ">
                <div className="display-flex">
                  <img
                    src={logo}
                    className="logo-main mf-logo "
                    onClick={() => {
                      navigate("/");
                    }}
                    alt="Social Paragon"
                  />
                  <form className="form">
                    <input
                      type="search"
                      className="search-input"
                      id="search-input"
                      name="query"
                      required
                      placeholder="Search..."
                      onChange={(e)=>{
                          setquery({[e.target.name]: e.target.value })
                      }}  
                    />
                    <button  className="search-submit" onClick={async(e)=>{
                      e.preventDefault()
                     if(document.getElementById('search-input').validity.valid){

                      //  navigate(0)
                       navigate('/refresh')
                       await delay(5);
                       navigate(`/search/?query=${query.query}`)
                       document.getElementById('search-input').value = ""
                      //  navigate(`/user/profile/?id=${id}`)
                     }
                    
                    }}>
                      Search
                    </button>
                  </form>
                </div>
                <div className="display-flex flex-center-both">
                <FaHome className="nav-icons " onClick={()=>{
                  navigate("/")
                }} />
                <FaUserFriends className="nav-icons " onClick={()=>{
                  navigate("/friends")
                }} />
                <BiMessageRoundedDetail className="nav-icons" onClick={()=>{
                  navigate("/messages")
                }} />
                <GoThreeBars className="nav-icons " onClick={()=>{
                  navigate("/menu")
                }} />
                </div>
                <div className="dropdown">
 
                <img
                  alt="Profile Pic"
                  src={profile}
                  className="logo-main mf-logo profile-round dropbtn"
                />
  <div className="dropdown-content">
    <Link to="/profile">Profile</Link>
    <Link onClick={
      ()=>{
        localStorage.removeItem('token')
        navigate('/login')
        navigate(0)
      }
      }>Log Out</Link>
    {/* <Link to="/">Link 3</Link> */}
  </div>
</div>
              </div>
              <hr className="simple-line"></hr>
              <div className="display-flex margin-between">

            
              <FaHome className="nav-icons-mobile " onClick={()=>{
                  navigate("/")
                }} />
                <FaUserFriends className="nav-icons-mobile " onClick={()=>{
                  navigate("/friends")
                }} />
                <BiMessageRoundedDetail className="nav-icons-mobile" onClick={()=>{
                  navigate("/messages")
                }} />
                <GoThreeBars className="nav-icons-mobile " onClick={()=>{
                  navigate("/menu")
                }} />
                  </div>
              <hr className="simple-line-mobile "></hr>
              { loading &&   <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <CircularProgress color="inherit" />
    </Backdrop>}
            </div>
          );
        } else {
          verifiedEmail("false");
          verifyUser("true");
          return (
            <nav>
              <div className="logo">
                <h4>Social Paragon</h4>
              </div>
              { loading &&   <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <CircularProgress color="inherit" />
    </Backdrop>}
            </nav>
          );
        }
      } else {
        verifiedEmail("false");
        verifyUser("false");
        return (
          <nav>
            <div className="logo">
              <h4>Social Paragon</h4>
            </div>
            { loading &&   <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <CircularProgress color="inherit" />
    </Backdrop>}
          </nav>
        );
      }
    } else {
      return (
        <nav>
          <div className="logo">
            <h4>Social Paragon</h4>
          </div>
          { loading &&   <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <CircularProgress color="inherit" />
    </Backdrop>}
        </nav>
      );
    }
  } else {
    return (
      <nav>
        <div className="logo">
          <h4>Social Paragon</h4>
        </div>
       
      </nav>
    );

  }
  //search menu start here

  // const showmorenavcss = window.getComputedStyle(morecategories);
  // const showmorenavcssdisplay = showmorenavcss.getPropertyValue('display');
  //  const search = document.getElementById('search');
  //   const searchicon = document.getElementById('searchicon');
  //   const searchiconfalse = document.getElementById('searchiconfalse')
  //   const searchiconimg = document.getElementById('searchiconimg')
  //   const searchcross = document.getElementById('searchcross')

  //  function opensearchform() {

  //      if (document.getElementById('search').className === "close3") {
  //       document.getElementById('search').classList.remove("close3")
  //       document.getElementById('searchicon').classList.remove("close3")
  //       document.getElementById('searchiconimg').classList.remove("close3")
  //          document.getElementById('search').className = "open3";
  //          document.getElementById('searchiconimg').className = "open3";
  //          document.getElementById('searchcross').className = "open3";

  //          document.getElementById('searchicon').className = "open3";
  //          document.getElementById('searchiconfalse').className = "close3"

  //      }
  //      // else {

  //      //     search.classList.remove("open3");
  //      //     search.className = "close3";

  //      // }
  //  }
  //  function closesearchform() {
  //      if (document.getElementById('searchcross').className === "close3") {
  //       document.getElementById('search').classList.remove("open3")
  //       document.getElementById('searchicon').classList.remove("open3")
  //       document.getElementById('searchiconimg').classList.remove("open3")
  //          document.getElementById('search').className = "close3";
  //          document.getElementById('searchiconimg').className = "close3";
  //          document.getElementById('searchcross').className = "close3";

  //          document.getElementById('searchicon').className = "close3";
  //          document.getElementById('searchiconfalse').className = "open3"
  //      }
  //  }

  //search menu end here
};

export default Navbar;
