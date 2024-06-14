import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import "./MovieList.css";
import Modal from "./Modal";

const MovieList = ({ query, setWatchList }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movieClicked, setMovieClicked] = useState({});
  const [sortingOption, setSortingOption] = useState("");
  const [filteringOption, setFilteringOption] = useState("");
  const [fetchedCount, setFetchedCount] = useState(0);
  const [cachedMovies, setCachedMovies] = useState([]);

  //fetch movies and cache them in cachedMovies
  useEffect(() => {
    fetchMovies();
  }, [page, inputValue]);

  //Filter and Sort when fetchMovies is completed or when the filter/sort options change
  useEffect(() => {
    filterAndSort();
  }, [filteringOption, sortingOption, fetchedCount, page]);

  const handleSortingOptionChange = (event) => {
    setSortingOption(event.target.value);
  };

  const handleFilteringOptionChange = (event) => {
    setFilteringOption(event.target.value);
  };

  const filterAndSort = async () => {
    let finalResults = [...cachedMovies];

    //Filter based on genre number
    if (filteringOption.length != 0) {
      finalResults = finalResults.filter((movie) =>
        movie.genre_ids.includes(Number(filteringOption)),
      );
    }

    switch (sortingOption) {
      case "movie-title-AZ":
        finalResults = finalResults.sort((a, b) =>
          a.title.localeCompare(b.title),
        );
        break;
      case "release-date":
        finalResults = finalResults.sort((a, b) => {
          const dateA = new Date(a.release_date);
          const dateB = new Date(b.release_date);
          return dateB - dateA;
        });
        break;
      case "popularity":
        finalResults = finalResults.sort((a, b) => b.popularity - a.popularity);
        break;
      case "top-rated":
        //Last One
        finalResults = finalResults.sort(
          (a, b) => b.vote_average - a.vote_average,
        );
        break;
      default:
    }

    setMovies(finalResults);
  };

  // FETCHES MOVIES FROM API
  const fetchMovies = async () => {
    const api_Key = import.meta.env.VITE_API_KEY;
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${api_Key}&sort_by=${query}&page=${page}`;

    if (searchQuery) {
      url = `https://api.themoviedb.org/3/search/movie?api_key=${api_Key}&query=${encodeURIComponent(
        searchQuery,
      )}&page=${page}`;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();

      let finalResults = [...cachedMovies, ...data.results];

      setCachedMovies(finalResults);
      setMovies(finalResults);
      setFetchedCount((prev) => prev + 1);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  //FUNCTION TO LOAD MORE MOVIES

  const LoadMore = () => {
    setPage(page + 1);
  };

  const NowPlaying = () => {
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
  };

  //FUNCTION FOR SHOWING SEARCHBAR

  const Search = () => {
    setShowSearchBar(true);
  };
  //FUNCTION FOR WHEN SUBMIT IS CLICKED

  const handleInputChange = (event) => {
    // console.log("test")
    const newValue = event.target.value;
    setInputValue(newValue);
    setSearchQuery(newValue);
  };

  const handleCardClick = (movie) => {
    console.log(movie);
    setIsModalOpen(true);
    setMovieClicked(movie);
  };

  return (
    <div>
      {isModalOpen && (
        <Modal movie={movieClicked} setIsVisible={setIsModalOpen} />
      )}
      <header>
        <h1>Flixster &#127910;</h1>
        {/* HANDLES SEARCH ON SUBMIT */}
        {showSearchBar && (
          <form id="search">
            <input
              id="search-input"
              value={inputValue}
              type="text"
              onChange={handleInputChange}
            />
            <button id="submit" onClick={handleInputChange}>
              Submit
            </button>
          </form>
        )}
        {/* BUTTON THAT SHOWS SEARCHBAR */}
        <button onClick={Search}>Search</button>

        {/* SORTING MENU */}
        <div id="sort">
          <select
            value={sortingOption}
            onChange={handleSortingOptionChange}
            className="dropdown-menu"
          >
            <option value="">Sort by</option>
            <option value="movie-title-AZ">A-Z</option>
            <option value="popularity">Popularity</option>
            <option value="top-rated">Top Rated</option>
            <option value="release-date">Release Date</option>
          </select>
        </div>
        {/* FILTERING MENU */}
        <div id="sort">
          <select
            value={filteringOption}
            onChange={handleFilteringOptionChange}
            className="dropdown-menu"
          >
            <option value="">Genre</option>
            <option value="28">Action</option>
            <option value="12">Adventure</option>
            <option value="16">Animation</option>
            <option value="35">Comedy</option>
            <option value="80">Crime</option>
            <option value="99">Documentary</option>
            <option value="18">Drama</option>
            <option value="10751">Family</option>
            <option value="14">Fantasy</option>
            <option value="36">History</option>
            <option value="27">Horror</option>
            <option value="10402">Music</option>
            <option value="9648">Mystery</option>
            <option value="10749">Romance</option>
            <option value="878">Science Fiction</option>
            <option value="10770">TV Movie</option>
            <option value="53">Thriller</option>
            <option value="10752">War</option>
            <option value="37">Western</option>
          </select>
        </div>
        {/*  */}
        <button onClick={NowPlaying} id="now-playing">
          Now Playing
        </button>
      </header>

      {/* GENERATES MOVIE LIST */}
      <div className="MovieList">
        {movies.map((movie, index) => (
          <div key={index} style={{ flexDirection: "column" }}>
            <div className="MovieCard" onClick={() => handleCardClick(movie)}>
              <MovieCard
                title={movie.title}
                poster={movie.poster_path}
                overview={movie.overview}
                rating={movie.vote_average}
                votes={movie.vote_count}
              />
            </div>
            <button
              onClick={() => {
                setWatchList((prev) => [...prev, movie]);
                alert("Added to watchlist!");
              }}
              style={{ backgroundColor: "transparent", border: "none" }}
            >
              <div
                style={{
                  color: "white",
                  fontSize: 40,
                  marginTop: 20,
                  padding: 20,
                  borderRadius: 20,
                  backgroundColor: "black",
                }}
              >
                Watch Later
              </div>
            </button>
          </div>
        ))}
      </div>

      {/* LOAD MORE BUTTON; ADDS MOVIES TO LIST (GOES TO PAGE 2, 3, SO ON) */}
      <button id="loadMore" onClick={LoadMore}>
        Load More
      </button>
      <footer>&copy; Copyright by Davey :D</footer>
    </div>
  );
};
export default MovieList;
