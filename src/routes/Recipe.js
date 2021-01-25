import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link, BrowserRouter } from 'react-router-dom';
import checipe_logo from './image/chaecipielogo.png';
import rec from "./Recipe.module.css";
import { authService , dbService } from '../firebase';
import {ReactComponent as Msvg} from './image/menu.svg'
import vegetarian from './icons/vegetarian.svg';
import veganx from './icons/veganx.svg';
import vegano from './icons/vegano.svg';
import lactox from './icons/lactox.svg';
import lactoo from './icons/lactoo.svg';
import ovox from './icons/ovox.svg';
import ovoo from './icons/ovoo.svg';
import lactovox from './icons/lactovox.svg';
import lactovoo from './icons/lactovoo.svg';
import pollox from './icons/pollox.svg';
import polloo from './icons/polloo.svg';
import pescox from './icons/pescox.svg';
import pescoo from './icons/pescoo.svg';
import polpescox from './icons/polpescox.svg';
import polpescod from './icons/polpescoo.svg';
import vegeline from './icons/vegeline.svg';
import flexix from './icons/flexix.svg';
import flecxio from './icons/flexio.svg';










const Recipe = () => {

  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      console.log("changed");
      if (user) {
        console.log("user login")
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        console.log("user logout")
        setIsLoggedIn(false);
      }
      setInit(true);
    });
    
  }, []);

  // 파이어베이스에서 데이터를 가져오는 과정
  // 각각 채식 type에 맞게 데이터를 불러오기 위함
    const [Lacto, setLacto] = useState([]);
    const [LactoOvo, setLactoOvo] = useState([]);
    const [Ovo, setOvo] = useState([]);
    const [Pesco, setPesco] = useState([]);
    const [Pollo, setPollo] = useState([]);
    const [PolloPesco, setPolloPesco] = useState([]);
    const [Flexi, setFlexi] = useState([]);
    const [Vegan, setVegan] = useState([]);

  // 사용자가 선택한 type에 맞게 보여주기위함
    const [chosen, setchosen] = useState([]);

    const getChecipes = async () =>
    {
      // 파이어베이스에 있는 컬렉션으름으로 각각의 db정보를 받아옴
      const dbLacto = await dbService.collection("락토").get();
      const dbLactoOvo = await dbService.collection("락토오보").get();
      const dbOvo = await dbService.collection("오보").get();
      const dbPesco = await dbService.collection("페스코").get();
      const dbPollo = await dbService.collection("폴로").get();
      const dbPolloPesco = await dbService.collection("폴로페스코").get();
      const dbFlexi = await dbService.collection("플렉시테리언").get();
      const dbVegan = await dbService.collection("비건").get();
      
      // dbLacto에 존재하는 모든 각각의 document에 대해서 실행
      dbLacto.forEach((document) => {
        // 임시로 객체를 하나 선언해서 그 객체에 모든 존재하는 데이터와 id를 추가해서 넣어줌
        const LactoObject = {
          ...document.data(),
          id: document.id,
        };
        // Lacto 객체에 파이어베이스에 있는 정보를 set해줌 (set 함수인자에 함수를 넣어준 형태)
        // prev => []  형태는 모든 이전의 document에 대해서 배열을 리턴한다
        // 가장 최근 document인 Object를 return해서 set해주고 그 뒤로 이전 documnet를 return해서 set해줌 (implict return 형식)
        setLacto((prev) => [LactoObject, ...prev]);
      });

      dbLactoOvo.forEach((document) => {
        const LactoOvoObject = {
          ...document.data(),
          id: document.id,
        };
        setLactoOvo((prev) => [LactoOvoObject, ...prev]);
      });

      dbOvo.forEach((document) => {
        const OvoObject = {
          ...document.data(),
          id: document.id,
        };
        setOvo((prev) => [OvoObject, ...prev]);
      });

      dbPesco.forEach((document) => {
        const PescoObject = {
          ...document.data(),
          id: document.id,
        };
        setPesco((prev) => [PescoObject, ...prev]);
      });

      dbPollo.forEach((document) => {
        const PolloObject = {
          ...document.data(),
          id: document.id,
        };
        setPollo((prev) => [PolloObject, ...prev]);
      });

      dbPolloPesco.forEach((document) => {
        const PolloPescoObject = {
          ...document.data(),
          id: document.id,
        };
        setPolloPesco((prev) => [PolloPescoObject, ...prev]);
      });

      dbFlexi.forEach((document) => {
        const FlexiObject = {
          ...document.data(),
          id: document.id,
        };
        setFlexi((prev) => [FlexiObject, ...prev]);
      });

      dbVegan.forEach((document) => {
        const VeganObject = {
          ...document.data(),
          id: document.id,
        };
        setVegan((prev) => [VeganObject, ...prev]);
      });
    }

    
    // 처음에 mount 됐을때 실행해줌으로써 데이터를 불러옴
    useEffect(()=>{
      getChecipes();
 
    },[]);
  
  // 로그아웃을 위한 함수를 선언
  const onLogOutClick = () => authService.signOut();

  // const toggleBtn = document.querySelector("menubtn");
  // const nav = document.querySelector('nav');
  // const login = document.querySelector('login');
  // toggleBtn.addEventListener('click', () => {
  //   nav.classList.toggle('active');
  //   login.classList.toggle('active');
  // });


  // 사용자가 선택한 type에 맞게 데이터를 선택하는 함수
      const getChosen = async (event) => {
        // event안에 존재하는 target의 value를 name으로 넘긴다.
      const {
        target: {name},
      } = event;

      // 아래 name으로 판단해서 chosen 객체에 앎맞는 데이터를 주입
      if(name == "Lacto"){
        setchosen(Lacto);
      } 
      else if(name == "Ovo"){
        setchosen(Ovo);
      }
      else if(name == "LactoOvo"){
        setchosen(LactoOvo);
      }
      else if(name == "Pollo"){
        setchosen(Pollo);
      }
      else if(name == "Pesco"){
        setchosen(Pesco);
      }
      else if(name == "PolloPesco"){
        setchosen(PolloPesco);
      }
      else if(name == "Flexi"){
        setchosen(Flexi);
      }
      else if(name == "Vegan"){
        setchosen(Vegan);
            <img src={vegano} 
                    width='100vw'
                    height='100vh'
                    name="Vegan"/>
      }

      console.log(chosen);
    }

    return(           
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
                  {isLoggedIn ?  <Link to="/Checipe">
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
              <div className={rec.whiteselect}>
              <div className={rec.vegetarianbtn}>
              <img src={vegetarian}
                                width='150vw'
                                height='150vh'
                                alt= 'vegetarian'/>
               <img src={vegeline}
                                width='10vw'
                                height='100vh'
                                alt= 'justaline'/>                  
              <img onClick={getChosen} src={veganx} 
                                width='100vw'
                                height='100vh'
                                name="Vegan"/>
               <img onClick={getChosen} src={lactox} 
                                  width='100vw'
                                  height='100vh'
                                name="Lacto"/>
               <img onClick={getChosen} src={ovox} 
                                  width='100vw'
                                  height='100vh'
                                name="Ovo"/>
               <img onClick={getChosen} src={lactovox} 
                                  width='100vw'
                                  height='100vh'
                                name="LactoOvo"/>
               <img onClick={getChosen} src={pollox} 
                                  width='100vw'
                                  height='100vh'
                                name="Pollo"/>
               <img onClick={getChosen} src={pescox} 
                                  width='100vw'
                                  height='100vh'
                                name="Pesco"/>   
                <img onClick={getChosen} src={polpescox} 
                                  width='100vw'
                                  height='100vh'
                                name="PolloPesco"/>   
                <img onClick={getChosen} src={flexix} 
                                  width='100vw'
                                  height='100vh'
                                name="Flexi"/>                                                                        
            </div>
            <div className={rec.originalbtn}>
            <button onClick={getChosen} name="Lacto">Lacto</button>
               <button onClick={getChosen} name="Ovo">Ovo</button>
               <button onClick={getChosen} name="LactoOvo">LactoOvo</button>
               <button onClick={getChosen} name="Pesco">Pesco</button>
               <button onClick={getChosen} name="Pollo">Pollo</button>
               <button onClick={getChosen} name="PolloPesco">PolloPesco</button>
               <button onClick={getChosen} name="Flexi">Flexi</button>
               <button onClick={getChosen} name="Vegan">Vegan</button>
            </div>
              </div>
              </div>
              <div>

          {/* 버튼을 클릭했을때 name의 값을 getChosen으로 넘겨줌 */}
          <div className={rec.section}>
            {/* 사용자가 클릭한 type에 맞는 객체 정보를 쭉 나열해서 보여줌 */}
            <div>
              {/* chosen객체에 존재하는 모든 document에 대해서 Show로 각각 지정해주고 , 그 값들을 나열해준다. key값은 위에서 넣어준 id값 */}
              {chosen.map((Show)=>(
                <div key={Show.id}>
                  <h1>{Show.id}</h1>
                  <img
                    src={ Show.img }
                    alt = "보이지않는 이미지입니다."
                    width='300px'
                    height='300vh'
                 />
                  <h2>{Show.part}</h2>
                  <h3>{Show.way}</h3>
                  <h5>{Show.detail}</h5>
                  <h6>{Show.number}</h6>
                  </div>
              ))}
            </div>
            </div>

          </div>            
            </div>
            
          
            
            
    );
}         


 export default Recipe;