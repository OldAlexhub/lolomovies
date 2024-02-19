import React, { useState } from "react";
import axios from "axios";

const Search = () => {
  const [movie, setMovie] = useState(null); // Change to handle a single movie object
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SEARCH_MOVIES}?t=${searchTerm}`
      );
      // console.log(response.data.data);
      setMovie(response.data.data);
    } catch (error) {
      console.error(error);
      setMovie(null);
    }
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div class="container mt-3">
      <div class="row">
        <div class="col-md-8 mx-auto">
          <form onSubmit={handleSearch}>
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="Search Movies"
                aria-label="Search Movies"
                onChange={handleChange}
              />
              <button class="btn btn-outline-secondary" type="submit">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4 mx-auto">
          {movie ? (
            <div class="card">
              <img
                src={movie.Poster}
                class="card-img"
                alt={movie.Title}
                style={{ maxWidth: "100%", height: "auto" }}
              />
              <div class="card-body">
                <h4 class="card-title" style={{ textAlign: "center" }}>
                  Alae's Opinion
                </h4>
                <h4 class="card-title" style={{ textAlign: "center" }}>
                  {movie.imdbRating > 7
                    ? "Recommended"
                    : movie.imdbRating < 5
                    ? "Not Recommended"
                    : "Neutral"}
                </h4>
                <h5 class="card-title">{movie.Title}</h5>
                <p class="card-text">
                  <strong>Rating:</strong> {movie.Rated}
                </p>
                <p class="card-text">
                  <strong>Released:</strong> {movie.Released}
                </p>
                <p class="card-text">
                  <strong>Runtime:</strong> {movie.Runtime}
                </p>
                <p class="card-text">
                  <strong>Genre:</strong> {movie.Genre}
                </p>
                <p class="card-text">
                  <strong>Actors:</strong> {movie.Actors}
                </p>
                <p class="card-text">
                  <strong>Language:</strong> {movie.Language}
                </p>
                <p class="card-text">
                  <strong>Country:</strong> {movie.Country}
                </p>
                <p class="card-text">
                  <strong>Ratings:</strong>
                  <ul>
                    {movie && movie.Ratings ? (
                      movie.Ratings.map((rating) => (
                        <li key={rating.Source}>
                          {rating.Source}: {rating.Value}
                        </li>
                      ))
                    ) : (
                      <li>No ratings available</li>
                    )}
                  </ul>
                </p>
                <p class="card-text">
                  <strong>IMDB Rating:</strong> {movie.imdbRating}
                </p>
                <p class="card-text">
                  <strong>Type:</strong> {movie.Type}
                </p>
                <p class="card-text">
                  <strong>Plot:</strong> {movie.Plot}
                </p>
              </div>
            </div>
          ) : (
            "Search for your favourite movies 🎥"
          )}
        </div>
      </div>
    </div>
  );
};
export default Search;
