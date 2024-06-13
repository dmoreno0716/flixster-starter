import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import MovieCard from './MovieCard'
import './MovieList.css'
import Modal from './Modal'
import showModal from './Modal'


const MovieList = ({query, filter}) => {
  
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [genre, setGenre] = useState(-1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movieClicked, setMovieClicked] = useState({});
  // const [sortedData, setSortedData] = useState(data);
 
  useEffect(() => {
    fetchMovies();
  }, [page, query, filter, inputValue])

  //

  // const fetchGenres = () => {
  //   const options = {
  //     method: 'GET',
  //     headers: {
  //       accept: 'application/json',
  //       Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZTBjOWViNzkwNTJmM2NkNWI3NDA4ZjgwOGVhOGUwNCIsInN1YiI6IjY2Njc2NjM5NDZkNzU0MzNhMWRkYjRjYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dusJwh2MoFFPXhUdhR7pb7mJrxUzvxoSeS0jbR6xz2A'
  //     }
  //   };

  //   // let url;
  //   // if ... url = 
    
  //   fetch('https://api.themoviedb.org/3/movie/98?language=en-US', options)
  //     .then(response => response.json())
  //     .then(response => console.log(response))
  //     .catch(err => console.error(err));
  // }


  // FETCHES MOVIES FROM API

  const fetchMovies = async() => {
    const api_Key = import.meta.env.VITE_API_KEY;
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${api_Key}&sort_by=${query}&page=${page}`;

    if (searchQuery){
      url = `https://api.themoviedb.org/3/search/movie?api_key=${api_Key}&query=${encodeURIComponent(searchQuery)}&page=${page}`
    }

    try{

      const response = await fetch(url);
  
      if(!response.ok){
        throw new Error(`Error: ${response.status}`)
      }
  
      const data = await response.json()
      
      //CHECK FILTER BEFORE ADDING MOVIES
      //GENRES

      let finalResults = data.results;
      if(genre != -1) {
        finalResults = data.results.filter((movie) => movie.genre_ids.includes(genre));
      }






      //SORT MOVIES BY POPULARITY DESCENDING
      const sortedMovies = data.results.sort((a,b) => b.popularity - a.popularity);


      const handleSortingOptionChange = (event) =>{
        const sortingOption = event.target.value;
        switch(sortingOption){
          case 'movie-title-AZ':
            sortMoviesByTitle();
            break
          case 'release-date':
            sortMoviesByReleaseDate();
            break
          default:
            setMovies(sortedMovies)
        }
      };

      

      // function sortMovies(sort_order) {

      //   const sortMoviesByTitle = () => {
      //     const sortedMoviesByTitle = [...movies].sort((a,b) =>{
      //       if(sort_order === "movie-title-AZ"){
      //         return a.movie_title.localeCompare(b.movie_title);
      //       }
      //       else if(sort_order === "movie-title-ZA"){
      //         return b.movie_title.localeCompare(a.movie_title);
      //       }
      //     });
      //     setMovies(sortedMoviesByTitle);
      //   };
      //   const sortMoviesByReleaseDate = () => {
      //     const sortedMoviesByReleaseDate = [...movies].sort((a,b) => {
      //       if(sort_order === "release-date-AZ"){
      //         return a.year-b.year;
      //       }
      //       else if(sort_order === "release-date-ZA"){
      //         return b.year - a.year
      //       }
      //     });
      //     setMovies(sortedMoviesByReleaseDate);
      //   }
    
      // }
  
      if (page > 1){
        setMovies(prev => [
          ...prev, ...finalResults
        ])
      }
      else{
        setMovies(sortedMovies)
      }
    }
    catch (error){
      console.error("Error: ", error)
    }
  }



  //FUNCTION TO LOAD MORE MOVIES

  const LoadMore = () =>{
    setPage(page+1);
  }

  const NowPlaying = () =>{
    setMovies([]);
    setPage(1);
    setShowSearchBar(false);
    const api_Key = import.meta.env.VITE_API_KEY;
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${api_Key}&page=${page}`;
  
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results);
    })

    .catch((error) => console.error("Error: ", error));
  }


  //FUNCTION FOR SHOWING SEARCHBAR

  const Search = () => {
    setShowSearchBar(true);
  }
  //FUNCTION FOR WHEN SUBMIT IS CLICKED

  const handleInputChange = (event) =>{
    // console.log("test")
    const newValue = event.target.value;
    setInputValue(newValue);
    setSearchQuery(newValue);
  }

  const handleCardClick = (movie) => {
    console.log(movie);
    setIsModalOpen(true);
    setMovieClicked(movie);
    showModal(movieClicked);
    
  }

    return (
      <div>
        <header>
        <h1>Flixster &#127910;</h1>
        {/* HANDLES SEARCH ON SUBMIT */}
        {showSearchBar && (
          <form id="search">
          <input id="search-input" value={inputValue} type="text" onChange={handleInputChange} />
          <button id="submit" onClick={handleInputChange}>Submit</button>
        </form>

        
)}
      {/* BUTTON THAT SHOWS SEARCHBAR */}
      <button onClick = {Search}>Search</button>

        {/* SORTING MENU */}
        <div id = "sort">
        <select /*value = {sortingOption} onChange={handleSortingOptionChange} */ className = "dropdown-menu">
            <option value = ""> Sort by</option>
            <option value = "movie-title-AZ">A-Z</option>
            <option value = "popularity">Popularity</option>
            <option value = "upcoming">Upcoming</option>
            <option value = "top-rated">Top Rated</option>
            <option value = "release-date">Release Date</option>
        </select>
        </div>
{/*  */}
        <button onClick={NowPlaying} id= "now-playing">Now Playing</button>

        </header>

        {/* GENERATES MOVIE LIST */}
      <div className="MovieList">
        {movies.map((movie, index) => (
          <div key = {index} className="MovieCard" onClick={() => handleCardClick(movie)}>
            <MovieCard title = {movie.title} 
            poster = {movie.poster_path} 
            overview = {movie.overview}
            rating = {movie.vote_average}/>
          </div> 
        ))}

        {/* LOAD MORE BUTTON; ADDS MOVIES TO LIST (GOES TO PAGE 2, 3, SO ON) */}
      
      </div>
      <button id = "loadMore" onClick={LoadMore}>Load More</button>
      <footer>
      &copy; Copyright by Davey :D
      </footer>
      </div>

    )
}

export default MovieList;
