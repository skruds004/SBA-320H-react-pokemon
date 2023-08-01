import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <div>
        <ul className='nav'>
            <li>Poke-Team</li>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/pokelist">Pokemon</Link></li>
            <li><Link to="/pokesearch">Search</Link></li>
            <li><Link to="/team">Your Team</Link></li>
        </ul>
    </div>
  )
}
