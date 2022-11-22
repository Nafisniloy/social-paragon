import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from 'react-redux'
const Verifynewuser = () => {
  const velidateUser=useSelector(state=>state.velidateUser)
  const verifyEmail=useSelector(state=>state.verifyEmail)
  const [SearchParams] = useSearchParams();
  let navigate = useNavigate();
  useEffect(() => {
    document.title=`Verifying Email - Social Paragon`

    const id = SearchParams.get("id");
    const str = SearchParams.get("str");

  const func=  async ()=>{
      const response = await toast.promise(
        fetch(`https://social-paragon-backend.vercel.app/api/auth/user/verify/${str}/${id}`, {
          method: "GET",
        }),
        {
          pending: "Verifying account",
          // success: 'Promise resolved 👌',
          // error: 'Promise rejected 🤯'
        }
      );
      const json = await response.json();
      console.log(json);
      function delay(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
      }
      if (json.success) {
         //delay function start
      //delay function end
        toast.success(`${json.message}`);
        localStorage.setItem("token", json.authtoken);
        //redirect
        await delay(1000);
        navigate("/upload/profile/image");
      } else {
        toast.error(`${json.message}`);
        localStorage.removeItem("token", json.authtoken);
        //redirect
        await delay(3000);
        navigate("/signup");
     
      }
  }
  func();
  if(velidateUser!== "pending"){

    if (velidateUser === "true") {
      if (verifyEmail === "true") {
       const navigatetohomeuserifverified= async()=>{
        function delay(time) {
          return new Promise((resolve) => setTimeout(resolve, time));
        }
         await delay(6000);
         navigate("/");
       }
       navigatetohomeuserifverified();
      }
    }
  }
  // eslint-disable-next-line
}, []);
 


  return (
    <div>
      <div className="colorful-body">
        <img
          src={"https://paragon.learnfacts.xyz/email.png"}
          alt="not foud"
          id="email-logo"
        />
        <h3 className="float txt-center color-pink ver-email-size">
          Please wait while verifying your email.
        </h3>
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
  );
};

export default Verifynewuser;
