import React, { useEffect, useState } from "react";
import logo from "../assets/black-logo.png";
import logo_with_title from "../assets/logo-with-title.png";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { login, resetAuthSlice } from "../store/slices/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading, error, message, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  const handleLogin = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("email", email);
    data.append("password", password);
    dispatch(login(data));
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(resetAuthSlice());
    }
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
  }, [dispatch, message, error]);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <title>Login - BookWorm Library</title>
      <div className="flex flex-col justify-center md:flex-row h-screen">
        <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8 relative">
          <div className="max-w-sm w-full">
            <div className="flex justify-center mb-12">
              <div className="rounded-full flex items-center justify-center">
                <img src={logo} alt="Logo" className="h-24 w-auto" />
              </div>
            </div>
            <h1 className="text-4xl font-medium text-center mb-12 overflow-hidden">
              Welcome Back!!
            </h1>
            <p className="text-gray-800 text-center mb-12">
              Please enter your credentials
            </p>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-black rounded-md py-3 px-4 focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-black rounded-md py-3 px-4 focus:outline-none"
                />
              </div>
              <Link
                to="/password/forgot"
                className="font-semibold text-black mb-12"
              >
                Forgot Password?
              </Link>
              <div className="block md:hidden font-semibold mt-5">
                <p>
                  New to our platform? Signup now
                  <Link
                    to="/register"
                    className="text-sm text-gray-500 hover:underline"
                  >
                    {" "}
                    Sign Up
                  </Link>
                </p>
              </div>
              <button
                className="border-2 py-2 rounded-lg mt-5 border-black w-full font-semibold bg-black text-white hover:bg-white hover:text-black transition"
                type="submit"
              >
                Login
              </button>
            </form>
          </div>
        </div>
        <div className="hidden w-full md:w-1/2 bg-black text-white md:flex flex-col items-center justify-center p-8 rounded-tl-[80px] rounded-bl-[80px]">
          <div className="text-center h-[400px]">
            <div className="flex justify-center mb-12">
              <img
                src={logo_with_title}
                alt="Logo"
                className="mb-12 h-44 w-auto"
              />
            </div>
            <p className="text-gray-300 mb-12">
              New to our platform? Signup now
            </p>
            <Link
              className="border-2 py-2 rounded-lg mt-5 border-white px-8 w-full font-semibold bg-black text-white hover:bg-white hover:text-black transition"
              to="/register"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
