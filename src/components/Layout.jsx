import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import axios from "axios";

const Layout = () => {
  // State to manage user authentication status and user information
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({
    name: "",
    userId: "",
  });

  // Effect hook to check authentication status on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");
    const userId = localStorage.getItem("userId");

    if (token && name && userId) {
      setIsAuthenticated(true);
      setUser({ name, userId });
    }
  }, []);

  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(process.env.REACT_APP_LOGIN, formData);
      const { token, name, userId } = response.data;

      if (response.status === 200) {
        localStorage.setItem("token", token);
        localStorage.setItem("name", name);
        localStorage.setItem("userId", userId);
        setIsAuthenticated(true);
        setUser({ name, userId });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("userId");
    setIsAuthenticated(false);
    setUser({ name: "", userId: "" });
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Lolo's Movie Search Engine
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/toprated">
                  Top Rated
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/popular">
                  Popular
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/trending">
                  Trending
                </Link>
              </li>
              {isAuthenticated ? (
                <li className="nav-item">
                  <Link className="nav-link" to="/supersearch">
                    Super Search
                  </Link>
                </li>
              ) : null}
              {isAuthenticated ? (
                <li className="nav-item">
                  <Link className="nav-link" to="/watchlist">
                    Watchlist
                  </Link>
                </li>
              ) : null}
            </ul>
            {isAuthenticated ? (
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <p className="nav-link mb-0">Welcome, {user.name}</p>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-primary"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <form
                    className="d-flex align-items-center"
                    onSubmit={handleLogin}
                  >
                    <input
                      className="form-control me-2"
                      type="text"
                      placeholder="Username"
                      onChange={handleChange}
                      value={formData.userName}
                      name="userName"
                    />
                    <input
                      className="form-control me-2"
                      type="password"
                      placeholder="Password"
                      onChange={handleChange}
                      value={formData.password}
                      name="password"
                    />
                    <button className="btn btn-outline-success" type="submit">
                      Login
                    </button>
                  </form>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    Signup here!
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
