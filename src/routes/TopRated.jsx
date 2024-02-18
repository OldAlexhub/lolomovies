import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const TopRate = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const token = process.env.REACT_APP_TOKEN_TRENDING;
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/top_rated`,
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
                </p>{" "}
                <p className="card-text">
                  <strong>Voter Average:</strong> {movie.vote_average}
                </p>
                <p className="card-text">
                  <strong>Language:</strong> {movie.original_language}
                </p>
                <p className="card-text">
                  <strong>Plot:</strong> {movie.overview}
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

export default TopRate;
