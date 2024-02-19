import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../routes/Home";
import Search from "../routes/Search";
import TopRated from "../routes/TopRated";
import Popular from "../routes/Popular";
import Trending from "../routes/Trending";
import WatchProviders from "../routes/WatchProviders";
import SimiliarMovies from "../routes/SimiliarMovies";
import Signup from "../routes/Signup";
import WatchList from "../routes/WatchList";
import SuperSearch from "../routes/SuperSearch";

const RouteManager = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="toprated" element={<TopRated />} />
          <Route path="popular" element={<Popular />} />
          <Route path="trending" element={<Trending />} />
          <Route path="watchproviders/:movieId" element={<WatchProviders />} />
          <Route path="similarmovies/:movieId" element={<SimiliarMovies />} />
          <Route path="watchlist" element={<WatchList />} />
          <Route path="supersearch" element={<SuperSearch />} />
          <Route path="signup" element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RouteManager;
