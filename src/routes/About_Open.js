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
                  {`채식 소개 | 채식주의자의 정의
채식 현황 | 우리나라에서 채식주의자들의 증가가 나타나고 있다.
채식의 장점
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