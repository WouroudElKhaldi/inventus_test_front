import React from "react";
import { Link } from "react-router-dom";

export function Unauthorized(props) {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        rowGap: "2rem",
      }}
    >
      <h1>Oops , u're not Authorized!</h1>
      <Link to={"/"}>Return Home</Link>
    </div>
  );
}
