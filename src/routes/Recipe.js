import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link, BrowserRouter } from 'react-router-dom';
import checipe_logo from './image/chaecipielogo.png';
import image2 from './image/image2.jfif';
import rec from "./Recipe.module.css";
import { authService } from '../firebase';
// react에서 slick을 사용하기 위한 import 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {ReactComponent as Msvg} from './image/menu.svg'

  
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

  const toggleBtn = document.querySelector("menubtn");
  const nav = document.querySelector('nav');
  const login = document.querySelector('login');
  toggleBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
    login.classList.toggle('active');
  });
    return(
            <div className={rec.wrap}>              
              <nav className={rec.header}>                                  
                {/* js에서는 img를 이런식으로 import해서 불러온다. */}
                <a href="/Checipe">
                  <img                  
                  className={rec.logo_img}
                  src={ checipe_logo }
                  width='100px'
                  height='100px'
                  />
                </a>
                <ul className={rec.nav}>
                  {/* 수정해야하는 부분 아래처럼 Link가 li를 덮어야한다. */}
                  <li><Link to="#" />About</li>
                  <li><Link to="/Recipe" />Recipe</li>
                  <li><Link to="#" />Notice</li>
                  <li><Link to="#" />Open</li>
                </ul>
                <div className={rec.login}>
                  {/* 로그인이 되어있는 상태라면 로그아웃 , 아니라면 로그인 버튼을 보여줌 */}
                  {isLoggedIn ?  <Link to="/Checipe">
                    {/* 위에 선언한 로그아웃함수를 클릭했을 때 실행 */}
                        <li onClick={onLogOutClick}>로그아웃</li>
                  </Link> : <Link to="/Loginform">
                        <li>로그인</li>
                  </Link> }
                </div>
                <a href='#' className={rec.menubtn} onClick>
                  <Msvg className></Msvg>
                </a>
              </nav>
              <div className={rec.half_bg} />   
            </div>
    );
}         


 export default Recipe;