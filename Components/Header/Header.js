import React from 'react'
import "./Header.css";
import Image from 'next/image';

const Header = () => {
  return (
    <div className='Logo bounce'>
        <Image className='logo' src={"/Logo/Logo(1).png"} height={100} width={100}/>
        <div className='text'>
            <h1>Weather</h1>
            <h3>forecast</h3>
        </div>
    </div>
  )
}

export default Header
