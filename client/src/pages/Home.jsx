import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import SideBar from "../layout/SideBar";
import UserDashboard from "../components/UserDashboard";
import AdminDashboard from "../components/AdminDashboard";
import BookManagement from "../components/BookManagement";
import Catalog from "../components/Catalog";
import Users from "../components/Users";
import MyBorrowedBooks from "../components/MyBorrowedBooks";

const Home = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState("");
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="relative md:pl-64 flex min-h-screen bg-gray-100">
      <div className="md:hidden z-10 absolute right-6 top-4 sm:top-6 flex justify-center items-center bg-black rounded-md h-9 w-9 text-white">
        <GiHamburgerMenu
          className="text-2xl"
          onClick={() => setIsSideBarOpen(!isSideBarOpen)}
        />
      </div>
      <SideBar
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
        setSelectedComponent={setSelectedComponent}
      />
      {(() => {
        switch (selectedComponent) {
          case "Dashboard":
            return user?.role === "User" ? (
              <UserDashboard />
            ) : (
              <AdminDashboard />
            );
          case "Books":
            return <BookManagement />;
          case "Catalog":
            return user?.role === "Admin" ? <Catalog /> : null;
          case "Users":
            return user?.role === "Admin" ? <Users /> : null;
          case "My Borrowed Books":
            return <MyBorrowedBooks />;
          default:
            return user?.role === "User" ? (
              <UserDashboard />
            ) : (
              <AdminDashboard />
            );
        }
      })()}
    </div>
  );
};

export default Home;
