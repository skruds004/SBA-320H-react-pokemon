import React from 'react'

//Spinner component used when fetching data
export default function Spinner() {
  return (
    <div className='spinner-container'>
        <img className="spinner" src="https://archives.bulbagarden.net/media/upload/thumb/6/6f/0363Spheal.png/250px-0363Spheal.png" alt="Spinner"></img>
        <h1 className='loading-text'>Loading...</h1>
    </div>
  )
}
