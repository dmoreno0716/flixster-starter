import React, { useEffect, useState } from "react";
import {
  BsHandThumbsDown,
  BsHandThumbsDownFill,
  BsHandThumbsUp,
  BsHandThumbsUpFill,
  BsStar,
  BsStarFill,
} from "react-icons/bs";
import "./MovieList";
function Modal({ movie, setIsVisible }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [filledStars, setFilledStars] = useState(movie.vote_average);

  useEffect(() => {});

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 9998,
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "5px",
            maxWidth: "80%",
            maxHeight: "80%",
            overflow: "auto",
          }}
        >
          <h1 style={{ fontSize: "24px", marginBottom: "10px" }}>
            {movie.title}
          </h1>
          <img
            src={
              movie.backdrop_path
                ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
                : null
            }
            style={{ width: "min-content", height: "auto", marginBottom: "10px" }}
          />
          {/* Rating System */}
          <div>
            Rating: {" " + filledStars.toFixed(2)}
            <br />
            {[...Array(10)].map((_, index) => {
              return index < filledStars - 1 ? (
                <BsStarFill key={index} />
              ) : (
                <BsStar key={index} />
              );
            })}
          </div>
          <h4 style={{ fontSize: "18px", marginBottom: "5px" }}>
            Runtime: {movie.runtime}
          </h4>
          <h4 style={{ fontSize: "18px", marginBottom: "5px" }}>
            Released: {movie.release_date}
          </h4>
          <h4 style={{ fontSize: "18px", marginBottom: "10px" }}>
            Blurb: {movie.overview}
          </h4>

          <div style={{ flexDirection: "row" }}>
            {!isLiked ? (
              <BsHandThumbsUp
                size={36}
                onClick={() => {
                  setIsLiked(true);
                  setIsDisliked(false);
                  setFilledStars(
                    (movie.vote_average * movie.vote_count + 10) /
                      (movie.vote_count + 1)
                  );
                }}
              />
            ) : (
              <BsHandThumbsUpFill
                size={36}
                onClick={() => {
                  setIsLiked(false);
                  setFilledStars(movie.vote_average);
                }}
              />
            )}
            {!isDisliked ? (
              <BsHandThumbsDown
                size={36}
                onClick={() => {
                  setIsLiked(false);
                  setIsDisliked(true);
                  setFilledStars(
                    (movie.vote_average * movie.vote_count - 10) /
                      (movie.vote_count + 1)
                  );
                }}
              />
            ) : (
              <BsHandThumbsDownFill
                size={36}
                onClick={() => {
                  setIsDisliked(false);
                  setFilledStars(movie.vote_average);
                }}
              />
            )}
          </div>
          <br />
          {/* Close Site*/}
          <button
            onClick={() => setIsVisible(false)}
            style={{
              padding: "10px 20px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            CLOSE
          </button>
        </div>
      </div>
    </>
  );
}
export default Modal;
