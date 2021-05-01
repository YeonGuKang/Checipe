import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link, BrowserRoute, Redirect, useHistory } from 'react-router-dom';
import { authService, firebaseInstance } from "../firebase";
import "./style/Loginform.css";
import checipelogo from './image/checipelogo.svg';
import google from './image/google.svg';
import github from './image/github.png';

const Loginform = () => {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const history = useHistory();
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

  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "Google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();

    } else if (name === "Github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
    console.log(data);
  };

  return (
    <div className="backwrap">
      <div className="mainform">
        <div className="Line"></div>
        <div className="Llogo">
          {/* js에서는 img를 이런식으로 import해서 불러온다. */}
          <a href="/Checipe">
            <img
              src={checipelogo}
              width='220vw'
              height='220vh'
              alt='login logo' />
          </a>
        </div>
        <div className="authBtns">
          <button className="authBtn" onClick={onSocialClick} name="Google">
            <img className="google_log" src={google} /><br />
              구글 계정으로 계속하기
            </button>
          <button className="authBtn" onClick={onSocialClick} name="Github">
            <img className="github_log" src={github} /><br />
              깃허브 계정으로 계속하기
            </button>
        </div>
      </div>
      <div>{isLoggedIn ? <Redirect from="/Loginform" to={history.goBack()} /> : null}</div>
    </div>


  )
}


export default Loginform;