import React from 'react'
import ReactDOM from 'react-dom/client'
import { useState } from 'react'
import Dropdown from './Dropdown'
import Searchbar from './Searchbar'
import './Header.css'

const Header = () => {
    return (
        <header>
            <h1>Flixster &#127910;</h1>
            <div className='options'>
            <Searchbar></Searchbar>
            <Dropdown id = "test"></Dropdown>
            </div>
        </header>
    )
}


export default Header;