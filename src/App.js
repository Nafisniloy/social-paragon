import { BrowserRouter,  Route,  Routes } from 'react-router-dom';
import './App.css';
import Aftersignup from './components/Aftersignup';
import Afterverification from './components/Afterverification';
import Contactsformessages from './components/Contactsformessages';
import Conversation from './components/Conversation';
import Editprofiledetails from './components/Editprofiledetails';
// import Footer from './components/Footer';
import Forgetpassverified from './components/Forgetpassverified';
import Friends from './components/Friends';
import Friendsoffriends from './components/Friendsoffriends';
import Home from './components/Home';
import Login from './components/Login';
import Menu from './components/Menu';
import Navbar from './components/Navbar';
import Othersprofile from './components/Othersprofile';
import Profile from './components/Profile';
import Refresh from './components/Refresh';
import Searchresult from './components/Searchresult';
import Signup from './components/Signup';
import Tempviewprofile from './components/Tempviewprofile';
import Uploadpropic from './components/Uploadpropic';
import {io} from 'socket.io-client'
import Verifynewuser from './components/Verifynewuser';
import { useEffect, useState } from 'react';

function App() {
  const [socket, setsocket] = useState(null);
  useEffect(() => {
    setsocket(io.connect('http://localhost:3530', {reconnect: true}))
    // setsocket(io.connect('https://social-paragon-backend.vercel.app/', {reconnect: true}))
  
  }, []);
  useEffect(() => {
    const asyncfunc= async()=>{
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
      // console.log(json)
     socket && socket.emit("sendingId",`${json.myProfile.userId}`)
    }
    asyncfunc()
  }, [socket]);
  return (
    <div className="App">
     <BrowserRouter>
     <Navbar socket={socket}/>
     <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route path='/user/forgetpass/verified' element={<Forgetpassverified/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/user/verify/account' element={<Verifynewuser/> }/>
      <Route path='/verify/account' element={<Aftersignup/> }/>
      <Route path='/signup' element={<Signup/>} />
      <Route path='/friends' element={<Friends/>} />
      <Route path='/friends/user' element={<Friendsoffriends/>} />
      <Route path='/refresh' element={<Refresh/>} />
      <Route path='/menu' element={<Menu/>} />
      <Route path='/search' element={<Searchresult />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/messages/user'  element={<Conversation socket={socket}/>} />
      <Route path='/messages' element={<Contactsformessages />} />
      <Route path='/user/profile' element={<Othersprofile />} />
      <Route path='/temproute' element={<Tempviewprofile />} />
      <Route path='/upload/profile/image' element={<Afterverification />} />
      <Route path='/profile/update/image' element={<Uploadpropic />} />
      <Route path='/edit/profile/details' element={<Editprofiledetails />} />
      
      {/* <Route
        path="*"
        element={<Navigate to="/" replace />}
    /> */}
     </Routes>
     {/* <Footer/> */}
     </BrowserRouter>
    </div>
  );
}

export default App;


