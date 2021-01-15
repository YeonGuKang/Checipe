import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, BrowserRouter } from 'react-router-dom';
import { authService } from '../firebase';

import "../routes/style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Loginform from '../routes/Loginform';
import Mainpage from '../routes/Mainpage';

console.log("run App");

function App() {
  console.log("run App fuction");
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  
  return(
    <BrowserRouter>
    {/* url path가 아래로 바뀔때 마다 component에 맞는 화면을 보여줌 */}
     <Route path="/" component = {Mainpage} exact />
     <Route path="/Loginform" component ={Loginform} />

  </BrowserRouter>

  );
  }  


export default App;
