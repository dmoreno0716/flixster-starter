import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import MovieCard from './MovieCard'
import './MovieList.css'

const MovieList = ({query, filter}) => {

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchMovies();

  }, [page, query, filter])

  const fetchMovies = async() => {
    const api_Key = "ae0c9eb79052f3cd5b7408f808ea8e04";
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${api_Key}&sort_by=${filter}&page=${page}`;

    if (query){
      url = `https://api.themoviedb.org/3/search/movie?api_key=${api_Key}&query=${encodeURIComponent(query)}&page=${page}`
    }

    try{

      const response = await fetch(url);
  
      if(!response.ok){
        throw new Error(`Error: ${response.status}`)
      }
  
      const data = await response.json()
  
      if (page > 1){
        setMovies(prev => [
          ...prev, ...data.results
        ])
      }
      else{
        setMovies(data.results)
      }
    }
    catch (error){
      console.error("Error: ", error)
    }
  }
 
    return (
      <div className="MovieList">
        {movies.map(movie=> (
          <div key = {movie.id} className="MovieCard">
            <MovieCard title = {movie.title} poster = {movie.poster_path} rating = {movie.vote_average}/>
          </div> 
        ))}
      </div>

    )
}



   // const options = {
    //     method: 'GET',
    //     headers: {
    //       accept: 'application/json',
    //     }
    //   };
      
    //   fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key${import.meta.env.VITE_API_KEY}`, options)
    //     .then(response => response.json())
    //     .then(response => console.log(response))
    //     .catch(err => console.error(err));


    // const playlistContainer = document.querySelector("main");
    // data.playlists.forEach((playlist) => {
    //   const card = document.createElement("div");
    //   card.classList.add("container");
    //   card.setAttribute("data-playlist-id", playlist.playlistID.toString());
    //   card.innerHTML = `<img class = "art" src = "${playlist.playlist_art}"></img>
    //     <div class = "cards" ></div>
    //        <label ${playlist.playlistID}></label>
    //        <h3>${playlist.playlist_name}</h3>
    //        <p>${playlist.playlist_creator}</p>
    //        <span class="heart" id="heart${playlist.playlistID}" onclick="likePlaylist(${playlist.playlistID})">&#9825;</span>
    //        <span id="counter${playlist.playlistID}">${playlist.likeCount}</span>
    //        <span id = "trash">&#128465;</span>`;
 
    //   playlistContainer.appendChild(card);
    //   card.onclick = function () {
    //     openModal(playlist);
    //   };
    // });
       

export default MovieList;