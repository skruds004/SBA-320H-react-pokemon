import React from 'react'
import NavBar from '../components/NavBar';

//React page for the homepage
function Homepage() {
  return (
    <div>
      <NavBar />
      <div className='home-container'>
        <div className='home-info'>
          <h1>Welcome to Poke-Team</h1>
          <h2>A Simple to Use Pokemon Team Builder</h2>
          <p>Click the Pokemon or Search Links up top to begin building your team!</p>
          <p>Then click the + button on a Pokemon to add it to your team!</p>
          <p>You can look at a Pokemon's description by using their Pokemon Info link</p>
          <p>This will tell you its types, stats, and more!</p>
          <p>Good Luck Catching Them All!</p>
          <blockquote><i>All Pokemon names and images are property of Nintendo</i></blockquote>
        </div>
      </div>
    </div>
  );
}

export default Homepage;