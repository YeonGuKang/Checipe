import React from "react";
import { BrowserRouter as Router, Route, Switch, Link, BrowserRouter } from 'react-router-dom';
import checipe_logo from './image/chaecipielogo.png';
import rec from "./Recipe.module.css";
import { authService , dbService } from '../firebase';
import {ReactComponent as Msvg} from './image/menu.svg'


class Test extends React.Component {
    state = {
        init: false,
        userObj: null,
        isLoggedIn: false,
        name: this.props.location.state.name.name,
        img: this.props.location.state.img.img,
        part: this.props.location.state.part.part,
        way: this.props.location.state.way.way,
        detail: this.props.location.state.detail.detail,
        manual: this.props.location.state.manual.manual
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
        const onLogOutClick = () => authService.signOut();
      const manuals = spliting(this.state.manual)
      
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
              {/* 사용자가 선택한 음식의 정보를 보여주는 부분 */}
              <div className={rec.whiteselect}>
                <img
                    src={ this.state.img }
                    onError={handleImgError}
                    width='250px'
                    height='250vh'
                 />
                <h1>{this.state.name}</h1>
                <h1>{this.state.detail}</h1>
                <h1>{this.state.part}</h1>
                <h1>{this.state.way}</h1>
                {manuals.map((ma) => {
                  if (ma != ','){
                    return <h1>{ma}</h1>
                  }
                  
              })}
              <div className={rec.vegetarianbtn}>
                             
                               
            </div>
            <div className={rec.originalbtn}>
       
            </div>
              </div>
          </div>                      
            </div>
        );
    }

}

export default Test;