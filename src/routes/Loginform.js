import React, { useState } from "react";
import { authService, firebaseInstance } from "../firebase";
import "./Loginform.css";

const Loginform = () => {
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
        <form onSubmit={onSubmit} className="container">
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
          </span>
        <div className="authBtns">
            <button onClick={onSocialClick} name="Google">Continue with Google</button>
            <button onClick={onSocialClick} name="Github">Continue with Github</button>
        </div>
   </div>
   </div>
    )
  }


export default Loginform;