import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import './MovieCard.css'

const MovieCard = (props) => {
  const poster = `https://image.tmdb.org/t/p/w500${props.poster}`
 
  return (
    
      <div className="Poster">
        <div>
        <img src={poster}></img>
        </div>
      </div>

      
  )
};

export default MovieCard;
