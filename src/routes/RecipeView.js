import React from "react";
import { BrowserRouter as Router, Route, Switch, Link, BrowserRouter } from 'react-router-dom';
import checipelogo from './image/checipelogo.svg';
import rec from "./style/Recipe.module.css";
import menu from "./style/MenuBar.module.css";
import recv from "./style/RecipeView.module.css";
import { authService , dbService } from '../firebase';
import {ReactComponent as Msvg} from './image/menu.svg'
import infoline from './image/infoline.svg';

import Header from "../components/Header"
class RecipeView extends React.Component {
    state = {
        init: false,
        userObj: null,
        isLoggedIn: false,
        name: this.props.location.state.name,
        img: this.props.location.state.img,
        part: this.props.location.state.part,
        way: this.props.location.state.way,
        detail: this.props.location.state.detail,
        manual: this.props.location.state.manual
    };

    
    componentDidMount() {
        /*this.setState(() => 
        {return {manual: this.spliting(this.state.manual)}
      })*/
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
    const spliting = (manual) => {
      var manuals = manual.split('\'')
      while (true) {
        var search = manuals.indexOf(', ')
        if(search!=-1){
          manuals.splice(search,1)
        }else{
          break
        }
      }
      
        return manuals
    }
      const handleImgError = (e) => {
        e.target.src = 'https://previews.123rf.com/images/alexwhite/alexwhite1501/alexwhite150104186/35585441-%EC%98%A4%EB%A5%98-%EC%95%84%EC%9D%B4%EC%BD%98.jpg';
      }
      const manuals = spliting(this.state.manual)
      console.log('test', this.state.manual)
        return (
            <div className={rec.wrap}> 
            
               <div className={menu.LGbgr}>     
            <Header></Header>
              {/* 사용자가 선택한 음식의 정보를 보여주는 부분 */}
              <div className={menu.WHbgr}>
                <div className={recv.whitealign}>
                  <img src={ this.state.img }
                    onError={handleImgError}
                    width='400px'
                    height='400px'/>
                  <img src={infoline}
                    width='70px'
                    height='400px'
                    alt= 'justaline'/>
                  <div className={recv.information}>
                    <div className={recv.title}>
                     {this.state.name}
                    </div>
                    <hr size='7' color='#28421f'></hr>
                    <div className={recv.ingredient}>
                      {this.state.detail}
                    </div>
                    <div className={recv.tagnhow}>
                    # {this.state.part} / {this.state.way}
                    </div>
                  </div>
                </div>


                
              </div>    
          </div> 

          <div className={menu.space}></div>

          <div className={menu.DGbgr}>
            <div className={recv.DGwhite}>
              
              {manuals.map((ma) => {
                  if (ma != ','){
                    return <div className={recv.content}>{ma}</div>
                  }
                  
                 })}
                 </div>
          </div>
          <div className={recv.underspace}></div>
   
            </div>
        );
    }

}

export default RecipeView;