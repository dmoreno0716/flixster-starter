import React from 'react'
import ReactDOM from 'react-dom/client'
import MovieCard from './MovieCard'
import './MovieList.css'

const MovieList = () => {

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjM1NDJhNGYwZGVlNTY4MTIyZWFlNjgyZDkxNzQwMSIsInN1YiI6IjY2Njc2NjM5NDZkNzU0MzNhMWRkYjRjYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mvBontNTONt-nrmYgFGh_vqqaT4bTkktfG9COH9PEJQ'
        }
      };
      
      fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
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