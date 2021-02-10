import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link, BrowserRouter } from 'react-router-dom';
import checipe_logo from './image/chaecipielogo.png';
import checipelogo from './image/checipelogo.svg';

import Frecipebtn from './image/Frecipe.png';
import Whyvegan from './image/pjwhy.png';
import Noticeimg from './image/pjNotice.png';
import Aboutveg from './image/pjchecipe.png';
import image2 from './image/image2.jfif';
import "./style/style.css";
import { authService } from '../firebase';
// react에서 slick을 사용하기 위한 import 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import menu from "./style/MenuBar.module.css";

import Header from "../components/Header"



  
const Mainpage = () => {


  useEffect(() => {
   
  }, []);


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
      pauseOnHover: true,
      // 레이지 로딩할 거야?
      lazyLoad: true,
      // centerMode:true,
      responsive: [
        { /* 반응형웹*/
                breakpoint: 960, /*  기준화면사이즈 */
                settings: {
                  slidesToShow:2,
                  infinite:true
                } /*  사이즈에 적용될 설정 */
         },
         { /* 반응형웹*/
                breakpoint: 768, /*  기준화면사이즈 */
                settings: {
                  slidesToShow:1,
                  infinite:true
                } /*  사이즈에 적용될 설정 */
         }
       ]
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
                          <div id="link-image">                            
                             <img
                                className="imgbtn"
                                src={ image2 }
                                alt='호박고구마'
                                width='90%'
                                border='3'
                              />                             
                          </div>
                          <div id="link-image">
                          <img
                              className="imgbtn"
                                src={ image2 }
                                alt='호박고구마'
                                width='90%'
                                border='3'
                                />                               
                          </div>
                           <div id="link-image">
                           <img
                              className="imgbtn"
                                src={ image2 }
                                alt='호박고구마'
                                width='90%'
                                border='3'
                                />                             
                          </div>
                           <div id="link-image">
                           <img
                              className="imgbtn"
                                src={ image2 }
                                alt='호박고구마'
                                width='90%'
                                border='3'
                                />
                          </div>
                           <div id="link-image">
                           <img
                              className="imgbtn"
                                src={ image2 }
                                alt='호박고구마'
                                width='90%'
                                border='3'
                                />
                          </div>
                          </Slider>
                      </section>
                   
                  </div>
           </div>

    );
    

 
    }

 export default Mainpage;