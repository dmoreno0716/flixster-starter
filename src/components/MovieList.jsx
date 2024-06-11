import React from 'react'
import ReactDOM from 'react-dom/client'
import MovieCard from './MovieCard'
import './MovieList.css'

const MovieList = () => {

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
        }
      };
      
      fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key${import.meta.env.VITE_API_KEY}`, options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));

        
    return (
        <div className='movies'>
        <MovieCard></MovieCard>
        <MovieCard></MovieCard>
        <MovieCard></MovieCard>
        </div>
    )
}

export default MovieList;