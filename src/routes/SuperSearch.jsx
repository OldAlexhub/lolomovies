import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Predefined genre map
const genreMap = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
  10759: "Action & Adventure",
  10762: "Kids",
  10763: "News",
  10764: "Reality",
  10765: "Sci-Fi & Fantasy",
  10766: "Soap",
  10767: "Talk",
  10768: "War & Politics",
};

const SuperSearch = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // New state variable for success message

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const token = process.env.REACT_APP_TOKEN_TRENDING;
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${searchTerm}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setMovies(response.data.results);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Function to get genre names from IDs
  const getGenreNames = (genreIds) => {
    return genreIds.map((id) => genreMap[id] || "Unknown").join(", ");
  };

  const handleSubmit = async (e, movie) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("userId");
      const genreNames = getGenreNames(movie.genre_ids);
      const response = await axios.post(
        process.env.REACT_APP_POST_TO_WATCHLIST,
        {
          userId: user,
          img: movie.poster_path,
          title: movie.title,
          release_date: movie.release_date,
          original_language: movie.original_language,
          genre_ids: genreNames,
          vote_average: movie.vote_average,
          overView: movie.overview,
          id: movie.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        setShowSuccessMessage(true); // Show success message
        setTimeout(() => setShowSuccessMessage(false), 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search Movie"
          onChange={handleChange}
        />
        <button className="btn btn-outline-secondary" type="submit">
          Search
        </button>
      </form>

      <div className="row">
        {movies.map((movie) => (
          <div key={movie.id} className="col-md-3 mb-4">
            <div className="card">
              <img
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                className="card-img-top"
                alt={movie.title}
              />
              <div className="card-body">
                <h5 className="card-title">
                  {movie.title || movie.original_title}
                </h5>
                <p className="card-text">
                  <strong>Genres: </strong>
                  {getGenreNames(movie.genre_ids || "Not defined")}
                </p>
                <p className="card-text">
                  <strong>Release Date: </strong>
                  {movie.release_date}
                </p>
                <p className="card-text">
                  <strong>Language: </strong>
                  {movie.original_language}
                </p>
                <p className="card-text">
                  <strong>Rating: </strong>
                  {movie.vote_average}
                </p>
                <p className="card-text">
                  <strong>Overview: </strong>
                  {movie.overview}
                </p>
                <p>
                  <Link
                    to={`/similarmovies/${movie.id}`}
                    className="btn btn-primary"
                  >
                    Check Recommendations
                  </Link>
                </p>
                <p>
                  <button
                    className="btn btn-secondary"
                    onClick={(e) => handleSubmit(e, movie)}
                  >
                    Send to WatchList
                  </button>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showSuccessMessage && (
        <div className="alert alert-success" role="alert">
          Movie added to watchlist successfully!
        </div>
      )}
    </div>
  );
};

export default SuperSearch;
