import React from "react";
import { BrowserRouter as Router, Route, Switch, Link, BrowserRouter } from 'react-router-dom';
import checipelogo from './image/checipelogo.svg';
import rec from "./style/Recipe.module.css";
import menu from "./style/MenuBar.module.css";
import recv from "./style/RecipeView.module.css";
import { authService , dbService , firebaseInstance } from '../firebase';
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
        manual: this.props.location.state.manual,
        like: this.props.location.state.like
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
        e.target.src = noimage;
      }
      const manuals = spliting(this.state.manual)


      // 즐겨찾기 함수
      const favorite = async () => {
        // 현재 해당유저의 즐겨찾기 정보를 가져옴
        const res = await dbService.collection('유저정보').doc(this.state.userObj.uid).collection('즐겨찾기').doc(this.state.name).get();

        const data = {
              favorite : this.state.name
             };

            // 만약에 해당 이름으로 데이터가 있는경우 실행
         if(res.data()!=undefined)
           {
          alert('이미 즐겨찾기 되어있는 레시피입니다!')
            // 확인을 누르면 실행
            if(window.confirm('즐겨찾기를 취소 하시겠습니까?')){
              // 즐겨찾기에서 해당하는 레시피를 삭제
              await dbService.collection('유저정보').doc(this.state.userObj.uid).collection('즐겨찾기').doc(this.state.name).delete();
              alert('즐겨찾기가 삭제 되었습니다!')
             }
           }
          // 데이터가 없는경우 해당하는 레시피를 set
           else{
            await dbService.collection('유저정보').doc(this.state.userObj.uid).collection('즐겨찾기').doc(this.state.name).set(data); 
            alert('즐겨찾기가 완료 되었습니다!')
           }
    
      }

      // 좋아요 함수
      const like = async () => {
        // 현재 해당유저의 좋아요 정보를 가져옴
        const res = await dbService.collection('유저정보').doc(this.state.userObj.uid).collection('좋아요').doc(this.state.name).get();

        const data = {
              like : true
             };

            //  현재 선택한 레시피의 타입을 알기위함
             const nowAddress = document.location.href;
             const type =nowAddress.split('/')[4]
             
            //  현재 타입의 레시피 like 정보를 가져옴
              const type_data =  await dbService.collection(type).doc(this.state.name).get();
              let current_like = type_data.data().like

          // 만약에 해당 레시피를 좋아요 누른경우
         if(res.data()!=undefined)
           {
            // 확인을 누르면 실행
            if(window.confirm('이미 좋아요 한 레시피입니다! 좋아요를 취소 하시겠습니까?')){
              // 좋아요에서 해당하는 레시피를 삭제
              await dbService.collection('유저정보').doc(this.state.userObj.uid).collection('좋아요').doc(this.state.name).delete();

              // merge와 현재 type 레시피의 like를 1씩 뺌
              await dbService.collection(type).doc(this.state.name).update({like : current_like - 1});
              await dbService.collection('merge').doc(this.state.name).update({like : current_like - 1});

              alert('좋아요가 삭제 되었습니다!')
             }
           }
          // 좋아요를 누른적이 없을 경우 실행
           else{
             console.log(current_like)
             if(current_like == undefined)
             {
               current_like = 0;
             }

            //  merge와 해당 type의 레시피 like를 1씩증가
            await dbService.collection(type).doc(this.state.name).update({like : current_like + 1});
            await dbService.collection('merge').doc(this.state.name).update({like : current_like + 1});

            await dbService.collection('유저정보').doc(this.state.userObj.uid).collection('좋아요').doc(this.state.name).set(data); 
            alert('좋아요가 완료 되었습니다!')
           }
    
      }
        return (
            <div className={rec.wrap}> 
            
               <div className={menu.LGbgr}>     
            <Header></Header>
              {/* 사용자가 선택한 음식의 정보를 보여주는 부분 */}
              <div className={menu.WHbgr}>
                <a onClick={favorite}>즐겨찾기</a>
                <a onClick={like}>좋아요</a>
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