import React from 'react'
import ReactDOM from 'react-dom/client'
import { useState } from 'react'
import './Dropdown.css'

const Dropdown = () =>{
    return (
        <select className = "dropdown-menu">
            <option value = ""> Sort by</option>
            <option value = "popularity">Popularity Descending</option>
        </select>
    )
}

export default Dropdown;