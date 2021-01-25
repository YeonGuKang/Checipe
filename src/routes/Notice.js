import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link, BrowserRouter } from 'react-router-dom';
import checipe_logo from './image/chaecipielogo.png';
import rec from "./Recipe.module.css";
import { authService , dbService } from '../firebase';
import {ReactComponent as Msvg} from './image/menu.svg'


const Notice = () => {

    const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  //  DB에 존재하는 게시글을 받아오기 위함
  const [board, setboard] = useState("");
  const [boards, setboards] = useState([]);
  

  
  useEffect(() => {

    // DB에서 게시글을 받아오는 과정
    dbService.collection("게시글").onSnapshot((snapshot) => {
        const boardArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setboards(boardArray);
      });


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
          <li><Link to="/Register">글 등록하기</Link></li>

        {/* 게시글을 보여주기 위한 middle 부분 */}
          <div className = {rec.middle}>
            <div className={rec.board}>
                <div  className={rec.board_detail}>
                  {/* 제목 부분에 title을 불러옴 */}
                    <div>
                        제목
                        {boards.map(board => 
                        <div key={board.id}>
                            <h4>{board.title}</h4>
                        </div>)
                        }
                    </div>
                    {/* 마찬가지로 날짜 부분에 만든 날짜를 게시글 작성 날짜를 불러옴 */}
                    <div className={rec.board_date}>
                        날짜
                        {boards.map(board => 
                        <div key={board.id}>
                            <h4>{board.createdAt}</h4>
                        </div>)
                        }
                    </div>
                    </div>
              </div>

          </div>
      </div>         
          <div className={rec.half_bg} />  
        </div>
        
        
);
}


export default Notice;