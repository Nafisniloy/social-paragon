import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwt_decode from "jwt-decode";

const Signup = (props) => {
  function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }
  let navigate = useNavigate();
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
    document.title=`Create a new account - Social Paragon`

    if (localStorage.getItem("token")) {
      navigate("/");
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
  const [isVisible, setVisible] = useState(false);
  const showHidePass = () => {
    let checkBox = document.getElementById("exampleCheck1");

    if (checkBox.checked === true) {
      setVisible(!isVisible);
    } else {
      setVisible(false);
    }
  };

  const [creditionals, setcreditionals] = useState({
    email: "",
    password: "",
    name: "",
    dateOfBirth: "",
    gender: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    // const Creditionals= {email:"",password:""}
    const response = await toast.promise(
      fetch(`https://social-paragon-backend.vercel.app/api/auth/createuser/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: creditionals.email,
          password: creditionals.password,
          name: creditionals.name,
          dateOfBirth: creditionals.dateOfBirth,
          gender: creditionals.gender,
        }),
      }),
      {
        pending: "Creating account",
        // success: 'Promise resolved 👌',
        // error: 'Promise rejected 🤯'
      }
    );
    const json = await response.json();
    // console.log(json);
    if (json.success) {
      toast.success(`${json.message}`);
      localStorage.setItem("token", json.authtoken);
      //redirect
      await delay(1000);
      navigate("/verify/account");
      // props.showAllert(`${json.message}`,"success")
    } else {
      toast.error(
        `Sorry! An account with this email already exist. Please login.`
      );
      // props.showAllert("Sorry! An account with this email already exist. Please login.","danger")
      // alert('An account with this email already exist. Please login.')
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
        <div className="display-flex flex-dir-col m-auto">
          <h2 className=" my-2 mb-2">Create an account</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label my-2 bold ">
                Username
              </label>
              <br />
              <input
                type="name"
                className="form-control i-pad input"
                name="name"
                onChange={onChange}
                id="name"
                minLength={1}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label my-2 bold ">
                Email address
              </label>{" "}
              <br />
              <input
                type="email"
                className="form-control i-pad input"
                name="email"
                onChange={onChange}
                id="email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="dateOfBirth" className="form-label my-2 bold ">
                Date of Birth
              </label>

              <br />
              <input
                type="date"
                className="form-control i-pad input"
                name="dateOfBirth"
                onChange={onChange}
                id="dateOfBirth"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="" className="form-label my-2 bold ">
                Gender
              </label>
              <br />

              <div className="flex flex-dir-row">
                <div className="dis-in-block gend-btn">
                  <input
                    type="radio"
                    className="form-control i-pad mx-2"
                    name="gender"
                    onChange={onChange}
                    id="Male"
                    value={"Male"}
                    required
                  />
                  <label htmlFor="Male">Male </label>
                </div>
                <div className="dis-in-block gend-btn">
                  <input
                    type="radio"
                    className="form-control i-pad mx-2"
                    name="gender"
                    onChange={onChange}
                    id="Female"
                    value={"Female"}
                    required
                  />
                  <label htmlFor="Female">Female </label>
                </div>
                <div className="dis-in-block gend-btn">
                  <input
                    type="radio"
                    className="form-control i-pad mx-2"
                    name="gender"
                    onChange={onChange}
                    id="Others"
                    value={"Others"}
                    required
                  />
                  <label htmlFor="Others">Others </label>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label my-2 bold ">
                Password
              </label>{" "}
              <br />
              <input
                type={!isVisible ? "password" : "text"}
                className="form-control i-pad input"
                name="password"
                onChange={onChange}
                id="password"
                minLength={5}
                required
              />
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input  mx-2"
                id="exampleCheck1"
                onChange={showHidePass}
              />
              <label className="form-check-label bold" htmlFor="exampleCheck1 ">
                Show password
              </label>
            </div>
            <button type="submit" className="btn btn-primary my-2">
              Signup
            </button>
          </form>
          <p>Or</p>
          <div id="signin-div">

</div>
          <p className="my-2">
            Already have an account?{" "}
            <Link to={"/login"} className="default-li">
              {" "}
              Login here
            </Link>
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

export default Signup;
