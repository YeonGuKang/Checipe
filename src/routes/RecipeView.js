import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link, BrowserRouter } from 'react-router-dom';
import checipe_logo from './image/chaecipielogo.png';
import rec from "./Recipe.module.css";
import { authService , dbService } from '../firebase';
import {ReactComponent as Msvg} from './image/menu.svg'
import vegetarian from './icons/vegetarian.svg';
import veganx from './icons/veganx.svg';
import vegano from './icons/vegano.svg';
import lactox from './icons/lactox.svg';
import lactoo from './icons/lactoo.svg';
import ovox from './icons/ovox.svg';
import ovoo from './icons/ovoo.svg';
import lactovox from './icons/lactovox.svg';
import lactovoo from './icons/lactovoo.svg';
import pollox from './icons/pollox.svg';
import polloo from './icons/polloo.svg';
import pescox from './icons/pescox.svg';
import pescoo from './icons/pescoo.svg';
import polpescox from './icons/polpescox.svg';
import polpescod from './icons/polpescoo.svg';
import vegeline from './icons/vegeline.svg';
import flexix from './icons/flexix.svg';
import flecxio from './icons/flexio.svg';
import Rlist from './Rlist'


const RecipeView = () => {
  
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


    
    
    // 처음에 mount 됐을때 실행해줌으로써 데이터를 불러옴
    useEffect(()=>{
    
 
    },[]);
  
  // 로그아웃을 위한 함수를 선언
  const onLogOutClick = () => authService.signOut();

  // const toggleBtn = document.querySelector("menubtn");
  // const nav = document.querySelector('nav');
  // const login = document.querySelector('login');
  // toggleBtn.addEventListener('click', () => {
  //   nav.classList.toggle('active');
  //   login.classList.toggle('active');
  // });


  
   


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
              <div className={rec.whiteselect}>
              <div className={rec.vegetarianbtn}>
                             
                                                                   
            </div>
            <div className={rec.originalbtn}>
        
            </div>
              </div>
              </div>
              <div>
              {/* <div className={rec.sectiondefault}></div> */}
              <div className={rec.space}></div>
          {/* 버튼을 클릭했을때 name의 값을 getChosen으로 넘겨줌 */}
          <div className={rec.section}>
            {/* 사용자가 클릭한 type에 맞는 객체 정보를 쭉 나열해서 보여줌 */}
            <div className={rec.sectionplace}>
              {/* chosen객체에 존재하는 모든 document에 대해서 Show로 각각 지정해주고 , 그 값들을 나열해준다. key값은 위에서 넣어준 id값 */}
             
              
              
            </div>
            </div>

          </div>            
            </div>
            
          
            
            
    );
}        


 export default RecipeView;
