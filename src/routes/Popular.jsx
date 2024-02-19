import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

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

const Popular = () => {
  const [movies, setMovies] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // New state variable for success message
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");
    const userId = localStorage.getItem("userId");

    if (token && name && userId) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const token = process.env.REACT_APP_TOKEN_TRENDING;
        const response = await axios.get(
          "https://api.themoviedb.org/3/movie/popular",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMovies(response.data.results);
        // console.log(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovies();
  }, []);

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
    <div className="container mt-5">
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {movies.map((movie) => (
          <div key={movie.id} className="col">
            <div className="card h-100">
              <img
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                className="card-img-top"
                alt={movie.title}
              />
              <div className="card-body">
                <h5 className="card-title">
                  {" "}
                  <Link to={`/watchproviders/${movie.id}`}>
                    {movie.original_name || movie.title}
                  </Link>
                </h5>
                <p className="card-text">
                  <strong>Release Date:</strong> {movie.release_date}
                </p>
                <p className="card-text">
                  <strong>Voter Average:</strong> {movie.vote_average}
                </p>
                <p className="card-text">
                  <strong>Language:</strong> {movie.original_language}
                </p>
                <p className="card-text">
                  <strong>Plot:</strong> {movie.overview}
                </p>
                {isAuthenticated ? (
                  <p>
                    <button
                      className="btn btn-secondary"
                      onClick={(e) => handleSubmit(e, movie)}
                    >
                      Send to WatchList
                    </button>
                  </p>
                ) : null}
                <p>
                  <Link
                    to={`/similarmovies/${movie.id}`}
                    className="btn btn-primary"
                  >
                    Check Recommendations
                  </Link>
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

export default Popular;
