
import rec from "./style/Recipesp.module.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link, BrowserRouter, Redirect } from 'react-router-dom';
import noimage from './image/noimage.svg';
import heart from './image/heart.svg';

const handleImgError = (e) => {
  e.target.src = noimage;
}



function Rlist({ name, manual, img, part, way, detail, number, step, like }) {


  return (
    <div className={rec.result}>
      <Link to={{
        pathname: "/RecipeView/" + step + '/' + name,
        state: {
          name: name,
          img: img,
          part: part,
          way: way,
          detail: detail,
          manual: manual,
          like: like
        }
      }}>
        <div key={name}>

          <img
            src={img}
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
            # {part} / {way}
          </div>
          <div className={rec.likealign}>
            <img src={heart} width='30px' name='heart' />
            <a className={rec.like} >{like}</a>
          </div>
        </div>
      </Link>
    </div>
  )
}


export default Rlist;