import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link, BrowserRouter, Redirect } from 'react-router-dom';
import checipe_logo from './image/chaecipielogo.png';
import rec from "./Recipe.module.css";
import { authService , dbService } from '../firebase';
import {ReactComponent as Msvg} from './image/menu.svg'



const Notice = () => {

    const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  //  DB에 존재하는 게시글을 받아오기 위함
  const [board, setboard] = useState("");
  const [boards, setboards] = useState([]);
  const [limit_boards,setlimit_boards]=useState([]);

  // url 설정이 완료됐나 확인
  const [check,setcheck] = useState(false);

  // 선택한 게시글에 알맞는 url을 설정해주기 위함
  const [View_url,setView_url] = useState("")

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
 console.log("정보세팅" , limit_boards)

}

console.log("함수밖 정보세팅" , limit_boards)
  // 게시글에 맞는 url을 설정해주는 함수
  const setUrl = async (event) => {
    // event안에 존재하는 target의 value를 name으로 넘긴다.
  const {
    target: {name},
  } = event;

  // url에 /View/ 와 전달받은 name을 붙임 name은 doc.id이다
 setView_url('/View/' + name);

//  url설정이 완료됐음을 설정
  setcheck(true);
}


    // 로그아웃을 위한 함수를 선언
    const onLogOutClick = () => authService.signOut();

   

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
          <li><Link to="/Register">글 등록하기</Link></li>

        {/* 게시글을 보여주기 위한 middle 부분 */}
          <div className = {rec.middle}>
            <div className={rec.board}>
                <div  className={rec.board_detail}>
                  {/* 제목 부분에 title을 불러옴 */}
                    <div>
                        제목
                        {limit_boards.map(board => 
                        <div key={board.id}>
                          {/* 현재 버튼이 아니면 인식이 안돼서 일단 버튼으로 만들어 놓음 name에 id를 넘겨줌 */}
                            <button onClick={setUrl} name={board.id}>{board.title}</button>
                            {/* url 설정이 완료됐으면 그 url로 redirect */}
                            <div>{check ? <Redirect from="*" to = {View_url} />: null}
                        </div>
                        </div>
                     
                       )
                        }
              
                    </div>
                    {/* 마찬가지로 날짜 부분에 만든 날짜를 게시글 작성 날짜를 불러옴 */}
                    <div className={rec.board_date}>
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
                    <div className={rec.paging_div}>
         
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

          </div>
      </div>         
          <div className={rec.half_bg} />  
        </div>
        
        
);
}


export default Notice;