// ScrollBar.jsx
import MovieCard from "./MovieCard";
import "./MovieList.css";

function ScrollBar({ movies }) {
  const sidebarStyle = {
    position: "fixed",
    top: "0",
    left: "0",
    width: "40%",
    height: "100%",
    backgroundColor: "black",
    overflowY: "auto",
    transition: "transform 0.3s ease-in-out",
    zIndex: "5",
  };

  return (
    <div style={sidebarStyle}>
      <h1 style={{ color: "white", textAlign: "center" }}>🎥 WatchList</h1>
      {/* GENERATES MOVIE LIST */}
      <div className="MovieList">
        {movies.map((movie, index) => (
          <div key={index} className="MovieCard">
            <MovieCard
              title={movie.title}
              poster={movie.poster_path}
              overview={movie.overview}
              rating={movie.vote_average}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScrollBar;
