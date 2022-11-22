import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwt_decode from "jwt-decode";

const Login = (props) => {
  function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }
  
  const navigate = useNavigate();
  const handleResponse= async(response)=>{
    var userObj = jwt_decode(response.credential)
    const res = await toast.promise(
      //  fetch(`http://localhost:5000/api/auth/login/`, {
       fetch(`https://social-paragon-backend.vercel.app/api/auth/signin/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: userObj,
          }),
        }),  {
          pending: 'Verifying account',
          // success: 'Promise resolved 👌',
          // error: 'Promise rejected 🤯'
        }
        );
         const json= await res.json()
         if(json.success==="true"){
          localStorage.setItem("token", json.authtoken);
          if(json.status==="alreadyuser"){
          toast.success("Logged in successfully",{autoClose:2000});
          await delay(1000);
          navigate('/')
          navigate(0);

          }else if(json.status==="newuser"){
            toast.success("Account created successfully",{autoClose:2000});
            await delay(1000);
            navigate('/upload/profile/image')
            navigate(0);

          }
         }else{
          toast.error(res.message)
         }
  }
  useEffect(() => {
    document.title='Login - Social Paragon'

    if (localStorage.getItem("token")) {
      navigate("/");
      navigate(0);
    }
    /*global google*/
    google.accounts.id.initialize({
      client_id:"488661441869-eo8hk6p8qpva053u6h54pi1ovetsl30j.apps.googleusercontent.com",
      callback: handleResponse
    })
    google.accounts.id.renderButton(document.getElementById('signin-div'),{
      theme:"outline", size:"large"
    })

    // eslint-disable-next-line
  }, []);

  const refreshPage = async () => {
    navigate("/");
    navigate(0);
  };
  const [isVisible, setVisible] = useState(false);
  const showHidePass = () => {
    let checkBox = document.getElementById("exampleCheck1");

    if (checkBox.checked === true) {
      setVisible(!isVisible);
    } else {
      setVisible(false);
    }
  };
  const [creditionals, setcreditionals] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const Creditionals= {email:"",password:""}
    const response = await toast.promise(
  //  fetch(`http://localhost:5000/api/auth/login/`, {
   fetch(`https://social-paragon-backend.vercel.app/api/auth/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: creditionals.email,
        password: creditionals.password,
      }),
    }),  {
      pending: 'Verifying account',
      // success: 'Promise resolved 👌',
      // error: 'Promise rejected 🤯'
    }
    );
    const json = await response.json();

    if (json.success) {
      //redirect
      localStorage.setItem("token", json.authtoken);
      toast.success("Logged in successfully",{autoClose:2000});
      await delay(1000);
      refreshPage();
    } else {
        // toast.error("Invalid Email or passsword. Please try again.");     
        toast.error(json.error)
    }
  };
  const onChange = (e) => {
    setcreditionals({ ...creditionals, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="display-flex flex-center-both big-my flex-riv-col mb-long">
        <div className=" m-auto">
          <img
            src={"sign-up-logo.png"}
            alt="not foud"
            id="signup-logo"
            width={380}
          />
        </div>
        <div className="display-flex flex-dir-col m-auto ">
          <h2 className=" my-2 mb-2">Login to Social Paragon</h2>
          <form onSubmit={handleSubmit} className="">
            <div className="mb-3 ">
              <label htmlFor="email" className="form-label my-2 bold ">
                Email address
              </label>
              <br />
              <input
                type="email"
                className="form-control i-pad input"
                placeholder="Enter your Email"
                name="email"
                onChange={onChange}
                id="email"
                aria-describedby="emailHelp"
                required
              />
            </div>
            <div className="mb-3 my-2">
              <label htmlFor="password" className="form-label  my-2 bold">
                Password
              </label>
              <br />
              <input
                type={!isVisible ? "password" : "text"}
                placeholder="Enter your password"
                className="form-control i-pad input"
                name="password"
                onChange={onChange}
                id="password"
                required
              />
            </div>
            <div className="mb-3 form-check my-2">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
                onChange={showHidePass}
              />
              <label className="form-check-label mx-2" htmlFor="exampleCheck1">
                Show Password
              </label>
            </div>
            <button
              type="submit"
              className="btn btn-primary my-2"
              onSubmit={handleSubmit}
            >
              Login
            </button>
          </form>
          <p>Or</p>
          <div id="signin-div">

          </div>
          <p className="my-2">
            Don't have an account? <Link to={"/signup"} className="default-li" > Signup Here</Link>
          </p>
        </div>
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
      <Footer />
    </>
  );
};

export default Login;
