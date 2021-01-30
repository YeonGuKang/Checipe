import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link, BrowserRouter, Redirect } from 'react-router-dom';
import checipe_logo from './image/chaecipielogo.png';
import rec from "./Recipe.module.css";
import { authService , dbService } from '../firebase';
import {ReactComponent as Msvg} from './image/menu.svg'

// 게시글을 보는 component

const View_borad = () => {

    const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

    //  원하는 게시글을 보여주기 위함
  const [board, setboard] = useState([]);

    // 사용자가 선택한 게시글이 어떤것인지 url parmeter로 판단하기 위함
    let now_url = window.location.href.split('/')

    // 일단은 4번째 배열에 있는것이 그 parmeter임
    const chosen_url = now_url[4];
  
  useEffect(() => {
    //   사용자가 선택한 게시글에 맞게 데이터를 불러옴
    const docRef = dbService.collection("게시글").doc(chosen_url)
    docRef.get().then(function(doc) {  setboard(doc.data()); });

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
        <div className={rec.wrap}> 
           <div className={rec.half_bgs}>        
          <nav className={rec.header}> 
          <div className={rec.Rlogo}>                               
            {/* js에서는 img를 이런식으로 import해서 불러온다. */}
            <a href="/Checipe">
              <img                  
              className={rec.logo_img}
              src={ checipe_logo }
              width='220vw'
              height='220vh'
              />
            </a>
            </div>  
            <ul className={rec.nav}>
              <li><Link to="/About">About</Link></li>
              <li><Link to="/Recipe">Recipe</Link></li>
              <li><Link to="/Notice">Notice</Link></li>
              <li><Link to="/Open">Open</Link></li>
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
          {/* 게시글을 보여주기 위한 middle부분 */}
          <div className = {rec.middle}>
           
            <div>
                <h3>{board.createdAt}</h3>
                <h1>{board.title}</h1>
                <h2>{board.content}</h2>
        </div>
          </div> 

          </div>           
          <div className={rec.half_bg} />  
        </div>
        
);
}


export default View_borad;