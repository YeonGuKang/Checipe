import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Switch, Link, BrowserRouter, useHistory } from 'react-router-dom';
import checipe_logo from './image/chaecipielogo.png';
import checipelogo from './image/checipelogo.svg';
import rec from "./Recipesp.module.css";
import menu from "./MenuBar.module.css";

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
import Rlist from './Rlist';

import ingredient from './ingicons/ingredient.svg';
import vegex from './ingicons/vegex.svg';
import vegeo from './ingicons/vegeo.svg';
import milkx from './ingicons/milkx.svg';
import milko from './ingicons/milko.svg';
import eggx from './ingicons/eggx.svg';
import eggo from './ingicons/eggo.svg';
import fishx from './ingicons/fishx.svg';
import fisho from './ingicons/fisho.svg';
import chickenx from './ingicons/chickenx.svg';
import chickeno from './ingicons/chickeno.svg';
import meatx from './ingicons/meatx.svg';
import meato from './ingicons/meato.svg';
import { event } from "jquery";

import hashtag from './hashicons/hashtag.svg';
import hashline from './hashicons/hashline.svg';
import soupx from './hashicons/soupx.svg';
import soupo from './hashicons/soupo.svg';
import sidex from './hashicons/sidex.svg';
import sideo from './hashicons/sideo.svg';
import coursex from './hashicons/coursex.svg';
import courseo from './hashicons/courseo.svg';
import dessertx from './hashicons/dessertx.svg';
import desserto from './hashicons/deserto.svg';
import etcx from './hashicons/etcx.svg';
import etco from './hashicons/etco.svg';



const init_btnlimit=10;
let btnlimit=init_btnlimit;
let check=0;

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

  const history = useHistory();
 
  const [Search_name, setSearch_name] = useState("");
  const [Searchdb, setSearchdb] =useState([]);

  // hashtag check
  const [soupCheck, setsoupCheck] = useState(false);
  const [sideCheck, setsideCheck] = useState(false);
  const [courseCheck, setcourseCheck] = useState(false);
  const [dessertCheck, setdessertCheck] = useState(false);
  const [etcCheck, setetcCheck] = useState(false);

  // 이전 상태 limit_board
  const [prev, setprev] = useState([]);

  // 선택한 정보를 보여주기 위함
  const [chosen,setchosen] = useState([]);

  // 페이지에 맞게 제한된 정보만 보여주기 위함
  const [limit_boards,setlimit_boards]=useState([]);

      // 현재 자신이 존재하는 페이지를 알기 위함
      const [page,setpage] = useState(1);

       // 보여줄 갯수만큼 잘라서 이동을해주는 temp 객체
      let page_boards=[];

      // limit은 보여줄 개수
      let limit=12;
      let start=0;
      let end=limit;
     // 총 페이지가 몇개 나오는지 담는 배열
      let page_arr=[];

      // useRef를 이용하여 이미지들의 src를 변경하기 위함
      let vegan_imageRef = useRef(null);
      let lacto_imageRef = useRef(null);
      let ovo_imageRef = useRef(null);
      let lactoovo_imageRef = useRef(null);
      let pollo_imageRef = useRef(null);
      let pesco_imageRef = useRef(null);
      let pollopesco_imageRef = useRef(null);
      let flex_imageRef = useRef(null);

      let vege_imageRef = useRef(null);
      let milk_imageRef = useRef(null);
      let egg_imageRef = useRef(null);
      let fish_imageRef = useRef(null);
      let chicken_imageRef = useRef(null);
      let meat_imageRef = useRef(null);

      let soup_imageRef = useRef(null);
      let side_imageRef = useRef(null);
      let course_imageRef = useRef(null);
      let dessert_imageRef = useRef(null);
      let etc_imageRef = useRef(null);


       // 페이지 개수를 알기위한 for문
      for(let i = 1; i <= Math.ceil(chosen.length / limit); i++) {
        page_arr.push(i);
      }

  
  useEffect(() => {
    

   // 첫 화면에 merge에서 가져온 값을 나타냄
   dbService.collection("merge").limit(13).onSnapshot((snapshot) => {
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
  
  
  // 로그아웃을 위한 함수를 선언
  const onLogOutClick = () => authService.signOut();

  const checkoutHash = () => {
    // hashtag 일괄 해제
    setsoupCheck(false);
    setsideCheck(false);
    setdessertCheck(false); 
    setcourseCheck(false);
    setetcCheck(false);

    soup_imageRef.current.src = soupx;
    side_imageRef.current.src = sidex;
    course_imageRef.current.src = coursex;
    dessert_imageRef.current.src = dessertx;
    etc_imageRef.current.src = etcx;
    
    
    setprev(() => limit_boards);
    console.log('setprev', prev);
    setlimit_boards(() => prev);
    console.log('setboard', limit_boards);

  }
  // 사용자가 선택한 type에 맞게 데이터를 선택하는 함수
      const getChosen = async (event) => {
        btnlimit=init_btnlimit;
        check=0;
        
      checkoutHash();
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
        vege_imageRef.current.src = vegeo;
        egg_imageRef.current.src = eggo;
        milk_imageRef.current.src = milkx;
        fish_imageRef.current.src = fishx;
        chicken_imageRef.current.src = chickenx;
        meat_imageRef.current.src =  meatx;

        // 클릭했을때 o로 사진을 바꿔줌
        lacto_imageRef.current.src = lactoo;

        //  나머지는 모두 x로 사진을 바꿈
        ovo_imageRef.current.src = ovox;
        lactoovo_imageRef.current.src = lactovox;
        pollo_imageRef.current.src = pollox;
        pesco_imageRef.current.src = pescox;
        pollopesco_imageRef.current.src = polpescox;
        flex_imageRef.current.src = flexix;
        vegan_imageRef.current.src = veganx;
      } 
      else if(name == "Ovo"){
        setchosen(Ovo);
        setpage(1);
        setlimit_boards(Ovo.slice(0,limit))
        vege_imageRef.current.src = vegeo;
        egg_imageRef.current.src = eggx;
        milk_imageRef.current.src = milko;
        fish_imageRef.current.src = fishx;
        chicken_imageRef.current.src = chickenx;
        meat_imageRef.current.src =  meatx;

        ovo_imageRef.current.src = ovoo;

        lacto_imageRef.current.src = lactox;
        lactoovo_imageRef.current.src = lactovox;
        pollo_imageRef.current.src = pollox;
        pesco_imageRef.current.src = pescox;
        pollopesco_imageRef.current.src = polpescox;
        flex_imageRef.current.src = flexix;
        vegan_imageRef.current.src = veganx;
      }
      else if(name == "LactoOvo"){
        setchosen(LactoOvo);
        setpage(1);
        setlimit_boards(LactoOvo.slice(0,limit))
        vege_imageRef.current.src = vegeo;
        egg_imageRef.current.src = eggo;
        milk_imageRef.current.src = milko;
        fish_imageRef.current.src = fishx;
        chicken_imageRef.current.src = chickenx;
        meat_imageRef.current.src =  meatx;


       lactoovo_imageRef.current.src = lactovoo;

       lacto_imageRef.current.src = lactox;
       ovo_imageRef.current.src = ovox;
       pollo_imageRef.current.src = pollox;
       pesco_imageRef.current.src = pescox;
       pollopesco_imageRef.current.src = polpescox;
       flex_imageRef.current.src = flexix;
       vegan_imageRef.current.src = veganx;
      }
      else if(name == "Pollo"){
        setchosen(Pollo);
        setpage(1);
        setlimit_boards(Pollo.slice(0,limit))
        vege_imageRef.current.src = vegeo;
        egg_imageRef.current.src = eggo;
        milk_imageRef.current.src = milko;
        fish_imageRef.current.src = fishx;
        chicken_imageRef.current.src = chickeno;
        meat_imageRef.current.src =  meatx;


      pollo_imageRef.current.src = polloo;

      lacto_imageRef.current.src = lactox;
      ovo_imageRef.current.src = ovox;
      lactoovo_imageRef.current.src = lactovox;
      pesco_imageRef.current.src = pescox;
      pollopesco_imageRef.current.src = polpescox;
      flex_imageRef.current.src = flexix;
      vegan_imageRef.current.src = veganx;
      }
      else if(name == "Pesco"){
        setchosen(Pesco);
        setpage(1);
        setlimit_boards(Pesco.slice(0,limit))
        vege_imageRef.current.src = vegeo;
        egg_imageRef.current.src = eggo;
        milk_imageRef.current.src = milko;
        fish_imageRef.current.src = fisho;
        chicken_imageRef.current.src = chickenx;
        meat_imageRef.current.src =  meatx;

        pesco_imageRef.current.src = pescoo;

        lacto_imageRef.current.src = lactox;
        ovo_imageRef.current.src = ovox;
        lactoovo_imageRef.current.src = lactovox;
        pollo_imageRef.current.src = pollox;
        pollopesco_imageRef.current.src = polpescox;
        flex_imageRef.current.src = flexix;
        vegan_imageRef.current.src = veganx;
      }
      else if(name == "PolloPesco"){
        setchosen(PolloPesco);
        setpage(1);
        setlimit_boards(PolloPesco.slice(0,limit))
        vege_imageRef.current.src = vegeo;
        egg_imageRef.current.src = eggo;
        milk_imageRef.current.src = milko;
        fish_imageRef.current.src = fisho;
        chicken_imageRef.current.src = chickeno;
        meat_imageRef.current.src =  meatx;

      pollopesco_imageRef.current.src = polpescod;

      lacto_imageRef.current.src = lactox;
      ovo_imageRef.current.src = ovox;
      lactoovo_imageRef.current.src = lactovox;
      pollo_imageRef.current.src = pollox;
      pesco_imageRef.current.src = pescox;
      flex_imageRef.current.src = flexix;
      vegan_imageRef.current.src = veganx;
      }
      else if(name == "Flexi"){
        setchosen(Flexi);
        setpage(1);
        setlimit_boards(Flexi.slice(0,limit))
        vege_imageRef.current.src = vegeo;
        egg_imageRef.current.src = eggo;
        milk_imageRef.current.src = milko;
        fish_imageRef.current.src = fisho;
        chicken_imageRef.current.src = chickeno;
        meat_imageRef.current.src =  meato;


       flex_imageRef.current.src = flecxio;

       lacto_imageRef.current.src = lactox;
       ovo_imageRef.current.src = ovox;
       lactoovo_imageRef.current.src = lactovox;
       pollo_imageRef.current.src = pollox;
       pesco_imageRef.current.src = pescox;
       pollopesco_imageRef.current.src = polpescox;
       vegan_imageRef.current.src = veganx;
      }
      else if(name == "Vegan"){
        setchosen(Vegan);
        setpage(1);
        setlimit_boards(Vegan.slice(0,limit));
        vege_imageRef.current.src = vegeo;
        egg_imageRef.current.src = eggx;
        milk_imageRef.current.src = milkx;
        fish_imageRef.current.src = fishx;
        chicken_imageRef.current.src = chickenx;
        meat_imageRef.current.src =  meatx;

        vegan_imageRef.current.src = vegano;

        lacto_imageRef.current.src = lactox;
        ovo_imageRef.current.src = ovox;
        lactoovo_imageRef.current.src = lactovox;
        pollo_imageRef.current.src = pollox;
        pesco_imageRef.current.src = pescox;
        pollopesco_imageRef.current.src = polpescox;
        flex_imageRef.current.src = flexix;
      }

}

const hashChosen = (event) => {
  const {
    target: {name},
  } = event;
  checkoutHash();
  if (name == "Soup") {
    if (!soupCheck){
      setpage(1);
      setlimit_boards(() => limit_boards.filter(board => board.part == "국&찌개"));
      setsoupCheck(true);
      soup_imageRef.current.src = soupo;
    }
    
  }

  else if (name == "Side") {
    if (!sideCheck){
      setpage(1);
      setlimit_boards(() => limit_boards.filter(board => board.part == "반찬"));
      setsideCheck(true);
      side_imageRef.current.src = sideo;
    }
    else {
      setpage(1);
      setsideCheck(false);
      side_imageRef.current.src = sidex;
    }
  }

  else if (name == "Course") {
    if (!courseCheck){
      setpage(1);
      setlimit_boards(() => limit_boards.filter(board => board.part == "일품"));
      setcourseCheck(true);
      course_imageRef.current.src = courseo;
    }
    else {
      setpage(1);
      setcourseCheck(false);
      course_imageRef.current.src = coursex;
    }
  }

  else if (name == "Dessert") {
    if (!dessertCheck){
      setpage(1);
      setlimit_boards(() => limit_boards.filter(board => board.part == "후식"));
      setdessertCheck(true);
      dessert_imageRef.current.src = desserto;
    }
    else {
      setpage(1);
      setdessertCheck(false);
      dessert_imageRef.current.src = dessertx;
    }
  }

  else if (name == "Etc") {
    if (!etcCheck){
      setpage(1);
      setlimit_boards(() => limit_boards.filter(board => (board.part != "국&찌개" && board.part != "일품"
                                                    && board.part != "후식" && board.part != "반찬")));
      setetcCheck(true);
      etc_imageRef.current.src = etco;
    }
    else {
      setpage(1);
      setetcCheck(false);
      etc_imageRef.current.src = etcx;
    }
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


  // 검색한 name을 set해줌
   const set_search_name = (event) => {
    const {
      target: { value },
    } = event;

    setSearch_name(value)
 
  };

  // 임시로 객체를 담는 temp와 스트링을 담는 변수 선언
  let stringVal=""
  let temp=[];

  // 검색한 name으로 검색을해서 limit_board에 넣어줌
  const search_db = () => {

    btnlimit=init_btnlimit;
    check=0;
    // 이전에 넣어둔 데이터를 밀어줌
    setlimit_boards([])
    // Flexi는 모든 레시피를 가지고 있으므로 Flexi에서 검색
   Flexi.map((name)=>(
    stringVal = name.id,
    // 찾는 name이 존재하면 값을 넣어줌
    stringVal.includes(Search_name) ? temp.push(name) : null
    ))

    // 넣은 값들을 chosen과 limit_boards에 set 페이지도 1로 다시 set
    setchosen(temp);
    setpage(1);
    setlimit_boards(temp.slice(0,limit))
 
  }

  const change_page_arr = async() => {
     // limit 만큼 증가
     if(btnlimit+init_btnlimit <= page_arr.length){
       btnlimit+=init_btnlimit;
       setpage((page+init_btnlimit))
         // Next가 실행됐는지 check
         check+=1;
     }
     else
     {
       let i=1;
       let k=1;
       while(btnlimit != page_arr.length && page_arr.length > 10)
       {
         btnlimit+=i
         k++
       }
       setpage((page+k))
     }
     console.log(page_arr.length)
     console.log(btnlimit)

      //  그 페이지에 맞게 보여줄 게시글을 계산한다
  start=((page+init_btnlimit)-1) * limit;
  end=start+limit;
  
//  계산이 끝난뒤 그 게시글만 slice해서 temp객체에 저장
page_boards=chosen.slice(start,end)


//  다시 그 temp 객체를 hook객체에 저장 (아래에 사용을 위해서 hook을 이용해야함)
setlimit_boards(page_boards)


  }


  const prev_page = async() =>{


    if(btnlimit-init_btnlimit > init_btnlimit){
      btnlimit-=init_btnlimit;

      setpage((page-init_btnlimit+1))
  
      console.log(page)
    
    }
    else
    {
      let i=1;
      while(btnlimit!=1)
      {
        btnlimit-=i
      }
      btnlimit+=init_btnlimit
      check=0;
    }

   
     //  그 페이지에 맞게 보여줄 게시글을 계산한다
  start=((page-init_btnlimit+1)-1) * limit;
  end=start+limit;
  
  //  계산이 끝난뒤 그 게시글만 slice해서 temp객체에 저장
  page_boards=chosen.slice(start,end)
  
  
  //  다시 그 temp 객체를 hook객체에 저장 (아래에 사용을 위해서 hook을 이용해야함)
  setlimit_boards(page_boards)
  
  }



    return(           
            <div className={rec.wrap}> 
               <div className={menu.LGbgr}> 
              <nav className={menu.header}> 
              <div className={menu.Rlogo}>                               
                {/* js에서는 img를 이런식으로 import해서 불러온다. */}
                <a href="/Checipe">
                  <img                  
                  className={menu.logo_img}
                  src={ checipelogo }
                  width='200vw'
                  height='200vh'
                  />
                </a>
                </div>  
                <ul className={menu.nav}>
                  <li><Link to="/About">About</Link></li>
                  <li><Link to="/Recipe">Recipe</Link></li>
                  <li><Link to="/Notice">Notice</Link></li>
                  <li><Link to="/Open">Open</Link></li>
                </ul>
                <div className={menu.login}>
                  {/* 로그인이 되어있는 상태라면 로그아웃 , 아니라면 로그인 버튼을 보여줌 */}
                  {isLoggedIn ?  <Link to="/Checipe">
                    {/* 위에 선언한 로그아웃함수를 클릭했을 때 실행 */}
                        <li onClick={onLogOutClick}>로그아웃</li>
                  </Link> : <Link to="/Loginform">
                        <li>로그인</li>
                  </Link> }
                </div>

                {/* 해당부분 삭제예정 */}
                {/* <a href='#' className={rec.menubtn} onClick>
                  <Msvg className></Msvg>
                </a> */}

              </nav>
              <div className={menu.WHbgr}>
              <div className={rec.ingredientbtn}>
                 <img src={ingredient}
                                width='150vw'
                                height='150vh'
                                alt= 'ingredient'/>
                 <img src={vegeline}
                                width='10vw'
                                height='100vh'
                                alt= 'justaline'/> 
               <img src={vegex} ref={vege_imageRef}
                                width='100vw'
                                height='100vh'
                                name="Vege"/>                                
               <img src={eggx} ref={egg_imageRef}
                                width='100vw'
                                height='100vh'
                                name="Egg"/>
               <img src={milkx} ref={milk_imageRef}
                                width='100vw'
                                height='100vh'
                                name="Milk"/>  
               <img src={fishx} ref={fish_imageRef}
                                width='100vw'
                                height='100vh'
                                name="Fish"/> 
               <img src={chickenx} ref={chicken_imageRef}
                                width='100vw'
                                height='100vh'
                                name="Chicken"/> 
               <img src={meatx} ref={meat_imageRef}
                                width='100vw'
                                height='100vh'
                                name="Meat"/>                                                                                  
              </div>

              <div className={rec.vegetarianbtn}>
              <img src={vegetarian}
                                width='150vw'
                                height='150vh'
                                alt= 'vegetarian'/>
              <img src={vegeline}
                                width='10vw'
                                height='100vh'
                                alt= 'justaline'/>          
                                        {/*클릭시 이미지의 변경을 위해 ref를 사용  */}
              <img onClick={getChosen} src={veganx} ref={vegan_imageRef}
                                width='100vw'
                                height='100vh'
                                name="Vegan"/>
              <img onClick={getChosen} src={lactox} ref={lacto_imageRef}
                                  width='100vw'
                                  height='100vh'
                                name="Lacto"/>
               <img onClick={getChosen} src={ovox} ref={ovo_imageRef}
                                  width='100vw'
                                  height='100vh'
                                name="Ovo"/>
               <img onClick={getChosen} src={lactovox} ref={lactoovo_imageRef}
                                  width='100vw'
                                  height='100vh'
                                name="LactoOvo"/>
               <img onClick={getChosen} src={pollox} ref={pollo_imageRef}
                                  width='100vw'
                                  height='100vh'
                                name="Pollo"/>
               <img onClick={getChosen} src={pescox} ref={pesco_imageRef}
                                  width='100vw'
                                  height='100vh'
                                name="Pesco"/>   
                <img onClick={getChosen} src={polpescox} ref={pollopesco_imageRef}
                                  width='100vw'
                                  height='100vh'
                                name="PolloPesco"/>   
                <img onClick={getChosen} src={flexix} ref={flex_imageRef}
                                  width='100vw'
                                  height='100vh'
                                name="Flexi"/>                                                                        
            </div>  
            <div className={rec.hashtagbtn}>
              {/* 해시테그 부분임 */}
            <img src={hashtag}
                                width='150vw'
                                height='150vh'
                                alt= 'hashtag'/>
             <img src={hashline}
                                width='10vw'
                                height='50vh'
                                alt= 'hashline'/>
            <img onClick={hashChosen} src={soupx} ref={soup_imageRef}
                                  width='130vw'
                                  height='130vh'
                                name="Soup"/>   
            <img onClick={hashChosen} src={sidex} ref={side_imageRef}
                                  width='100vw'
                                  height='100vh'
                                name="Side"/>      
            <img onClick={hashChosen} src={coursex} ref={course_imageRef}
                                  width='100vw'
                                  height='100vh'
                                name="Course"/>        
            <img onClick={hashChosen} src={dessertx} ref={dessert_imageRef}
                                  width='100vw'
                                  height='100vh'
                                name="Dessert"/> 
            <img onClick={hashChosen} src={etcx} ref={etc_imageRef}
                                  width='100vw'
                                  height='100vh'
                                name="Etc"/>                                                                                                                                                             
            </div>
          
              </div>
              </div>
              <div>
              <div className={menu.space}></div>
          {/* 버튼을 클릭했을때 name의 값을 getChosen으로 넘겨줌 */}
          <div className={menu.DGbgr}>
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
                  manual={ Show.manual}
                  step={Show.step}
                />
              ))}
            </div>
            </div>
  {/* 페이지 개수에 맞게 페이지 번호를 만들어주고 클릭시에 그 페이지에 맞는 게시글을 보여줌 */}
  <div>
              <button className={rec.page_num} onClick={prev_page}>PREV</button>
                {check==0 ?  page_arr.map( (el,key) =>  
                    el < btnlimit + 1 ?  <button key={key} className={rec.page_num} onClick={getpage} name={el} > {el} </button>         
                : null ) 
                : page_arr.map( (el,key) =>  
                el+btnlimit-init_btnlimit < btnlimit + 2 ?  <button key={key} className={rec.page_num} onClick={getpage} name={el+btnlimit-init_btnlimit-1} > 
                {el+btnlimit-init_btnlimit-1} </button>         
            :  null ) }
    <button className={rec.page_num} onClick={change_page_arr} >NEXT</button>

              </div>
          </div>          
          <div >
                
                    <input 
                    onChange={set_search_name}
                    type = 'text'
                    placeholder='검색'
                     />
                     <button onClick={search_db}>검색</button>
                </div>
            </div>
            
          
    );
}         


 export default Recipe;
