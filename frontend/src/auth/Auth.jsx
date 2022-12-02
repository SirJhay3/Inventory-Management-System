import React, { useState } from "react";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import axios from "axios";
import heroImage from "../data/hero.png";

import "./auth.css";
import { useNavigate } from "react-router-dom";

const cookies = new Cookies();

const initialState = {
  fullname: "",
  username: "",
  password: "",
  confirmPassword: "",
  phoneNo: "",
  email: "",
};

const Auth = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    const { fullname, username, password, phoneNo, email, confirmPassword } =
      form;

    if (isSignup && password !== confirmPassword) {
      toast.error("Password does not match");
      setIsLoading(false);
      return;
    }

    const URL = "http://localhost:4000/auth";

    const response = await axios.post(
      `${URL}/${isSignup ? "signup" : "login"}`,
      {
        username,
        password,
        fullname,
        phoneNo,
        email,
      }
    );

    // console.log(response);

    cookies.set("token", response?.data.token);
    cookies.set("username", response?.data.username);
    cookies.set("fullname", response?.data.fullname);
    cookies.set("userId", response?.data.userId);

    if (isSignup) {
      toast.success("User Created Successfully");
      cookies.set("phoneNo", response?.data.phoneNo);
      cookies.set("email", response?.data.email);
      // cookies.set("hashedPassword", hashedPassword);

      window.location.reload();
    } else {
      setIsLoading(false);
      toast.success(`Welcome ${response?.data.username}`);
      navigate("/dashboard");
    }
  };

  const switchMode = () => {
    setIsSignup((prev) => !prev);
  };

  return (
    <div className="auth__form-container">
      <div className="auth__form-container_fields">
        <div className="auth__form-container_fields-content">
          <p>{isSignup ? "Sign Up" : "Sign In"}</p>
          <form onSubmit={handleSubmit}>
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="fullname">Full Name</label>
                <input
                  name="fullname"
                  type="text"
                  placeholder="Full Name"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="username">Username</label>
              <input
                name="username"
                type="text"
                placeholder="Username"
                onChange={handleChange}
                required
              />
            </div>
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="phoneNo">Phone Number</label>
                <input
                  name="phoneNo"
                  type="text"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="email">Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="password">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />
            </div>
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_button">
              <button className=" focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600  rounded text-white px-8 py-2 text-md flex  gap-3 mb-3">
                {isSignup ? "Sign Up" : "Sign In"}
                {isLoading && (
                  <svg
                    className="animate-spin h-7 w-7 mr-3 text-white"
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.2"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                      fill="white"
                    />
                    <path
                      d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z"
                      fill="white"
                    />
                  </svg>
                )}
              </button>
            </div>
          </form>
          <div className="auth__form-container_fields-account">
            <p>
              {isSignup ? "Already have an account?" : "Don't have an account?"}
              <span onClick={switchMode}>
                {isSignup ? "Sign In" : "Sign Up"}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="auth__form-container_image">
        <img src={heroImage} alt="sign in" />
      </div>
    </div>
  );
};

export default Auth;
