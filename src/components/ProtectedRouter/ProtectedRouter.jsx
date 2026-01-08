import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRouter(props) {
  if (localStorage.getItem("validatelogin") !== null) {
    return props.children;
  } else {
    return <Navigate to={"/loginpage"} />;
  }
}
