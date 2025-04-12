import React, { useEffect, useState } from "react";
import logo from "../assets/black-logo.png";
import logo_with_title from "../assets/logo-with-title.png";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { otpVerification, resetAuthSlice } from "../store/slices/authSlice";
import { toast } from "react-toastify";

const OTP = () => {
  const { email } = useParams();
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, message, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );
  const handleOtpVerification = (e) => {
    e.preventDefault();
    dispatch(otpVerification(email, otp));
    navigate("/");
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
    if (isAuthenticated) {
      return <Navigate to="/" />;
    }
  }, [dispatch, isAuthenticated, loading]);
  return (
    <>
      <title>OTP Verification - BookWorm Library</title>
      <div className="flex flex-col justify-center md:flex-row h-screen">
        <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8 relative">
          <Link
            className="border-2 border-black rounded-3xl font-bold w-52 py-2 px-4 fixed top-10 -left-28 hover:bg-black hover:text-white transition duration-300 text-end"
            to="/register"
          >
            Back
          </Link>
          <div className="max-w-sm w-full">
            <div className="flex justify-center mb-12">
              <div className="rounded-full flex items-center justify-center">
                <img src={logo} alt="Logo" className="h-24 w-auto" />
              </div>
            </div>
            <h1 className="text-4xl font-medium text-center mb-12 overflow-hidden">
              Check your mailbox
            </h1>
            <p className="text-gray-800 text-center mb-12">
              Please enter the otp to proceed
            </p>
            <form onSubmit={handleOtpVerification}>
              <div className="mb-4">
                <input
                  type="number"
                  placeholder="OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full border border-black rounded-md py-3 px-4 focus:outline-none"
                />
              </div>
              <button
                className="border-2 py-2 rounded-lg mt-5 border-black w-full font-semibold bg-black text-white hover:bg-white hover:text-black transition"
                type="submit"
              >
                Verify
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

export default OTP;
