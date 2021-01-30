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
import Rlist from './Rlist'


const Recipe = () => {
  
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  
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
 



  // 선택한 정보를 보여주기 위함
  const [chosen,setchosen] = useState([]);

  // 페이지에 맞게 제한된 정보만 보여주기 위함
  const [limit_boards,setlimit_boards]=useState([]);

      // 현재 자신이 존재하는 페이지를 알기 위함
      const [page,setpage] = useState(1);

       // 보여줄 갯수만큼 잘라서 이동을해주는 temp 객체
      let page_boards=[];

      // limit은 보여줄 개수
      let limit=4;
      let start=0;
      let end=limit;
     // 총 페이지가 몇개 나오는지 담는 배열
      let page_arr=[];

       // 페이지 개수를 알기위한 for문
      for(let i = 1; i <= Math.ceil(chosen.length / limit); i++) {
        page_arr.push(i);
      }

  
  useEffect(() => {

   // 첫 화면에 merge에서 가져온 값을 나타냄
   dbService.collection("merge").limit(5).onSnapshot((snapshot) => {
    const boardArray = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setchosen(boardArray);
    // 첫화면에 merge에서 limit만큼 가져온걸 보여줌
    setlimit_boards(boardArray.slice(0,limit))

  });

  dbService.collection("vegan").limit(5).onSnapshot((snapshot) => {
    const boardArray = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    // 값을 섞어서 넣어줌
    setVegan(shuffle(boardArray))
    
    // 비건은 자기 위에 모든 타입에 들어감
    setLacto(boardArray)
    setOvo(boardArray)
    setLactoOvo(boardArray)
    setPollo(boardArray)
    setPesco(boardArray)
    setPolloPesco(boardArray)
    setFlexi(boardArray)
  });

  dbService.collection("lacto").limit(5).onSnapshot((snapshot) => {
    const boardArray = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    // 이전값과 현재값을 섞어서 넣어줌
    setLacto((prev) => shuffle([...boardArray, ...prev]));
    // 락토는 위로 오보를 제외하고 모두 해당
    setLactoOvo((prev) => [...boardArray, ...prev])
    setPollo((prev) => [...boardArray, ...prev])
    setPesco((prev) => [...boardArray, ...prev])
    setPolloPesco((prev) => [...boardArray, ...prev])
    setFlexi((prev) => [...boardArray, ...prev])
  });

  dbService.collection("ovo").limit(5).onSnapshot((snapshot) => {
    const boardArray = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setOvo((prev) => shuffle([...boardArray, ...prev]));
    // 오보는 위로 락토를 제외하고 모두 해당
    setLactoOvo((prev) => [...boardArray, ...prev])
    setPollo((prev) => [...boardArray, ...prev])
    setPesco((prev) => [...boardArray, ...prev])
    setPolloPesco((prev) => [...boardArray, ...prev])
    setFlexi((prev) => [...boardArray, ...prev])
  });

  dbService.collection("lacto-ovo").limit(5).onSnapshot((snapshot) => {
    const boardArray = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setLactoOvo((prev) => shuffle([...boardArray, ...prev]));

    // 락토오보 위로 모두 해당
    setPollo((prev) => [...boardArray, ...prev])
    setPesco((prev) => [...boardArray, ...prev])
    setPolloPesco((prev) => [...boardArray, ...prev])
    setFlexi((prev) => [...boardArray, ...prev])
  });

  dbService.collection("pollo").limit(5).onSnapshot((snapshot) => {
    const boardArray = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setPollo((prev) => shuffle([...boardArray, ...prev]));

    // 페스코를 제외하고 위로 모두 해당
    setPolloPesco((prev) => [...boardArray, ...prev])
    setFlexi((prev) => [...boardArray, ...prev])

  });

  dbService.collection("pesco").limit(5).onSnapshot((snapshot) => {
    const boardArray = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setPesco((prev) => shuffle([...boardArray, ...prev]));

    // 폴로를 제외하고 위로 모두 해당
    setPolloPesco((prev) => [...boardArray, ...prev])
    setFlexi((prev) => [...boardArray, ...prev])

  });

  dbService.collection("pollo-pesco").limit(5).onSnapshot((snapshot) => {
    const boardArray = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setPolloPesco((prev) => shuffle([...boardArray, ...prev]));

    // 본인 위로 모두 해당
    setFlexi((prev) => [...boardArray, ...prev])

  });

  dbService.collection("flex").limit(5).onSnapshot((snapshot) => {
    const boardArray = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // 모든 것을 감싸는 felxi
    setFlexi((prev) => shuffle([...boardArray, ...prev]));
  });

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

  // 객체 정보를 섞어주는 함수
  function shuffle(sourceArray) {
    for (var i = 0; i < sourceArray.length - 1; i++) {
        var j = i + Math.floor(Math.random() * (sourceArray.length - i));

        var temp = sourceArray[j];
        sourceArray[j] = sourceArray[i];
        sourceArray[i] = temp;
    }
    
    return sourceArray
}
    
      // 데이터 속도를 높이기 위해 useEffect에서 곧 바로 데이터를 받아옴
   /* const getChecipes = async () =>
    {
     
       //파이어베이스에 있는 컬렉션으름으로 각각의 db정보를 받아옴
      const dbLacto = await dbService.collection("lacto") .limit(5).get();
      const dbLactoOvo = await dbService.collection("lacto-ovo").limit(5).get();
      const dbOvo = await dbService.collection("ovo").limit(5).get();
      const dbPesco = await dbService.collection("pesco").limit(5).get();
      const dbPollo = await dbService.collection("pollo").limit(5).get();
      const dbPolloPesco = await dbService.collection("pollo-pesco").limit(5).get();
      const dbFlexi = await dbService.collection("flex").limit(5).get();
      const dbVegan = await dbService.collection("vegan").limit(5).get();

    


      
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
       })

      
    }*/

  
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
        // type버튼이 클릭되면 page를 다시 1로 세팅
        setpage(1);
        // 처음에 0부터 limit만큼 값을 넣어줌
        setlimit_boards(Lacto.slice(0,limit))
      } 
      else if(name == "Ovo"){
        setchosen(Ovo);
        setpage(1);
        setlimit_boards(Ovo.slice(0,limit))
      }
      else if(name == "LactoOvo"){
        setchosen(LactoOvo);
        setpage(1);
        setlimit_boards(LactoOvo.slice(0,limit))
     
      }
      else if(name == "Pollo"){
        setchosen(Pollo);
        setpage(1);
        setlimit_boards(Pollo.slice(0,limit))
  
      }
      else if(name == "Pesco"){
        setchosen(Pesco);
        setpage(1);
        setlimit_boards(Pesco.slice(0,limit))
      }
      else if(name == "PolloPesco"){
        setchosen(PolloPesco);
        setpage(1);
        setlimit_boards(PolloPesco.slice(0,limit))
      }
      else if(name == "Flexi"){
        setchosen(Flexi);
        setpage(1);
        setlimit_boards(Flexi.slice(0,limit))
      }
      else if(name == "Vegan"){
        setchosen(Vegan);
        setpage(1);
        setlimit_boards(Vegan.slice(0,limit))
      }

}



    // 현재 페이지를 보고 그 페이지에 맞게 게시글을 보여주는 함수
    const getpage = async (event) => {
      // event안에 존재하는 target의 value를 name으로 넘긴다.
    const {
      target: {name},
    } = event;
  
    // 현재 페이지를 받고
   setpage(name);
  
  //  그 페이지에 맞게 보여줄 게시글을 계산한다
    start=(name-1) * limit;
    end=start+limit;
    
    //  계산이 끝난뒤 그 게시글만 slice해서 temp객체에 저장
   page_boards=chosen.slice(start,end)
  
   
  //  다시 그 temp 객체를 hook객체에 저장 (아래에 사용을 위해서 hook을 이용해야함)
   setlimit_boards(page_boards)
 
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
              {/* <div className={rec.sectiondefault}></div> */}
              <div className={rec.space}></div>
          {/* 버튼을 클릭했을때 name의 값을 getChosen으로 넘겨줌 */}
          <div className={rec.section}>
            {/* 사용자가 클릭한 type에 맞는 객체 정보를 쭉 나열해서 보여줌 */}
            <div className={rec.sectionplace}>
              {/* chosen객체에 존재하는 모든 document에 대해서 Show로 각각 지정해주고 , 그 값들을 나열해준다. key값은 위에서 넣어준 id값 */}
              {limit_boards.map((Show)=>(
                < Rlist
                  name={Show.id}
                  key={ Show.id } 
                  img={ Show.img }
                  part={ Show.part }
                  way={ Show.way }
                  detail={ Show.detail }
                  number={ Show.number }
                  step={Show.step}
                />
               
                /*<div className={rec.result}>                
                <div key={Show.id}>
                  <img
                    src={ Show.img }
                    onError={handleImgError}
                    width='100%'
                    height='220vh'
                 />
                 <hr size='5' color='#537f46'></hr>
                 <div className={rec.Rtitle}>
                  {Show.id}
                  </div>
                  <hr size='5' color='#537f46'></hr>  
                  <div className={rec.Rhash}>
                   {Show.part} / {Show.way}
                  </div>
                  <h4>{Show.detail}</h4>
                  <h6>{Show.number}</h6>
                  </div>
                  </div>*/
              ))}
            </div>
            </div>
  {/* 페이지 개수에 맞게 페이지 번호를 만들어주고 클릭시에 그 페이지에 맞는 게시글을 보여줌 */}
  <div>
                {page_arr ? page_arr.map( (el,key) => 
                    el == page ? <button key={key} className={rec.page_num} onClick={getpage} name={el}> {el} </button>
                                : <button key={key} className={rec.page_num} onClick={getpage} name={el}> {el}  </button> 
                )
                
                : null}
              </div>  
          </div>          
          
            </div>
            
          
            
            
    );
}         


 export default Recipe;
