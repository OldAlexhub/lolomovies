import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const SimilarMovies = () => {
  const [movies, setMovies] = useState([]);
  // Correctly destructure movieId from useParams
  const { movieId } = useParams();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const token = process.env.REACT_APP_TOKEN_TRENDING;
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/recommendations`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMovies(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovies();
  }, [movieId]);
  
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
      <h2>Similar Movies</h2>
      <div className="row">
        {movies.map((movie) => (
          <div key={movie.id} className="col-md-4 mb-3">
            <div className="card">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                className="card-img-top"
                alt={movie.title}
              />
              <div className="card-body">
                <h5 className="card-title"><Link to={`/watchproviders/${movie.id}`}>
                    {movie.original_name || movie.title}
                  </Link></h5>
                <p className="card-text">{movie.overview}</p>
                <p className="card-text">
                  <small className="text-muted">
                    Release Date: {movie.release_date}
                  </small>
                </p>
                <p className="card-text">
                  <small className="text-muted">
                    Rating: {movie.vote_average} ({movie.vote_count} votes)
                  </small>
                </p>
                 <p>
                    <button
                      className="btn btn-secondary"
                      onClick={(e) => handleSubmit(e, movie)}
                    >
                      Send to WatchList
                    </button>
                  </p>
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
    </div>
  );
};

export default SimilarMovies;
