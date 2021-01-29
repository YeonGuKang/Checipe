import React from 'react';
import rec from "./Recipe.module.css";

const handleImgError = (e) => {
  e.target.src = 'https://previews.123rf.com/images/alexwhite/alexwhite1501/alexwhite150104186/35585441-%EC%98%A4%EB%A5%98-%EC%95%84%EC%9D%B4%EC%BD%98.jpg';
}


function Rlist({ id, img, part, way, detail, number}) {
    return (
      <div className={rec.result}>                
                <div key={ id }>
                  <img
                    src={ img }
                    onError={handleImgError}
                    width='100%'
                    height='300vh'
                 />
                 <hr size='5' color='#537f46'></hr>
                 <div className={rec.Rtitle}>
                  { id }
                  </div>
                  <hr size='5' color='#537f46'></hr>  
                  <div className={rec.Rhash}>
                   { part } / { way }
                  </div>
                  <h4>{ detail }</h4>
                  <h6>{ number }</h6>
                  </div>
                  </div>
    )
  }

  
export default Rlist;