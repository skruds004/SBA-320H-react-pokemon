import React from 'react'
import { Link } from 'react-router-dom'

//Navbar Component for navigation between pages
export default function NavBar() {
  return (
    <div>
        <ul className='nav'>
            <li>Poke-Team</li>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/pokelist">Pokemon</Link></li>
            <li><Link to="/pokesearch">Search</Link></li>
            {/* Future page to be added
             <li><Link to="/team">Your Team</Link></li> */}
        </ul>
    </div>
  )
}
