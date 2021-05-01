import React from "react";
import { BrowserRouter as Router, Route, Switch, Link, BrowserRouter, Redirect } from 'react-router-dom';
import rec from "./style/Recipe.module.css";
import viewb from "./style/View_board.module.css";
import { authService, dbService } from '../firebase';
import { ReactComponent as Msvg } from './image/menu.svg'

import Header from "../components/Header"

class View_test extends React.Component {
  state = {
    init: false,
    userObj: null,
    isLoggedIn: false,
    createdAt: this.props.location.state.createdAt,
    title: this.props.location.state.title,
    content: this.props.location.state.content
  }

  componentDidMount() {
    // 스크롤 상단으로 초기화
    window.scrollTo(0, 0);
    authService.onAuthStateChanged((user) => {
      console.log("changed");
      if (user) {
        console.log("user login")
        this.setState({ isLoggedIn: true })
        this.setState({ userObj: user })

      } else {
        console.log("user logout")
        this.setState(() => {
          return { isLoggedIn: false }
        })
      }
      this.setState({ init: true })
    });
  }

  render() {
    return (
      <div className={rec.wrap}>

        <div className={rec.half_bgs}>
          <Header></Header>
          {/* 게시글을 보여주기 위한 middle부분 */}
          <div className={viewb.middle}>
            <div className={viewb.middlewh}>
              <div className={viewb.vtitle}>{this.state.title}</div>
              <hr size='5' color='#28421f'></hr>
              <div className={viewb.vdate}>{this.state.createdAt}</div>
              <hr size='2' color='#28421f'></hr>

              <textarea readOnly className={viewb.vcontent}>{this.state.content}</textarea>
            </div>
            <div>
            </div>
          </div>

        </div>
        <div className={rec.half_bg} />
      </div>)
  }
}

export default View_test;