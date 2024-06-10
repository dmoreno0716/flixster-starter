import React from 'react'
import ReactDOM from 'react-dom/client'
import { useState } from 'react'
import './Searchbar.css'
const Searchbar = () => {
    return (
        <form id = "search">
                <input type = "text">
                </input>
                <button id = "submit" >Submit</button>
                
            </form>
    )
}


export default Searchbar;