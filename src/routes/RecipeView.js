import React from "react";
import { BrowserRouter as Router, Route, Switch, Link, BrowserRouter } from 'react-router-dom';
import checipelogo from './image/checipelogo.svg';
import rec from "./style/Recipe.module.css";
import menu from "./style/MenuBar.module.css";
import recv from "./style/RecipeView.module.css";
import { authService , dbService } from '../firebase';
import {ReactComponent as Msvg} from './image/menu.svg'
import infoline from './image/infoline.svg';
import noimage from './image/noimage.svg';



import Header from "../components/Header"
import { ajaxPrefilter } from "jquery";

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
            if (user) {
              console.log("user login")
              this.setState({isLoggedIn: true})
              this.setState({userObj: user})
              
            } else {
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


      const favorite = async () => {
        // 현재 해당유저의 즐겨찾기 정보를 가져옴
        const res = await dbService.collection('즐겨찾기').doc(this.state.userObj.uid).get();

        // 만약에 즐겨찾기가 이미 하나라도 있을 경우 실행
        if(res.data()!=undefined)
        {
          // 현재 몇개의 즐겨찾기가 있는지 판단
         const count = Object.keys(res.data().data).length;

        //  해당 레시피가 이미 즐찾 되어있는지 판단
         const check = Object.values(res.data().data);
         if(check.includes(this.state.name))
         {
          alert('이미 즐겨찾기 되어있는 레시피입니다!')

          // 필드 삭제가 생각보다 어려워서 아직 취소 구현 X
          if(window.confirm('즐겨찾기를 취소 하시겠습니까?')){

       
          }


          return
         }
         alert('즐겨찾기가 완료 되었습니다!')
          
          // 그 갯수에 맞춰 새로운 key를 만들어서 넣어줌
          // key 이름이 같으면 덮어씌워지므로 이런식으로 구현
          const key = 'favorite' + String(count);
          const data = {};

          data[key] = this.state.name

          await dbService.collection('즐겨찾기').doc(this.state.userObj.uid).set({data}, { merge: true }); 
        }
        //  즐겨찾기가 하나도 없었을 경우에 실향
        else{
          alert('즐겨찾기가 완료 되었습니다!')
          //  doc과 field를 만들어서 set해줌
          const data = {
            favorite : this.state.name
          };

          await dbService.collection('즐겨찾기').doc(this.state.userObj.uid).set({data} ,{ merge: true });  
        }
        
      

        
      }
        return (
            <div className={rec.wrap}> 
            
               <div className={menu.LGbgr}>     
            <Header></Header>
              {/* 사용자가 선택한 음식의 정보를 보여주는 부분 */}
              <div className={menu.WHbgr}>
                <div onClick={favorite}>즐겨찾기</div>
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