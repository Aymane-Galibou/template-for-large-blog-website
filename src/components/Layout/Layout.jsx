import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { UserContext } from "../../Context/UserContext";
import { useContext } from "react";

export default function Layout() {
  let { User, setUser, validatesucces, setvalidatesucces } =
    useContext(UserContext);

  useEffect(() => {
    // setvalidatesucces(localStorage.getItem('validatelogin'))
  }, []);

  return (
    <>
      <Navbar />
      <div
        id="fullsite"
        className="conatainer h-full  py-5 w-full mx-auto mt-40"
      >
        <Outlet></Outlet>
      </div>
      <Footer />
    </>
  );
}
