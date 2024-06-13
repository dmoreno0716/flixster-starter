import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import './MovieCard.css'

const MovieCard = (props) => {
  const poster = `https://image.tmdb.org/t/p/w500${props.poster}`
  // const [isHovered, setIsHovered] = useState(false);

  // useEffect(() =>{
  //   const mouseEnter = () => setIsHovered(true);
  //   const mouseLeave = () => setIsHovered(false);
  //   return{
  //     onmouseenter: mouseEnter,
  //     onmouseleave: mouseLeave,
  //   }
  // },[]);

  return (
    
      <div className="Poster">
        
        <div>
        <img src={poster}></img>
        {/* <div className="MovieInfo">
          <h3>{props.title}</h3>
          <p>{props.overview}</p>
          <p>Rating: {props.rating}</p>
        </div> */}
        </div>
        
      </div>

      
  )
};

export default MovieCard;
