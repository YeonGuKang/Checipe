import React from "react";
import { Link } from "react-router-dom";

console.log("run navi");

// Navigation은 Mainpage에서 작업을 해주는 중이므로 사용하지 않는다.

const Navigation = () => (
  console.log("run navi fc"),
  <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/profile">My Profile</Link>
      </li>
    </ul>
  </nav>
);
export default Navigation;