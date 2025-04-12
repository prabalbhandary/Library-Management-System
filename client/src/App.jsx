import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import OTP from "./pages/OTP";
import ResetPassword from "./pages/ResetPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./store/slices/authSlice";
import { fetchAllUsers } from "./store/slices/userSlice";
import { fetchAllBooks } from "./store/slices/bookSlice";
import {
  fetchAllBorrowedBook,
  fetchUserBorrowedBook,
} from "./store/slices/borrowSlice";

const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
    dispatch(fetchAllBooks());
  }, []);
  
  useEffect(() => {
    if (isAuthenticated && user?.role === "Admin") {
      dispatch(fetchAllUsers());
      dispatch(fetchAllBorrowedBook());
    } else if (isAuthenticated && user?.role === "User") {
      dispatch(fetchUserBorrowedBook());
    }
  }, [isAuthenticated, user]);
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/otp-verification/:email" element={<OTP />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
        </Routes>
        <ToastContainer theme="dark" position="top-right" />
      </Router>
    </>
  );
};

export default App;
