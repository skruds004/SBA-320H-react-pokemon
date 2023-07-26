import React from 'react'
import { Link } from 'react-router-dom';

function Homepage() {
  return (
    <div>
      <Link 
        //to="/pokelist"
        //state= {{type: 3}}
        //to={{pathname:"/pokelist", type: 3}}
        to={"/pokelist"}
        state={{type: "3"}}
      >
      Go to Pokemon List
      </Link>
    </div>
  );
}

export default Homepage;