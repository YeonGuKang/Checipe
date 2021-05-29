import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Switch, Link, BrowserRouter, useHistory } from 'react-router-dom';
import checipelogo from './image/checipelogo.svg';
import rec from "./style/Recipesp.module.css";
import menu from "./style/MenuBar.module.css";

import Header from "../components/Header"

import { authService, dbService } from '../firebase';
import { ReactComponent as Msvg } from './image/menu.svg'

import leafr1 from './leaves/leafR1.svg';
import leafr2 from './leaves/leafR2.svg';
import leafr3 from './leaves/leafR3.svg';

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
import { event, isEmptyObject } from "jquery";

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

import bookmarkx from './image/bookmarkx.svg';
import bookmarko from './image/bookmarko.svg';
import heart from './image/heart.svg';

// 페이지 잘라서 보여줄 갯수
const init_btnlimit = 10;
// 몇개의 페이지가 존재할지 확인하는 변수
let btnlimit = init_btnlimit;
// next버튼이 클릭됐는지 확인하는 변수
let check = 0;

// 마지막 페이지인지 확인
let last_page = false;

const Recipe = () => {

  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const [IsManager, setIsManger] = useState(false);

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

  const [Merge, setMerge] = useState([]);
  const history = useHistory();

  const [Search_name, setSearch_name] = useState("");
  const [Searchdb, setSearchdb] = useState([]);

  // hashtag check
  const [soupCheck, setsoupCheck] = useState(false);
  const [sideCheck, setsideCheck] = useState(false);
  const [courseCheck, setcourseCheck] = useState(false);
  const [dessertCheck, setdessertCheck] = useState(false);
  const [etcCheck, setetcCheck] = useState(false);

  // 즐찾 버튼 확인
  const [bookmarkCheck, setbookmarkCheck] = useState(false);

  // 즐겨찾기해놓은 레시피의 이름을 담는다
  const [favorite_list, setfavorite_list] = useState([]);


  // vegan step state
  const [step, setstep] = useState([]);

  // 선택한 정보를 보여주기 위함
  const [chosen, setchosen] = useState([]);

  // 페이지에 맞게 제한된 정보만 보여주기 위함
  const [limit_boards, setlimit_boards] = useState([]);

  // 현재 자신이 존재하는 페이지를 알기 위함
  const [page, setpage] = useState(1);

  // 보여줄 갯수만큼 잘라서 이동을해주는 temp 객체
  let page_boards = [];

  // limit은 보여줄 개수
  let limit = 50;
  let start = 0;
  let end = limit;
  // 총 페이지가 몇개 나오는지 담는 배열
  let page_arr = [];

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

  let BookmarkRef = useRef(null);

  // 페이지 개수를 알기위한 for문
  for (let i = 1; i <= Math.ceil(chosen.length / limit); i++) {
    page_arr.push(i);
  }


  useEffect(() => {
    last_page = false;
    // 스크롤 상단으로 초기화
    window.scrollTo(0, 0);
    authService.onAuthStateChanged((user) => {

      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);

      } else {
        setIsLoggedIn(false);
        setIsManger(false);
      }
      setInit(true);

    });



    // 첫 화면에 merge에서 가져온 값을 나타냄
    dbService.collection("merge").limit(20).onSnapshot((snapshot) => {
      const boardArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      shuffle(boardArray);
      setMerge(boardArray);
      setchosen(boardArray);
      setstep(boardArray);  // setp 설정
      // 첫화면에 merge에서 limit만큼 가져온걸 보여줌
      setlimit_boards(boardArray.slice(0, limit))
    });

    dbService.collection("vegan").limit(20).onSnapshot((snapshot) => {
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

    dbService.collection("lacto").limit(20).onSnapshot((snapshot) => {
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

    dbService.collection("ovo").limit(20).onSnapshot((snapshot) => {
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

    dbService.collection("lacto-ovo").limit(20).onSnapshot((snapshot) => {
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

    dbService.collection("pollo").limit(20).onSnapshot((snapshot) => {
      const boardArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPollo((prev) => shuffle([...boardArray, ...prev]));

      // 페스코를 제외하고 위로 모두 해당
      setPolloPesco((prev) => [...boardArray, ...prev])
      setFlexi((prev) => [...boardArray, ...prev])

    });

    dbService.collection("pesco").limit(20).onSnapshot((snapshot) => {
      const boardArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPesco((prev) => shuffle([...boardArray, ...prev]));

      // 폴로를 제외하고 위로 모두 해당
      setPolloPesco((prev) => [...boardArray, ...prev])
      setFlexi((prev) => [...boardArray, ...prev])

    });

    dbService.collection("pollo-pesco").limit(20).onSnapshot((snapshot) => {
      const boardArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPolloPesco((prev) => shuffle([...boardArray, ...prev]));

      // 본인 위로 모두 해당
      setFlexi((prev) => [...boardArray, ...prev])

    });

    dbService.collection("flex").limit(20).onSnapshot((snapshot) => {
      const boardArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // 모든 것을 감싸는 felxi
      setFlexi((prev) => shuffle([...boardArray, ...prev]));
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


  // 모든 타입 버튼을 일괄 해체 해주는 함수
  const typeoff = () => {
    //  나머지는 모두 x로 사진을 바꿈
    ovo_imageRef.current.src = ovox;
    lactoovo_imageRef.current.src = lactovox;
    pollo_imageRef.current.src = pollox;
    pesco_imageRef.current.src = pescox;
    pollopesco_imageRef.current.src = polpescox;
    flex_imageRef.current.src = flexix;
    lacto_imageRef.current.src = lactox;
    vegan_imageRef.current.src = veganx;
  }

  // hashtag를 일괄 해제 해주는 함수
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

  }
  // 사용자가 선택한 type에 맞게 데이터를 선택하는 함수
  const getChosen = async (event) => {
    btnlimit = init_btnlimit;
    check = 0;
    last_page = false;

    // 사용자가 비건 type을 선정하면 hashtag를 모두 선택해제한다.
    checkoutHash();

    setbookmarkCheck(false);  // 비건 타입을 누르면 즐찾은 해제
    BookmarkRef.current.src = bookmarkx // 즐찾은 해제

    // event안에 존재하는 target의 value를 name으로 넘긴다.
    const {
      target: { name },
    } = event;
    // 아래 name으로 판단해서 chosen 객체에 앎맞는 데이터를 주입
    if (name == "Lacto") {
      setstep(Lacto);
      setchosen(Lacto);
      // type버튼이 클릭되면 page를 다시 1로 세팅
      setpage(1);
      // 처음에 0부터 limit만큼 값을 넣어줌
      setlimit_boards(Lacto.slice(0, limit))
      vege_imageRef.current.src = vegeo;
      egg_imageRef.current.src = eggo;
      milk_imageRef.current.src = milkx;
      fish_imageRef.current.src = fishx;
      chicken_imageRef.current.src = chickenx;
      meat_imageRef.current.src = meatx;

      // 모든 타입을 x로 사진을 바꿈
      typeoff();

      // 클릭했을때 o로 사진을 바꿔줌
      lacto_imageRef.current.src = lactoo;


    }
    else if (name == "Ovo") {
      setstep(Ovo)
      setchosen(Ovo);
      setpage(1);
      setlimit_boards(Ovo.slice(0, limit))
      vege_imageRef.current.src = vegeo;
      egg_imageRef.current.src = eggx;
      milk_imageRef.current.src = milko;
      fish_imageRef.current.src = fishx;
      chicken_imageRef.current.src = chickenx;
      meat_imageRef.current.src = meatx;

      typeoff();

      ovo_imageRef.current.src = ovoo;


    }
    else if (name == "LactoOvo") {
      setstep(LactoOvo)
      setchosen(LactoOvo);
      setpage(1);
      setlimit_boards(LactoOvo.slice(0, limit))
      vege_imageRef.current.src = vegeo;
      egg_imageRef.current.src = eggo;
      milk_imageRef.current.src = milko;
      fish_imageRef.current.src = fishx;
      chicken_imageRef.current.src = chickenx;
      meat_imageRef.current.src = meatx;


      typeoff();


      lactoovo_imageRef.current.src = lactovoo;

    }
    else if (name == "Pollo") {
      setstep(Pollo)
      setchosen(Pollo);
      setpage(1);
      setlimit_boards(Pollo.slice(0, limit))
      vege_imageRef.current.src = vegeo;
      egg_imageRef.current.src = eggo;
      milk_imageRef.current.src = milko;
      fish_imageRef.current.src = fishx;
      chicken_imageRef.current.src = chickeno;
      meat_imageRef.current.src = meatx;

      typeoff();

      pollo_imageRef.current.src = polloo;
    }
    else if (name == "Pesco") {
      setstep(Pesco)
      setchosen(Pesco);
      setpage(1);
      setlimit_boards(Pesco.slice(0, limit))
      vege_imageRef.current.src = vegeo;
      egg_imageRef.current.src = eggo;
      milk_imageRef.current.src = milko;
      fish_imageRef.current.src = fisho;
      chicken_imageRef.current.src = chickenx;
      meat_imageRef.current.src = meatx;

      typeoff();

      pesco_imageRef.current.src = pescoo;
    }
    else if (name == "PolloPesco") {
      setstep(PolloPesco)
      setchosen(PolloPesco);
      setpage(1);
      setlimit_boards(PolloPesco.slice(0, limit))
      vege_imageRef.current.src = vegeo;
      egg_imageRef.current.src = eggo;
      milk_imageRef.current.src = milko;
      fish_imageRef.current.src = fisho;
      chicken_imageRef.current.src = chickeno;
      meat_imageRef.current.src = meatx;

      typeoff();

      pollopesco_imageRef.current.src = polpescod;

    }
    else if (name == "Flexi") {
      setstep(Flexi)
      setchosen(Flexi);
      setpage(1);
      setlimit_boards(Flexi.slice(0, limit))
      vege_imageRef.current.src = vegeo;
      egg_imageRef.current.src = eggo;
      milk_imageRef.current.src = milko;
      fish_imageRef.current.src = fisho;
      chicken_imageRef.current.src = chickeno;
      meat_imageRef.current.src = meato;

      typeoff();


      flex_imageRef.current.src = flecxio;

    }
    else if (name == "Vegan") {
      setstep(Vegan)
      setchosen(Vegan);
      setpage(1);
      setlimit_boards(Vegan.slice(0, limit));
      vege_imageRef.current.src = vegeo;
      egg_imageRef.current.src = eggx;
      milk_imageRef.current.src = milkx;
      fish_imageRef.current.src = fishx;
      chicken_imageRef.current.src = chickenx;
      meat_imageRef.current.src = meatx;

      typeoff();

      vegan_imageRef.current.src = vegano;

    }

  }


  const hashChosen = (event) => {
    btnlimit = init_btnlimit;
    check = 0;
    last_page = false;

    const {
      target: { name },
    } = event;

    // hashtag 버튼이 눌리면 우선 모든 hashtag의 버튼 눌림을 해제(???????????)
    checkoutHash();

    setbookmarkCheck(false);  // 비건 타입을 누르면 즐찾은 해제
    BookmarkRef.current.src = bookmarkx // 즐찾은 해제

    if (name == "Soup") {     // name이 soup이면 국과 찌개인 레시피를 보여줌
      if (!soupCheck) {  // 버튼이 눌려있는지 확인
        setpage(1);     // 페이지 설정
        setlimit_boards(() => step.filter(board => board.part == "국&찌개").slice(0, limit)); // limit_boards에 step을 fillter한 결과를 넣는다.
        setchosen(() => step.filter(board => board.part == "국&찌개"))    // step을 필터한 결과를 chosen에 넣음(페이지 네이션을 위한 것)
        setsoupCheck(true);     // 버튼이 눌림 상태로 변경
        soup_imageRef.current.src = soupo;   // 이미지 변경
      }

      else {
        setpage(1);
        setlimit_boards(() => step.slice(0, limit)) // 한 번더 누른 경우 원래 상태로 되돌린다.(step으로 되돌림)
        setchosen(step) // 페이지 네이션을 위해 다시 chosen을 원래 상태로 돌려 놓음
        side_imageRef.current.src = sidex;   // 이미지 변경
      }

    }

    else if (name == "Side") {
      if (!sideCheck) {
        setpage(1);
        setlimit_boards(() => step.filter(board => board.part == "반찬").slice(0, limit));
        setchosen(() => step.filter(board => board.part == "반찬"));
        setsideCheck(true);
        side_imageRef.current.src = sideo;
      }
      else {
        setpage(1);
        setlimit_boards(() => step.slice(0, limit));
        setchosen(step);
        side_imageRef.current.src = sidex;
      }
    }

    else if (name == "Course") {
      if (!courseCheck) {
        setpage(1);
        setlimit_boards(() => step.filter(board => board.part == "일품").slice(0, limit));
        setchosen(() => step.filter(board => board.part == "일품"));
        setcourseCheck(true);
        course_imageRef.current.src = courseo;
      }
      else {
        setpage(1);
        setlimit_boards(() => step.slice(0, limit));
        setchosen(step);
        course_imageRef.current.src = coursex;
      }
    }

    else if (name == "Dessert") {
      if (!dessertCheck) {
        setpage(1);
        setlimit_boards(() => step.filter(board => board.part == "후식").slice(0, limit));
        setchosen(() => step.filter(board => board.part == "후식"))
        setdessertCheck(true);
        dessert_imageRef.current.src = desserto;
      }
      else {
        setpage(1);
        setlimit_boards(() => step.slice(0, limit))
        setchosen(step)
        dessert_imageRef.current.src = dessertx;
      }
    }

    else if (name == "Etc") {
      if (!etcCheck) {
        setpage(1);
        setlimit_boards(() => step.filter(board => (board.part != "국&찌개" && board.part != "일품"
          && board.part != "후식" && board.part != "반찬")).slice(0, limit));
        setchosen(() => step.filter(board => (board.part != "국&찌개" && board.part != "일품"
          && board.part != "후식" && board.part != "반찬")))
        setetcCheck(true);
        etc_imageRef.current.src = etco;
      }
      else {
        setpage(1);
        setlimit_boards(() => step.slice(0, limit))
        setchosen(step)
        etc_imageRef.current.src = etcx;
      }
    }
    console.log("hash page", page)
  }

  // 현재 페이지를 보고 그 페이지에 맞게 게시글을 보여주는 함수
  const getpage = async (event) => {
    // event안에 존재하는 target의 value를 name으로 넘긴다.
    const {
      target: { name },
    } = event;



    // 현재 페이지를 받고
    setpage(Number(name));

    //  그 페이지에 맞게 보여줄 게시글을 계산한다
    start = (name - 1) * limit;
    end = start + limit;

    //  계산이 끝난뒤 그 게시글만 slice해서 temp객체에 저장
    page_boards = chosen.slice(start, end)


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
  let stringVal = ""
  let temp = [];

  // 검색한 name으로 검색을해서 limit_board에 넣어줌
  const search_db = () => {


    // 현재 chosen 을 판단해서 해당 type에서 검색
    if (chosen == Vegan) {
      Vegan.map((name) => (
        stringVal = name.id,
        // 찾는 name이 존재하면 값을 넣어줌
        stringVal.includes(Search_name) ? temp.push(name) : null
      ))
    }
    else if (chosen == Lacto) {
      Lacto.map((name) => (
        stringVal = name.id,
        stringVal.includes(Search_name) ? temp.push(name) : null
      ))
    }
    else if (chosen == Ovo) {
      Ovo.map((name) => (
        stringVal = name.id,
        stringVal.includes(Search_name) ? temp.push(name) : null
      ))
    }
    else if (chosen == LactoOvo) {
      LactoOvo.map((name) => (
        stringVal = name.id,
        stringVal.includes(Search_name) ? temp.push(name) : null
      ))
    }
    else if (chosen == Pollo) {
      Pollo.map((name) => (
        stringVal = name.id,
        stringVal.includes(Search_name) ? temp.push(name) : null
      ))
    }
    else if (chosen == Pesco) {
      Pesco.map((name) => (
        stringVal = name.id,
        stringVal.includes(Search_name) ? temp.push(name) : null
      ))
    }
    else if (chosen == PolloPesco) {
      PolloPesco.map((name) => (
        stringVal = name.id,
        stringVal.includes(Search_name) ? temp.push(name) : null
      ))
    }
    // 모두 아닌경우 모든 레시피를 가지고있는 Flexi에서 검색
    else {
      Flexi.map((name) => (
        stringVal = name.id,
        // 찾는 name이 존재하면 값을 넣어줌
        stringVal.includes(Search_name) ? temp.push(name) : null
      ))
    }

    // 검색결과가 존재하는지 판단
    if (isEmptyObject(temp)) {
      alert('검색결과가 존재하지 않습니다.')
    }
    else {
      btnlimit = init_btnlimit;
      check = 0;
      last_page = false;
      // 이전에 넣어둔 데이터를 밀어줌
      setlimit_boards([])

      // 넣은 값들을 chosen과 limit_boards에 set 페이지도 1로 다시 set
      setchosen(temp);
      setpage(1);
      setlimit_boards(temp.slice(0, limit))
    }

    setSearch_name("")

  }
  // 검색에서 Enter를 누르면 검색을 진행
  const isEnter = (e) => {
    if (e.key == "Enter") {
      search_db()
    }
  }

  const change_page_arr = async () => {

    // limit 만큼 증가
    if (btnlimit + init_btnlimit < page_arr.length) {
      btnlimit += init_btnlimit;
      setpage((page + init_btnlimit))
      // Next가 실행됐는지 check
      check += 1;
    }
    else {
      last_page = true;
      let i = 1;
      let k = 1;
      // 버튼이 init 보단 작지만 뒤에 몇개가 더 생성되는지 판단
      while (btnlimit != page_arr.length && page_arr.length > 10) {
        btnlimit += i
        k++
      }

      // page가 더이상 마지막을 넘어가지 않도록 설정
      if ((page + k) <= btnlimit && k != 1) {
        setpage((page + k))
      }

      console.log("k", k)

    }

    //  그 페이지에 맞게 보여줄 게시글을 계산한다
    if (check != 0)  // check가 0이면 페이지가 init 미만이므로 실행 X
    {
      start = ((page + init_btnlimit) - 1) * limit;
      end = start + limit;


      //  계산이 끝난뒤 그 게시글만 slice해서 temp객체에 저장
      page_boards = chosen.slice(start, end)


      //  다시 그 temp 객체를 hook객체에 저장 (아래에 사용을 위해서 hook을 이용해야함)
      setlimit_boards(page_boards)

    }


  }


  const prev_page = async () => {

    last_page = false;
    // 맨 앞으로 왔을 경우에 prev실행 X
    if (check == 0) {
      return
    }

    // 버튼을 보여주는 limit이 초기에 설정한 값보다 크면 실행
    if (btnlimit - init_btnlimit > init_btnlimit) {
      btnlimit -= init_btnlimit;

      setpage((page - init_btnlimit + 1))

    }
    // 그게 아니라면
    else {
      let i = 1;

      while (btnlimit != 1) {
        console.log("btm", btnlimit)
        btnlimit -= i
      }
      btnlimit += init_btnlimit

      // 맨 앞으로 왔을경우
      check = 0;
      setpage(1)
    }


    //  그 페이지에 맞게 보여줄 게시글을 계산한다


    start = ((page - init_btnlimit + 1) - 1) * limit;
    end = start + limit;


    //  계산이 끝난뒤 그 게시글만 slice해서 temp객체에 저장
    page_boards = chosen.slice(start, end)


    //  다시 그 temp 객체를 hook객체에 저장 (아래에 사용을 위해서 hook을 이용해야함)
    setlimit_boards(page_boards)

  }

  const bookChosen = async (event) => {
    btnlimit = init_btnlimit;
    check = 0;

    const {
      target: { name },
    } = event;

    if (name == "Bookmark") {
      typeoff();
      checkoutHash();
      BookmarkRef.current.src = bookmarko;

    }
  }

  // 내가 현재 즐겨찾기 해놓은것을 알기 위한 함수
  const Show_favorite = async (event) => {
    // 
    btnlimit = init_btnlimit;
    check = 0;
    last_page = false;

    setstep(Merge); // 즐찾을 누르면 비건 단계가 풀림(merge로 설정)

    vege_imageRef.current.src = vegex;
    egg_imageRef.current.src = eggx;
    milk_imageRef.current.src = milkx;
    fish_imageRef.current.src = fishx;
    chicken_imageRef.current.src = chickenx;
    meat_imageRef.current.src = meatx;

    if (!bookmarkCheck) {
      typeoff();
      checkoutHash();
      BookmarkRef.current.src = bookmarko;

      setbookmarkCheck(true);
      setfavorite_list([]);
      setlimit_boards([]);
      setchosen([]);
      // 해당 유저의 즐겨찾기 정보를 보두 가져온다.
      await dbService.collection("유저정보").doc(userObj.uid).collection("즐겨찾기").onSnapshot((snapshot) => {
        const favoriteArray = snapshot.docs.map((doc) => ({
          ...doc.data()
        }));
        // 즐겨찾기 해놓은 모든 레시피에 대해서 실행
        while (favoriteArray.length) {
          //  즐겨찾기 해놓은 이름을 기반으로 객체를 넣어주는 함수를 실행
          get_favorite(favoriteArray)
        }
      });


      setpage(1);

    }
    else {
      setbookmarkCheck(false);
      BookmarkRef.current.src = bookmarkx;
      setchosen(Merge);
      setlimit_boards(Merge.slice(0, limit));
    }
  }

  //  즐겨찾기 해놓은 이름을 기반으로 객체를 넣어주는 함수
  const get_favorite = async (favoriteArray) => {
    // 즐겨찾기 해놓은 레시피 이름을 저장
    const id = favoriteArray.pop()['favorite']
    // 그 레시피 이름을 기반으로 데이터를 merge에서 불러옴
    const res = await dbService.collection('merge').doc(id).get();
    var favorite_data = res.data()

    // id를 이렇게 따로 넣어줘야 함
    favorite_data.id = id;

    // 불러온 레시피의 정보를 모두 set해줌
    setfavorite_list((prev) => [favorite_data, ...prev]);
    setchosen((prev) => [favorite_data, ...prev]);
    setlimit_boards((prev) => [favorite_data, ...prev].slice(0, limit))
  }


  return (
    <div className={rec.wrap}>
      <img className={rec.leaf} id={rec.r1} src={leafr1} />
      <img className={rec.leaf} id={rec.r2} src={leafr2} />
      <img className={rec.leaf} id={rec.r3} src={leafr3} />
      <div className={menu.LGbgr}>
        <Header></Header>
        <div className={rec.WHbgr}>
          <div className={rec.btnsection}>

            <div className={rec.ingredientbtn}>
              <img src={ingredient}
                alt='ingredient' />
              <img src={vegeline}
                alt='justaline' />
              <img src={vegex} ref={vege_imageRef}
                name="Vege" />
              <img src={eggx} ref={egg_imageRef}
                name="Egg" />
              <img src={milkx} ref={milk_imageRef}
                name="Milk" />
              <img src={fishx} ref={fish_imageRef}
                name="Fish" />
              <img src={chickenx} ref={chicken_imageRef}
                name="Chicken" />
              <img src={meatx} ref={meat_imageRef}
                name="Meat" />
            </div>

            <div className={rec.vegetarianbtn}>
              <img src={vegetarian}
                alt='vegetarian' />
              <img src={vegeline}
                alt='justaline' />
              {/*클릭시 이미지의 변경을 위해 ref를 사용  */}
              <img onClick={getChosen} src={veganx} ref={vegan_imageRef}
                name="Vegan" />
              <img onClick={getChosen} src={lactox} ref={lacto_imageRef}
                name="Lacto" />
              <img onClick={getChosen} src={ovox} ref={ovo_imageRef}
                name="Ovo" />
              <img onClick={getChosen} src={lactovox} ref={lactoovo_imageRef}
                name="LactoOvo" />
              <img onClick={getChosen} src={pollox} ref={pollo_imageRef}
                name="Pollo" />
              <img onClick={getChosen} src={pescox} ref={pesco_imageRef}
                name="Pesco" />
              <img onClick={getChosen} src={polpescox} ref={pollopesco_imageRef}
                name="PolloPesco" />
              <img onClick={getChosen} src={flexix} ref={flex_imageRef}
                name="Flexi" />
            </div>

            <div className={rec.hashtagbtn}>
              {/* 해시테그 부분임 */}
              <img src={hashtag}
                alt='hashtag' />
              <img src={hashline}
                alt='hashline' />
              <img onClick={hashChosen} src={soupx} ref={soup_imageRef}
                name="Soup" />
              <img onClick={hashChosen} src={sidex} ref={side_imageRef}
                name="Side" />
              <img onClick={hashChosen} src={coursex} ref={course_imageRef}
                name="Course" />
              <img onClick={hashChosen} src={dessertx} ref={dessert_imageRef}
                name="Dessert" />
              <img onClick={hashChosen} src={etcx} ref={etc_imageRef}
                name="Etc" />
              <img onClick={Show_favorite}
                id={rec.book}
                src={bookmarkx} ref={BookmarkRef}
                name="Bookmark" />
            </div>

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
            {limit_boards.map((Show) => (
              < Rlist
                name={Show.id}
                key={Show.id}
                img={Show.img}
                part={Show.part}
                way={Show.way}
                detail={Show.detail}
                number={Show.number}
                manual={Show.manual}
                step={Show.step}
                like={Show.like}
              />
            ))}
          </div>

          {/* 페이지 개수에 맞게 페이지 번호를 만들어주고 클릭시에 그 페이지에 맞는 게시글을 보여줌 */}
          <div className={rec.numnqna}>
            <div className={rec.numbering}>
              <li className={rec.page_num} onClick={prev_page}> &#60; PREV </li>
              {check == 0 ? page_arr.map((el, key) =>
                el < btnlimit + 1 ? <button key={key} className={rec.page_num} onClick={getpage} name={el} > {el} </button>
                  : null)
                : page_arr.map((el, key) =>
                  el + btnlimit - init_btnlimit < btnlimit + 2 ? <button key={key} className={rec.page_num} onClick={getpage} name={el + btnlimit - init_btnlimit - 1} >
                    {el + btnlimit - init_btnlimit - 1} </button>
                    : null)}
              {last_page ? null : <li className={rec.page_num} onClick={change_page_arr}> NEXT &#62; </li>}
            </div>
            <div className={rec.qna}>
              <input
                onKeyPress={isEnter}
                value={Search_name}
                onChange={set_search_name}
                type='text'
                placeholder='음식 검색'
              />
              <li onClick={search_db}> &nbsp; 검색</li>
            </div>
          </div>

        </div>




      </div>

    </div>


  );
}


export default Recipe;
