import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link, BrowserRouter, Redirect } from 'react-router-dom';
import checipe_logo from './image/chaecipielogo.png';
import rec from "./style/Recipe.module.css";
import regi from "./style/Register.module.css";
import { authService, dbService } from '../firebase';
import { ReactComponent as Msvg } from './image/menu.svg'

import Header from "../components/Header"

// 게시글을 등록하는 component

const Register = () => {

  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  // 게시글을 위한 title과 content
  const [title, settitle] = useState("");
  const [content, setcontent] = useState("");

  // 게시글이 작성되었나 확인
  const [check, setcheck] = useState(false);

  // 게시글 작성 날짜를 위함
  let today = new Date();

  useEffect(() => {
    // 스크롤 상단으로 초기화
    window.scrollTo(0, 0);
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

  // 버튼 클릭이 있을때 게시글을 추가해줌
  const onclick = async (event) => {
    event.preventDefault();

    const data = {
      title: title,
      content: content,
      // 현재 날짜를 이런식으로 추가해준다
      createdAt: today.toLocaleDateString('en-US') + ' ' + today.toLocaleTimeString('en-US'),
      creatorId: userObj.uid,
    }

    await dbService.collection("게시글").doc(title).set(data);

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

    let {
      target: { value },
    } = event;



    setcontent(value)
  };

  return (
    <div className={rec.wrap}>
      <div className={rec.half_bgs}>
        <Header></Header>
        {/* 게시글 작성을 위한 middle부분 */}
        <div className={regi.middle}>
          <form className={regi.registerform}>
            <div className={regi.Write}>
              {/* 제목과 내용에 변화가 있는것을 value로써 onchange로 넘겨줌 */}
              <input
                onChange={onChange_title}
                type='text'
                value={title}
                className={regi.title_txt}
                placeholder='제목'
                maxLength={10} />
            </div>
            <div>
              <textarea
                onChange={onChange_content}
                className={regi.content_txt}
                placeholder='내용을 입력하세요.'
                type='text'
                value={content}
                minLength={10} />
            </div>

            <button onClick={onclick} className={regi.registerbtn}>
              Register
                </button>

            {/* 게시글이 작성되었나 판단해서 작성된 경우에는 redirect로 게시판 페이지로 이동 */}
            <div>{check ? <Redirect from="/Register" to="/Notice" /> : null}
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