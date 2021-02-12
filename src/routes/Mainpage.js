import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link, BrowserRouter } from 'react-router-dom';
import checipe_logo from './image/chaecipielogo.png';
import checipelogo from './image/checipelogo.svg';

import { authService , dbService } from '../firebase';

import Frecipebtn from './image/Frecipe.png';
import Whyvegan from './image/pjwhy.png';
import Noticeimg from './image/pjNotice.png';
import Aboutveg from './image/pjchecipe.png';
import image2 from './image/image2.jfif';
import "./style/style.css";
// react에서 slick을 사용하기 위한 import 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import menu from "./style/MenuBar.module.css";

import Header from "../components/Header"

let obj_image = [];
let obj_name = [];
let obj_step = [];
let obj_part = [];
let obj_way = [];
let obj_detail = [];
let obj_manual = [];

const Mainpage = () => {
  // 아래 슬라이드용 객체
  const [slide_obj,setslide_obj] = useState([]);

  const handleImgError = (e) => {
    e.target.src = 'https://previews.123rf.com/images/alexwhite/alexwhite1501/alexwhite150104186/35585441-%EC%98%A4%EB%A5%98-%EC%95%84%EC%9D%B4%EC%BD%98.jpg';
  }

  useEffect(() => {


    // 랜덤으로 불러오도록 난수를 생성
   let min = Math.ceil(5);
   let max = Math.floor(1000);
   let value = Math.floor(Math.random() * (max - min)) + min; 

   // 메인페이지 하단에 랜덤으로 보여줄 5개 레시피를 불러온다.
   dbService.collection("merge").where('order', '>' , value-5 , '<=', value).limit(5).onSnapshot((snapshot) => {
    const boardArray = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setslide_obj(boardArray);
    console.log(boardArray)

 
  });
   
  }, []);


  // 값이 없는 상태에서 .id 등으로 접근하면 오류가 나므로 filter로 거르는 작업

  slide_obj.filter(element => {
   obj_image.push(element.img)
   obj_name.push(element.id)
   obj_step.push(element.step)
   obj_part.push(element.part)
   obj_way.push(element.way)
   obj_detail.push(element.detail)
   obj_manual.push(element.manual)
   
  })

  


    // 아래쪽에 있는 슬라이드 설정
    var settings_bttom = {
      // 좌우 화살표 줄 것인가
      arrows: false,
      // 마지막 슬라이드에서 처음 슬라이스로
      infinite: true,
      speed: 4000,
      // 한 번에 스크롤 몇 개 보여줄 건가
      slidesToShow: 3,
      // 스크롤 할 때마다 몇 장씩 넘길 것인가
      slidesToScroll: 1,
      // 자동 넘김을 할 것인가. 한다면 스피드는?
      autoplay: true,
      autoplaySpeed: 4000,
      // 화면에 올리면 슬라이더가 자동으로 넘어가지 않음
      pauseOnHover: false,
      // 레이지 로딩할 거야?
      lazyLoad: true
      };
      
      // 중앙에 있는 슬라이드 설정
      var settings_mid = {
        fade: true,
          // 점의 유무설정
        dots: true,
        // 좌우 화살표 줄 것인가
        arrows: false,
        // 마지막 슬라이드에서 처음 슬라이스로
        infinite: true,
        speed: 3000,
        // 한 번에 스크롤 몇 개 보여줄 건가
        slidesToShow: 1,
        // 스크롤 할 때마다 몇 장씩 넘길 것인가
        slidesToScroll: 1,
        // 자동 넘김을 할 것인가. 한다면 스피드는?
        autoplay: true,
        autoplaySpeed: 3000,
        // 화면에 올리면 슬라이더가 자동으로 넘어가지 않음
        pauseOnHover: false,
        // 레이지 로딩할 거야?
        lazyLoad: true
        };

    return(
            <div className="wrap">
                  <div className={menu.LGbgr}>
                    <Header></Header>
                   <div className="about_vegan">
                                 <li><Link to="/About" >About</Link> </li>
                                  <li><Link to="/About" >VEGETARIAN</Link></li>
                                  <li><Link to="/About" >채식에관하여</Link></li>
                              </div>

                              
                      <div className="btn">
                        <Link to = "/Recipe">
                              <img className="recipebtn"
                                    src={ Frecipebtn }
                                    width='140%'
                                    alt= 'recipebtn'
                              /> 
                        </Link>
                      </div> 

              </div>  
             
                  <div className="midle">
                
                  <div className="slideshow-container">
                  <div className="greentrans">
                    
                    </div>
                    {/* react slick은 이런식으로 사용이 가능하다 */}
                  <Slider {...settings_mid}>
                            <img
                                className='slideimg'
                                src={ Whyvegan }
                                width='1300px'
                                height='100vh'
                                />
                                 <img
                               className='slideimg'
                               src={ Noticeimg }
                               width='1300px'
                               height='100vh'
                                />
                                 <img
                                className='slideimg' 
                                src={ Aboutveg }
                                width='1300px'
                                height='100vh'
                                />
                  </Slider>
                  </div>
      
                  </div>

                  <div className="lat">
                       <section className="visual">
                       <Slider {...settings_bttom}>
                         {/* 해당하는 레시피로 넘기기위해서 path와 state를 넘겨줌 근데 state에서 오류가난다... */}
                       <Link to = {{pathname: "/RecipeView/" + obj_step[0] + '/' + obj_name[0],
                   state: {
                     name: obj_name[0],
                     img: obj_image[0],
                     part: obj_part[0],
                     way: obj_way[0],
                     detail: obj_detail[0],
                     manual: obj_manual[0]
                   }}}>  
                          <div id="link-image">
                          <li className="more">{obj_name[0]}</li>
                             <img
                                className="imgbtn"
                                src={ obj_image[0] }
                                onError={handleImgError}
                                alt={obj_name[0]}
                                width='90%'
                                border='3'
                                />
                              </div>
                              </Link>
                          <div id="link-image">
                          <li className="more">{obj_name[1]}</li>
                          <img
                                className="imgbtn"
                                src={ obj_image[1] }
                                onError={handleImgError}
                                alt={obj_name[1]}
                                width='90%'
                                border='3'
                                />
                          </div>
                           <div id="link-image">
                           <li className="more">{obj_name[2]}</li>
                           <img
                                className="imgbtn"
                                src={ obj_image[2] }
                                onError={handleImgError}
                                alt={obj_name[2]}
                                width='90%'
                                border='3'
                                />
                          </div>
                           <div id="link-image">
                           <li className="more">{obj_name[3]}</li>
                           <img
                                className="imgbtn"
                                src={ obj_image[3] }
                                onError={handleImgError}
                                alt={obj_name[3]}
                                width='90%'
                                border='3'
                                />
                          </div>
                           {/* <div id="link-image">
                           <li className="more">{obj_name[4]}</li>
                           <img
                                className="imgbtn"
                                src={ obj_image[4] }
                                onError={handleImgError}
                                alt={obj_name[4]}
                                width='90%'
                                border='3'
                                />
                          </div> */}
                          </Slider>
                      </section>
                   
                  </div>
           </div>

    );
    

 
    }

 export default Mainpage;