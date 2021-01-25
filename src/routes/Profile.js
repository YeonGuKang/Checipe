import React from "react";
import { authService } from "../firebase";
import { useHistory } from "react-router-dom";

// 현재 사용하지 않음
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