import { useState } from 'react'
import './App.css'
import.meta.env.VITE_API_KEY
import MovieList from './components/MovieList'

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  return (
  <div className="App">
    <MovieList searchQuery={searchQuery} filter="popularity"/>
  </div>
  
  )
}


export default App
