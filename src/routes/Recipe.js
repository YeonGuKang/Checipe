import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link, BrowserRouter } from 'react-router-dom';
import checipe_logo from './image/chaecipielogo.png';
import image2 from './image/image2.jfif';
import "./style.css";
import { authService } from '../firebase';
// react에서 slick을 사용하기 위한 import 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

  
const Recipe = () => {

  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
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
    
  }, []);

  // 로그아웃을 위한 함수를 선언
  const onLogOutClick = () => authService.signOut();

    return(
            <div className="wrap">
                  <div className="half_bg">   
                      <div className="header">
                          <div className="logo">
                              {/* js에서는 img를 이런식으로 import해서 불러온다. */}
                              <img
                                src={ checipe_logo }
                                width='100px'
                                height='100px'
                                alt= 'logo image'/>
                          </div>
                              <div>
                                  <ul className="nav">
                                    {/* 수정해야하는 부분 아래처럼 Link가 li를 덮어야한다. */}
                                      <li><Link to="#" />About</li>
                                       <li><Link to="#" />Recipe</li>
                                       <li><Link to="#" />Notice</li>
                                       <li><Link to="#" />Open</li>
                                  </ul>
                              </div>
                         
                              <div className="login">
                                {/* 로그인이 되어있는 상태라면 로그아웃 , 아니라면 로그인 버튼을 보여줌 */}
                                {isLoggedIn ?  <Link to="/Checipe">
                                  {/* 위에 선언한 로그아웃함수를 클릭했을 때 실행 */}
                                     <li onClick={onLogOutClick}>로그아웃</li>
                                </Link> : <Link to="/Loginform">
                                     <li>로그인</li>
                                </Link> }

                               
                              </div>
                           
                   </div>
              </div>  
                  
                  
                   
                  </div>


    );
    
}         


 export default Recipe;