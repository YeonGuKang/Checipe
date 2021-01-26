import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link, BrowserRouter, Redirect } from 'react-router-dom';
import checipe_logo from './image/chaecipielogo.png';
import rec from "./Recipe.module.css";
import { authService , dbService } from '../firebase';
import {ReactComponent as Msvg} from './image/menu.svg'

// 게시글을 등록하는 component

const Register = () => {

    const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  // 게시글을 위한 title과 content
  const [title, settitle] = useState("");
  const [content, setcontent] = useState("");

  // 게시글이 작성되었나 확인
  const [check, setcheck] =useState(false);

  // 게시글 작성 날짜를 위함
  let today = new Date();
  
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

  // 버튼 클릭이 있을때 게시글을 추가해줌
  const onclick = async (event) => {
    event.preventDefault();
    await dbService.collection("게시글").add({
        title:title,
        content:content,
        // 현재 날짜를 이런식으로 추가해준다
        createdAt:today.toLocaleDateString('en-US'),
        creatorId: userObj.uid,
    });
    settitle("");
    setcontent("");
    // 게시글을 추가하였으니 true로 변환
    setcheck(true);
  };

  // title과 content의 값을 변환해준다
  const onChange_title = (event) => {
    const {
      target: { value },
    } = event;
    settitle(value)
  };

  const onChange_content = (event) => {
    const {
      target: { value },
    } = event;
    setcontent(value)
  };

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
          {/* 게시글 작성을 위한 middle부분 */}
          <div className = {rec.middle}>
            <form className = {rec.registerform}>
                <div className = {rec.Write}>
                  {/* 제목과 내용에 변화가 있는것을 value로써 onchange로 넘겨줌 */}
                    <input 
                    onChange={onChange_title}
                    type = 'text'
                    value={title}
                    className={rec.title_txt}
                    placeholder='제목'
                    maxLength={10} />
                </div>
                <div>
                    <textarea 
                    onChange={onChange_content}
                    className={rec.content_txt} 
                    placeholder='내용을 입력하세요.'
                    type = 'text'
                    value={content}
                    minLength={10} />
                </div>
                
                <button onClick={onclick} className = {rec.registerbtn}>
                Register
                </button>

            {/* 게시글이 작성되었나 판단해서 작성된 경우에는 redirect로 게시판 페이지로 이동 */}
                <div>{check ? <Redirect from="/Register" to = "/Notice" />: null}
                </div>
            </form>  
            <div>
        </div>
          </div> 

          </div>           
          <div className={rec.half_bg} />  
        </div>
        
      
);
}


export default Register;