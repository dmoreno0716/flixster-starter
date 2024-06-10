import React from "react";
import ReactDOM from "react-dom/client";
import './MovieCard.css'

const MovieCard = (props) => {
  return (
    <div className="container">
      {/* <img>Movie Poster</img> */}
      <h3>Movie Name</h3>
      <p>rating</p>
    </div>
  );
};

export default MovieCard;
