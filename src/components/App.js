import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { BrowserRouter as Router, Route, Switch, Link, BrowserRouter , Redirect } from 'react-router-dom';
import { authService } from '../firebase';
=======
import { BrowserRouter as Router, Route, Switch, Link, BrowserRouter } from 'react-router-dom';
import { authService } from '../firebase';

>>>>>>> ad1295a... Projectingggging
import "../routes/style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Loginform from '../routes/Loginform';
import Mainpage from '../routes/Mainpage';
<<<<<<< HEAD
import Recipe from '../routes/Recipe';
=======
>>>>>>> ad1295a... Projectingggging

console.log("run App");

function App() {
  console.log("run App fuction");
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
<<<<<<< HEAD
      console.log("changed");
      if (user) {
        console.log("user login")
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        console.log("user logout")
        setIsLoggedIn(false);
      }
      setInit(true);
       
    });
    
=======
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
>>>>>>> ad1295a... Projectingggging
  }, []);
  
  return(
    <BrowserRouter>
<<<<<<< HEAD
    {/* 만약 로그인이 되면 Mainpage로 Redirect 아닌경우 Loginform을 보여줌 */}
    {/* {isLoggedIn ? (<Redirect from="/Loginform" to = "/Checipe" /> ) : null } */}

    {/* url path가 아래로 바뀔때 마다 component에 맞는 화면을 보여줌 */}
     <Route path="/Checipe" component = {Mainpage} exact />
     <Route path="/Recipe" component = {Recipe} />
     <Route path="/Loginform" component = {Loginform} />
=======
    {/* url path가 아래로 바뀔때 마다 component에 맞는 화면을 보여줌 */}
     <Route path="/" component = {Mainpage} exact />
     <Route path="/Loginform" component ={Loginform} />

>>>>>>> ad1295a... Projectingggging
  </BrowserRouter>

  );
  }  


export default App;
