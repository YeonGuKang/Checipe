import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link, BrowserRouter, Redirect } from 'react-router-dom';
import checipe_logo from './image/chaecipielogo.png';
import checipelogo from './image/checipelogo.svg';
import rec from "./Recipe.module.css";
import noti from "./Notice.module.css";
import menu from "./MenuBar.module.css";

import { authService , dbService } from '../firebase';
import {ReactComponent as Msvg} from './image/menu.svg'

const init_btnlimit=4;
let btnlimit=init_btnlimit;
let check=0;

const Notice = () => {
  

    const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  //  DB에 존재하는 게시글을 받아오기 위함
  const [board, setboard] = useState("");
  const [boards, setboards] = useState([]);
  const [limit_boards,setlimit_boards]=useState([]);


  // 현재 자신이 존재하는 페이지를 알기 위함
  const [page,setpage] = useState(1);
  
  // 보여줄 갯수만큼 잘라서 이동을해주는 temp 객체
  let page_boards=[];

  // limit은 보여줄 개수
  let limit=5;
  let start=0;
  let end=limit;

  // 총 페이지가 몇개 나오는지 담는 배열
  let page_arr=[];

  // 페이지 개수를 알기위한 for문
  for(let i = 1; i <= Math.ceil(boards.length / limit); i++) {
    page_arr.push(i);
  }

  
  useEffect(() => {

    // DB에서 게시글을 받아오는 과정
    dbService.collection("게시글").orderBy("createdAt","desc").onSnapshot((snapshot) => {
        const boardArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setboards(boardArray);
        setlimit_boards(boardArray.slice(0,limit))
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
 page_boards=boards.slice(start,end)


//  다시 그 temp 객체를 hook객체에 저장 (아래에 사용을 위해서 hook을 이용해야함)
 setlimit_boards(page_boards)

}




    // 로그아웃을 위한 함수를 선언
    const onLogOutClick = () => authService.signOut();

  

const prev_page = async() =>{

  setpage((page-init_btnlimit+1))

  console.log(page)

  // Next가 실행됐는지 check
  check+=1;

  // limit 만큼 증가
  btnlimit-=init_btnlimit;

   //  그 페이지에 맞게 보여줄 게시글을 계산한다
start=((page-init_btnlimit+1)-1) * limit;
end=start+limit;

//  계산이 끝난뒤 그 게시글만 slice해서 temp객체에 저장
page_boards=boards.slice(start,end)


//  다시 그 temp 객체를 hook객체에 저장 (아래에 사용을 위해서 hook을 이용해야함)
setlimit_boards(page_boards)

}



    const change_page_arr = async(event) => {

      const {
        target: {name},
      } = event;
      
        // 현재 페이지를 받고
       setpage(name);

       // Next가 실행됐는지 check
       check+=1;

       // limit 만큼 증가
       btnlimit+=init_btnlimit;

        //  그 페이지에 맞게 보여줄 게시글을 계산한다
    start=(name-1) * limit;
    end=start+limit;
    
  //  계산이 끝난뒤 그 게시글만 slice해서 temp객체에 저장
 page_boards=boards.slice(start,end)


//  다시 그 temp 객체를 hook객체에 저장 (아래에 사용을 위해서 hook을 이용해야함)
 setlimit_boards(page_boards)


      console.log(page_arr)
      console.log(name)

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
            <a href='#' className={rec.menubtn} onClick>
              <Msvg className></Msvg>
            </a>
          </nav>
          <li><Link to="/Register">글 등록하기</Link></li>

        {/* 게시글을 보여주기 위한 middle 부분 */}
          <div className = {noti.middle}>
            <div className={noti.board}>
                <div  className={noti.board_detail}>
                  {/* 제목 부분에 title을 불러옴 */}
                    <div>
                        제목
                        {limit_boards.map(board => 
                        <div key={board.id}>
                         <li><Link to = {{pathname: "/View/" + board.id,
                                          state: {
                                            createdAt: board.createdAt,
                                            title: board.title,
                                            content: board.content
                                          }}}>{board.title}</Link></li>
                        </div>
                     
                       )
                        }
              
                    </div>
                    {/* 마찬가지로 날짜 부분에 만든 날짜를 게시글 작성 날짜를 불러옴 */}
                    <div className={noti.board_date}>
                        날짜
                        {console.log("정보출력" , limit_boards)}
                        {limit_boards.map(board => 
                        <div key={board.id} >
                            <h4>{board.createdAt}</h4>
                        </div>)
                        }
                    </div>
                    </div>
                {/* 페이징을 위한 부분 */}
                    <div className={noti.paging_div}>
         
         {/* 페이지 개수에 맞게 페이지 번호를 만들어주고 클릭시에 그 페이지에 맞는 게시글을 보여줌 */}


         <div>
              <button className={rec.page_num}  onClick={prev_page}>PREV</button>
                {check==0 ?  page_arr.map( (el,key) =>  
                    el < btnlimit + 1 ?  <button key={key} className={rec.page_num} onClick={getpage} name={el} > {el} </button>         
                : el < btnlimit + 2 ? <button className={rec.page_num} onClick={change_page_arr} name={el}>NEXT</button> : null ) 
                : page_arr.map( (el,key) =>  
                el+btnlimit-init_btnlimit < btnlimit + 1 ?  <button key={key} className={rec.page_num} onClick={getpage} name={el+btnlimit-init_btnlimit-1} > {el+btnlimit-init_btnlimit-1} </button>         
            : el < btnlimit-init_btnlimit*check + 2 ? <button className={rec.page_num} onClick={change_page_arr} name={el+btnlimit-init_btnlimit-1}>NEXT</button> : null ) }
              </div>
            </div>
            
              </div>
              
              

          </div>
          
      </div>         
          <div className={rec.half_bg} />  
        </div>
        
        
);
}


export default Notice;