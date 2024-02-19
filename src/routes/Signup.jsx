import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // State for managing the display of success or error messages
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(process.env.REACT_APP_SIGNUP, formData);

      if (response.status === 201) {
        // Set success message and type
        setMessage("Signup successful!... Please login");
        setMessageType("success");

        // Wait for 3 seconds, then navigate
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      // Set error message and type
      setMessage("Signup failed. Please try again.");
      setMessageType("error");
    }
  };
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="mb-4">Signup</h2>
          <form onSubmit={handleSignup}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="First Name"
                name="fname"
                onChange={handleChange}
                value={formData.fname}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Last Name"
                name="lname"
                onChange={handleChange}
                value={formData.lname}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                name="userName"
                onChange={handleChange}
                value={formData.userName}
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                value={formData.email}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                value={formData.password}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                name="confirmPassword"
                onChange={handleChange}
                value={formData.confirmPassword}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Signup
            </button>
          </form>
          {message && (
            <div
              className={`alert ${
                messageType === "success" ? "alert-success" : "alert-danger"
              } mt-3`}
            >
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
