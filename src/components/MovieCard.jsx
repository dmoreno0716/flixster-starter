import React from "react";
import ReactDOM from "react-dom/client";
import './MovieCard.css'

const MovieCard = (props) => {
  const poster = `https://image.tmdb.org/t/p/w500${props.poster}`
  return (
    <div id = "container">
      <div className="Poster">
        <img src={poster}></img>
      </div>
      <div className="MovieInfo">
        <h3>{props.title}</h3>
        <p>Rating: {props.rating}</p>
      </div>
    </div>
  )
};

export default MovieCard;
