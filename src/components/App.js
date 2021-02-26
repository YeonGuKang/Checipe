import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route,  BrowserRouter  } from 'react-router-dom';
import { authService } from '../firebase';
import "../routes/style/style.css";
import Loginform from '../routes/Loginform';
import Mainpage from '../routes/Mainpage';
import Recipe from '../routes/Recipe';
import Notice from '../routes/Notice';
import Register from '../routes/Register';
import RecipeView from '../routes/RecipeView';
import View_board from '../routes/View_board';
import About_Open from '../routes/About_Open';

function App() {
 
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      
      if (user) {

        setIsLoggedIn(true);
        setUserObj(user);
      } else {
   
        setIsLoggedIn(false);
      }
      setInit(true);
       
    });
    
  }, []);
  
  return(
    <BrowserRouter>
    {/* 만약 로그인이 되면 Mainpage로 Redirect 아닌경우 Loginform을 보여줌 */}
    {/* {isLoggedIn ? (<Redirect from="/Loginform" to = "/Checipe" /> ) : null } */}

    {/* url path가 아래로 바뀔때 마다 component에 맞는 화면을 보여줌 */}
     <Route path="/Checipe" component = {Mainpage} exact />
     <Route path="/Recipe" component = {Recipe} />
     <Route path="/Loginform" component = {Loginform} />
     <Route path="/Notice" component = {Notice} />
     <Route path="/Register" component = {Register} />
     <Route path="/View" component = {View_board} />
     <Route path="/RecipeView" component = {RecipeView} />
     <Route path="/About_Open" component = {About_Open} />
  </BrowserRouter>

  );
  }  


export default App;
