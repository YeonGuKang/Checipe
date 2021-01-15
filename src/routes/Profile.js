import React from "react";
import { authService } from "../firebase";
import { useHistory } from "react-router-dom";


console.log("run profile");

export default () => {
    const history = useHistory();
    const onLogOutClick = () => {
      authService.signOut();
      history.push("/");
    };
    return (
      <>
        <button onClick={onLogOutClick}>Log Out</button>
      </>
    );
  };