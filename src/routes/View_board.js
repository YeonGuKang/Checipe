import React from "react";
import { BrowserRouter as Router, Route, Switch, Link, BrowserRouter, Redirect } from 'react-router-dom';
import checipe_logo from './image/chaecipielogo.png';
import rec from "./style/Recipe.module.css";
import viewb from "./style/View_board.module.css";
import { authService , dbService } from '../firebase';
import {ReactComponent as Msvg} from './image/menu.svg'

import Header from "../components/Header"

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
        return ( 
        <div className={rec.wrap}> 
        
            <div className={rec.half_bgs}>        
          <Header></Header>
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