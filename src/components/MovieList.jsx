import React from 'react'
import ReactDOM from 'react-dom/client'
import MovieCard from './MovieCard'
import './MovieList.css'

const MovieList = () => {
    return (
        <div className='movies'>
        <MovieCard></MovieCard>
        <MovieCard></MovieCard>
        <MovieCard></MovieCard>
        </div>
    )
}

export default MovieList;