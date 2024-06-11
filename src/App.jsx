import { useState } from 'react'
import './App.css'
import.meta.env.VITE_API_KEY
import MovieList from './components/MovieList'
import Header from './components/Header';

const App = () => {
  return (
  <div className="App">
    <Header></Header>
    <MovieList></MovieList>
  </div>
  )
}


export default App
