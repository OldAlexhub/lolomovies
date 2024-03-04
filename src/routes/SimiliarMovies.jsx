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
