import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link, BrowserRouter } from 'react-router-dom';
import checipelogo from './image/checipelogo.svg';
import rec from "./Recipe.module.css";
import menu from "./MenuBar.module.css";
import { authService , dbService } from '../firebase';
import {ReactComponent as Msvg} from './image/menu.svg'




const RecipeView = () => {
  
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  //  원하는 게시글을 보여주기 위함
  const [board, setboard] = useState(Object);
    // 사용자가 선택한 게시글이 어떤것인지 url parmeter로 판단하기 위함
    let now_url = window.location.href.split('/')
    

    // 4번째는 비건의 종류 (콜렉션을 위함) 5번째는 음식의 종류 (doc를 위함)
    const chosne_type = now_url[4];
    let chosen_title = now_url[5];

    // 한글이므로 decode를 해줘야함
    chosen_title= decodeURIComponent(chosen_title);
    

  useEffect(() => {
        //  사용자가 선택한 음식에 맞게 데이터를 불러옴
        const docRef = dbService.collection(chosne_type).doc(chosen_title)
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

  const handleImgError = (e) => {
    e.target.src = 'https://previews.123rf.com/images/alexwhite/alexwhite1501/alexwhite150104186/35585441-%EC%98%A4%EB%A5%98-%EC%95%84%EC%9D%B4%EC%BD%98.jpg';
  }
  

    return(          
            <div className={rec.wrap}> 
            
               <div className={menu.LGbgr}>     
              <nav className={menu.header}> 
              <div className={menu.Rlogo}>                               
                {/* js에서는 img를 이런식으로 import해서 불러온다. */}
                <a href="/Checipe">
                  <img                  
                  className={menu.Rlogo}
                  src={checipelogo }
                  width='200vw'
                  height='200vh'
                  />
                </a>
                </div>  
                <ul className={menu.nav}>
                  <li><Link to="/About">About</Link></li>
                  <li><Link to="/Recipe">Recipe</Link></li>
                  <li><Link to="/Notice">Notice</Link></li>
                  <li><Link to="/Open">Open</Link></li>
                </ul>
                <div className={menu.login}>
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
              {/* 사용자가 선택한 음식의 정보를 보여주는 부분 */}
              <div className={menu.WHbgr}>
                <img
                    src={ board.img }
                    onError={handleImgError}
                    width='250px'
                    height='250vh'
                 />
                <h1>{chosen_title}</h1>
                <h1>{board.detail}</h1>
                <h1>{board.part}</h1>
                <h1>{board.way}</h1>
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
              <h1>{board == undefined ? 'undefined' : console.log(board)
              }</h1>
            </div>
            </div>
              
          </div>            
            </div>
            
          
            
            
    );
}        


 export default RecipeView;
