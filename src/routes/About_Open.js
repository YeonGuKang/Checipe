import React from "react";
import { BrowserRouter as Router, Route, Switch, Link, BrowserRouter, Redirect } from 'react-router-dom';
import rec from "./style/Recipe.module.css";
import viewb from "./style/View_board.module.css";
import { authService , dbService } from '../firebase';
import {ReactComponent as Msvg} from './image/menu.svg'

import Header from "../components/Header"

class About_Open extends React.Component {
  
    componentDidMount() {
      // 스크롤 상단으로 초기화
    window.scrollTo(0, 0);
        authService.onAuthStateChanged((user) => {
            console.log("changed");
            if (user) {
              console.log("user login")
              this.setState({isLoggedIn: true})
              this.setState({userObj: user})
              
            } else {
              console.log("user logout")
              this.setState(() => {
                return {isLoggedIn: false}
            })
            }
           this.setState({init: true})
          });
    }

    render() {
        return ( 
        <div className={rec.wrap}> 
        
            <div className={rec.half_bgs}>        
          <Header></Header>
           {/* 게시글을 보여주기 위한 middle부분 */}
           <div className = {viewb.middle}>
            <div className = {viewb.middlewh}>
                 <div className={viewb.vtitle}>채식에 관하여</div>
                 <hr size='5' color='#28421f'></hr> 
                 <div className={viewb.vdate}></div>
                 <hr size='2' color='#28421f'></hr> 
 
                 <textarea readOnly className={viewb.vcontent}>                  
                  {`채식 소개

  1. 채식주의자의 정의
    동물성 음식을 먹는 것을 최대한 피하고, 식물성 음식을 먹는 것을 뜻한다.

  2. 채식주의자의 유형
    자신의 신념에 따라 채식의 정도가 다양하고 크게 8가지로 나뉘어진다.
      - 비건(Vegan) : 완전한 채식, 모든 종류의 동물성 음식을 먹지 않음
      - 락토 베지테리언 (Lacto vegetarian) : 유제품은 먹는 경우
      - 오보 베지테리언 (Ovo vegetarian) : 난류(동물의 알)는 먹는 경우
      - 락토 오보 베지테리언 (Lacto-ovo vegetarian) : 유제품과 난류(동물의 알)까지 먹는 경우          
      - 폴로 베지테리언(Pollo vegetarian) : 육류와 어류를 제외하고 먹는 경우
      - 페스코 베지테리언(Pesco vegetarian) : 육류와 조류를 제외하고 먹는 경우
      - 폴로 페스코 베지테리언(Pollo-Pesco vegetarian) : 육류만을 제외하고 먹는 경우
      - 플렉시테리언 (Flexitarian) : 준 채식주의자, 상황에 따라 육식도 한다
        
채식 현황

  1. 한국에서의 채식
    채식 관련 단체 '한채연'에 따르면 국내 채식주의자의 수는 2008년 15만명 수준에서 2018년 150만명으로 추정하고 있다.
    10년 동안 10배 가량 증가한 것이다.    
    비건에 대한 관심도 증가하고 있다. 지난 5년간의 구글 검색량을 보면 꾸준히 관심도가 증가하는 것을 볼 수 있다.
    (구글 트렌드 그래프)
  2. 채식 관련 산업
    
우리의 목표

  이렇게 채식주의자들이 증가하는 것에 비해서 채식주의자들을 위한 서비스는 비교적 적다.
  또한 채식주의에 대해 잘 알지 못하는 사람도 많고, 부정적인 인식을 가지는 사람도 적지 않다.
  그래서 채식주의자들을 위한 레시피 서비스를 제공하고,
  채식을 하지 않는 사람들도 흥미 있는 요리를 하며 채식을 경험함으로써 채식주의에 대해 다시 생각해 보는 계기가 될 것이다.
                  `}
                 </textarea>                 
                 </div>
             <div>
         </div>
           </div> 
 
           </div>           
           <div className={rec.half_bg} />  
         </div>)
    }
}

export default About_Open;