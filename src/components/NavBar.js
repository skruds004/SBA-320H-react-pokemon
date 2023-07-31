import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <div>
        <ul className='nav'>
            <li>Poke-Team</li>
            <li><Link>Home</Link></li>
            <li><Link>Pokemon</Link></li>
            <li><Link>Search</Link></li>
            <li><Link>Your Team</Link></li>
        </ul>
    </div>
  )
}
