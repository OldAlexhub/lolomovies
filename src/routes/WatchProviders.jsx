import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

const WatchProviders = () => {
  const [movies, setMovies] = useState([]);
  const { movieId } = useParams(); // Use useParams to access the dynamic segment

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const token = process.env.REACT_APP_TOKEN_TRENDING;
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/watch/providers`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMovies(response.data.results);
        // console.log(response.data.results);
        // Assuming you want to do something with the response here
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovies();
  }, [movieId]); // Depend on movieId to refetch when it changes

  const hasWatchOptions = (movies) => {
    return (
      movies.US.buy?.length > 0 ||
      movies.US.rent?.length > 0 ||
      movies.US.flatrate?.length > 0
    );
  };
  return (
    <div className="container mt-5">
      <h2>Watch Options:</h2>
      {movies.US && (
        <div>
          <h3 className="mt-4">United States</h3>

          {hasWatchOptions(movies) ? (
            <>
              {/* For buying options */}
              {movies.US.buy && movies.US.buy.length > 0 && (
                <div>
                  <h4 className="mt-3">Buy</h4>
                  <div className="d-flex flex-wrap">
                    {movies.US.buy.map((provider) => (
                      <div
                        key={provider.provider_id}
                        className="card m-2"
                        style={{ width: "18rem" }}
                      >
                        <img
                          src={`https://image.tmdb.org/t/p/w500${provider.logo_path}`}
                          className="card-img-top"
                          alt={provider.provider_name}
                        />
                        <div className="card-body">
                          <p className="card-text">{provider.provider_name}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* For rental options */}
              {movies.US.rent && movies.US.rent.length > 0 && (
                <div>
                  <h4 className="mt-3">Rent</h4>
                  <div className="d-flex flex-wrap">
                    {movies.US.rent.map((provider) => (
                      <div
                        key={provider.provider_id}
                        className="card m-2"
                        style={{ width: "18rem" }}
                      >
                        <img
                          src={`https://image.tmdb.org/t/p/w500${provider.logo_path}`}
                          className="card-img-top"
                          alt={provider.provider_name}
                        />
                        <div className="card-body">
                          <p className="card-text">{provider.provider_name}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* For flatrate options */}
              {movies.US.flatrate && movies.US.flatrate.length > 0 && (
                <div>
                  <h4 className="mt-3">Stream</h4>
                  <div className="d-flex flex-wrap">
                    {movies.US.flatrate.map((provider) => (
                      <div
                        key={provider.provider_id}
                        className="card m-2"
                        style={{ width: "18rem" }}
                      >
                        <img
                          src={`https://image.tmdb.org/t/p/w500${provider.logo_path}`}
                          className="card-img-top"
                          alt={provider.provider_name}
                        />
                        <div className="card-body">
                          <p className="card-text">{provider.provider_name}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* If there's a link to the movie's page */}
              {movies.US.link && (
                <Link to={movies.US.link} className="btn btn-primary mt-3">
                  View more options
                </Link>
              )}
            </>
          ) : (
            // Message if no watch options are available
            <p className="mt-3">This movie is currently playing in theaters.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default WatchProviders;
