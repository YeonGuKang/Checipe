
import rec from "./Recipe.module.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link, BrowserRouter, Redirect } from 'react-router-dom';
import checipe_logo from './image/chaecipielogo.png';
import { authService , dbService } from '../firebase';
import {ReactComponent as Msvg} from './image/menu.svg'
import View_borad from "./View_borad";

const handleImgError = (e) => {
  e.target.src = 'https://previews.123rf.com/images/alexwhite/alexwhite1501/alexwhite150104186/35585441-%EC%98%A4%EB%A5%98-%EC%95%84%EC%9D%B4%EC%BD%98.jpg';
}



function Rlist({ name,id, img, part, way, detail, number}) {

    // url 설정이 완료됐나 확인
    const [check,setcheck] = useState(false);

    // 선택한 게시글에 알맞는 url을 설정해주기 위함
    const [View_url,setView_url] = useState("")

    // 게시글에 맞는 url을 설정해주는 함수
    const setUrl = async (event) => {
      // event안에 존재하는 target의 value를 name으로 넘긴다.
    const {
      target: {name},
    } = event;
  
    // url에 /View/ 와 전달받은 name을 붙임 name은 doc.id이다
   setView_url('/RecipeView/' + name);
   console.log(name)
  
  //  url설정이 완료됐음을 설정
    setcheck(true);
  }


    return (
      <div className={rec.result}>                
                <div key={ id }>
                  <img
                    src={ img }
                    onError={handleImgError}
                    width='100%'
                    height='300vh'
                 />
                 <hr size='5' color='#537f46'></hr>
                 <button onClick={setUrl} name={name} className={rec.Rtitle}>
                  {name}
                  </button>
                  {/* url 설정이 완료됐으면 그 url로 redirect */}
                  <div>{check ? <Redirect from="*" to = {View_url} />: null}</div>
                  <hr size='5' color='#537f46'></hr>  
                  <div className={rec.Rhash}>
                   { part } / { way }
                  </div>
                  <h4>{ detail }</h4>
                  <h6>{ number }</h6>
                  </div>
                  </div>
    )
  }

  
export default Rlist;