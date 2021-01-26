import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link, BrowserRoute, Redirect } from 'react-router-dom';
import { authService, firebaseInstance } from "../firebase";
import "./Loginform.css";
import App from '../components/App'

const Loginform = () => {
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
    const [email, setEmail] =useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    const onChange = (event) =>{
       const {target: {name, value}} = event;
       if(name==="email"){
           setEmail(value)
       }else if(name==="password"){
           setPassword(value);
       }
    } ;
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
          let data;
          if (newAccount) {
            data = await authService.createUserWithEmailAndPassword(
              email,
              password
            )
          } else {
            data = await authService.signInWithEmailAndPassword(email, password)
          }
          console.log(data)
        } catch (error) {
          setError(error.message)
        }
      };

      const toggleAccount = () => setNewAccount((prev) => !prev);
      const onSocialClick = async (event) =>{
        const {
          target: {name},
        } = event;
        let provider;
        if(name === "Google"){
          provider = new firebaseInstance.auth.GoogleAuthProvider();

        }else if(name === "Github")
        {
          provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);
        console.log(data);
      };
    return(
      <div className="backwrap">
      <div className="mainform">
      {/* <form onSubmit={onSubmit} className="container">
            <input name="email" type="email" placeholder="Email" required value={email} className="authInput" onChange={onChange}/>
            <input name="password" type="password" placeholder="Password" required value={password} className="authInput" onChange={onChange}/>
            <input
              type="submit"
              className="authInput authSubmit"
              value={newAccount ? "Create Account" : "Sign In"}
            />
            {error}
        </form>
        <span onClick={toggleAccount} className="authSwitch">
            {newAccount ? "Sign In" : "Create Account"}
    </span>*/}
        <div className="authBtns">
            <button className="authBtn" onClick={onSocialClick} name="Google">Continue with Google</button>
            <button className="authBtn" onClick={onSocialClick} name="Github">Continue with Github</button>
        </div>
   </div>
   <div>{isLoggedIn ? <Redirect from="/Loginform" to = "/Checipe" />: null}</div>
   </div>

  
    )
  }


export default Loginform;