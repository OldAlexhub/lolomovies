import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const WatchList = () => {
  const [movies, setMovies] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // New state variable for success message

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        const response = await axios.get(
          `${process.env.REACT_APP_MY_WATCHLIST}/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setMovies(response.data.show);
          // console.log(response.data.show);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovies();
  }, []);

  const deleteMovie = async (movie) => {
    try {
      const token = localStorage.getItem("token");
      const movieId = movie._id;
      const response = await axios.delete(
        `${process.env.REACT_APP_MY_WATCHLIST_DELETE}/${movieId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        // Remove the deleted movie from the movies array
        const updatedMovies = movies.filter((m) => m._id !== movieId);
        setMovies(updatedMovies); // Update the state to reflect the deletion

        setShowSuccessMessage(true); // Show success message
        setTimeout(() => setShowSuccessMessage(false), 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container mt-5">
      <h2 className="mb-4">WatchList</h2>

      <div className="row">
        {movies.map((movie) => (
          <div key={movie._id} className="col-md-4 mb-4">
            <div className="card">
              <img
                src={`https://image.tmdb.org/t/p/original${movie.img}`}
                className="card-img-top"
                alt={movie.title}
              />
              <div className="card-body">
                <h5 className="card-title">
                  <Link to={`/watchproviders/${movie.id}`}>
                    {movie.original_name || movie.title}
                  </Link>
                </h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  Date Added: {new Date(movie.date).toLocaleDateString()}
                </h6>
                <p className="card-text">
                  <strong>Rating: </strong>
                  {movie.vote_average}
                </p>
                <p className="card-text">
                  <strong>Genre: </strong>
                  {movie.genre_ids}{" "}
                  {/* Consider converting genre IDs to names if possible */}
                </p>
                <p className="card-text">
                  <strong>Release Date: </strong>
                  {new Date(movie.release_date).toLocaleDateString()}
                </p>
                <p className="card-text">
                  <strong>Plot: </strong>
                  {movie.overView}
                </p>
                <Link
                  to={`/similarmovies/${movie.id}`}
                  className="btn btn-primary"
                >
                  Check Similar Movies
                </Link>{" "}
                <button
                  className="btn btn-secondary"
                  onClick={() => deleteMovie(movie)} // Adjusted this line
                >
                  Watched!
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showSuccessMessage && (
        <div className="alert alert-success" role="alert">
          Movie Watched!
        </div>
      )}
    </div>
  );
};

export default WatchList;
