import React from "react";
import { BrowserRouter as Router, Route, Switch, Link, BrowserRouter, Redirect } from 'react-router-dom';
import checipe_logo from './image/chaecipielogo.png';
import rec from "./style/Recipe.module.css";
import viewb from "./style/View_board.module.css";
import { authService , dbService } from '../firebase';
import {ReactComponent as Msvg} from './image/menu.svg'

class View_test extends React.Component {
    state = {
        init: false,
        userObj: null,
        isLoggedIn: false,
        createdAt: this.props.location.state.createdAt,
        title: this.props.location.state.title,
        content: this.props.location.state.content
    }

    componentDidMount() {
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

        const onLogOutClick = () => authService.signOut();

        return ( 
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
               {this.state.isLoggedIn ?  <Link to="/Checipe">
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
           <div className = {viewb.middle}>
            
             <div>
                 <h3>{this.state.createdAt}</h3>
                 <h1>{this.state.title}</h1>
                 <h2>{this.state.content}</h2>
         </div>
           </div> 
 
           </div>           
           <div className={rec.half_bg} />  
         </div>)
    }
}

export default View_test;