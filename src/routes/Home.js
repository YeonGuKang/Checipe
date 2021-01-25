import React, { useEffect, useState } from "react";
import { dbService } from "../firebase";

// 현재 사용하지 않음
console.log("run home");

const Home = ({userObj}) => {
    const [checipe, setchecipe] = useState("");
    const [checipes, setchecipes] = useState([]);
    
    useEffect(()=>{
      dbService.collection("checipe").onSnapshot((snapshot) => {
        const checipeArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setchecipes(checipeArray);
      });
    },[]);
    
    
    const onSubmit = async (event) => {
      event.preventDefault();
      await dbService.collection("checipe").add({
          text:checipe,
          createdAt:Date.now(),
          creatorId: userObj.uid,
      });
      setchecipe("");
    };
    const onChange = (event) => {
      const {
        target: { value },
      } = event;
      setchecipe(value);
    };
    return (
      <div>
        <form onSubmit={onSubmit}>
          <input
            value={checipe}
            onChange={onChange}
            type="text"
            placeholder="What's on your mind?"
            maxLength={120}
          />
          <input type="submit" value="checipe" />
        </form>
        <div key={checipe.id}>
            {checipes.map(checipe => 
            <div>
                <h4>{checipe.text}</h4>
            </div>)
            }
        </div>
      </div>
    );
  };
export default Home;