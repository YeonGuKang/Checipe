
import rec from "./style/Recipesp.module.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link, BrowserRouter, Redirect } from 'react-router-dom';

const handleImgError = (e) => {
  e.target.src = 'https://previews.123rf.com/images/alexwhite/alexwhite1501/alexwhite150104186/35585441-%EC%98%A4%EB%A5%98-%EC%95%84%EC%9D%B4%EC%BD%98.jpg';
}



function Rlist({ name, manual, img, part, way, detail, number, step}) {
    console.log(name)
  
    return (
      <div className={rec.result}>     
      <Link to = {{pathname: "/RecipeView/" + step + '/' + name,
                   state: {
                     name: name,
                     img: img,
                     part: part,
                     way: way,
                     detail: detail,
                     manual: manual
                   }}}>           
                <div key={ name }>
                 
                  <img
                    src={ img }
                    onError={handleImgError}
                    width='100%'
                    height='300vh'
                 />
                 
                 <hr size='5' color='#537f46'></hr>
                 <div className={rec.Rtitle}>
                  {name}
                  </div>
                  <hr size='5' color='#537f46'></hr>  
                  <div className={rec.Rhash}>
                 { part } / { way }
                  </div>
                  <h4>{ detail }</h4>
                  <h6>{ number }</h6>
                  </div>
                  </Link>
                  </div>
    )
  }

  
export default Rlist;