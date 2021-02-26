import React, { useState, useEffect } from 'react';
import { authService } from '../firebase';
import "../routes/style/style.css";
import { BrowserRouter as Router, Route, Switch, Link, BrowserRouter } from 'react-router-dom';
import checipelogo from '../routes/image/checipelogo.svg';

import "../routes/style/style.css";

import menu from "../routes/style/MenuBar.module.css";



const Header = () => {
 
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const [IsManager, setIsManger] = useState(false);
  // 운영자 UID 추가
  const Manager = ['swe0dmffFQcoqpEUJ7fHtXYimEJ3','WFS2QtP4kEN3IWscNXtD1Ciso1t2','8s8IU2fnLPe5q0nIUheiZkwpMOk2','7a2QhDJ4gjbysYsQoFP5QbAIYhz2']
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
    

      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
        // 운영자 판단
        if(Manager.includes(user.uid))
        {
          setIsManger(true);
        }
      } else {
        setIsLoggedIn(false);
        setIsManger(false);
      }
      setInit(true);
       
    });
    
  }, []);

    // 로그아웃을 위한 함수를 선언
    const onLogOutClick = () => authService.signOut();


  return(
    // 로그인시 일반사용자 , 운영자를 구분
    <div>
     {isLoggedIn ? IsManager ? <h>운영자입니다.</h> : <h>일반사용자입니다.</h> : null}
    <div className={menu.header}>
        <div className={menu.Rlogo}>
            {/* js에서는 img를 이런식으로 import해서 불러온다. */}
            <a href="/Checipe">
            <img
              src={ checipelogo }
              width='200vw'
              height='200vh'/>
              </a>
        </div>
            <div>
                <ul className={menu.nav}>
                    <li><Link to="/About_Open">About</Link></li>
                    <li><Link to="/Recipe">Recipe</Link></li>
                     <li><Link to= {{
                       pathname: "/Notice",
                       state: {
                         manager: Manager
                       }
                     }} >Notice</Link></li>
                     <li><Link to="/About_Open">Open</Link></li>
                </ul>
            </div>
       
            <div className={menu.login}>
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


           
  );
  }  


export default Header;