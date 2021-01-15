import React from "react";
import { BrowserRouter as Router, Route, Switch,  BrowserRouter } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Navigation from "./Navigation";
import Mainpage from "../routes/Mainpage";
import Loginform from "../routes/Loginform";

console.log("run router");

// 현재 Router은 사용하지 않는다 이 작업을 App에서 해주는중

const AppRouter = ({isLoggedIn, userObj}) => {
  console.log("run router fuc");

    return(
<BrowserRouter>
{isLoggedIn && <Navigation />}
      <Switch>
        {isLoggedIn ? (
          <>
            {/* <Route exact path="/">
              <Home userObj={userObj} />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route> */}
          </>
        ) : (
            <>
            <Route exact path="/">
              <Mainpage />
            </Route>
          </>
        )}
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;