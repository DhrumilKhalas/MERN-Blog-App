import React from "react";
import "./error.css";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  return ( 
    <>
      <div className="errorinblog">
        <img
          src="https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7888.jpg?size=338&ext=jpg&ga=GA1.2.535951454.1663447951"
          alt="Not available"
          className="errorinbloginner"
        /> 
      </div>
      <div className="errorbtn">
        <button
          className="goback"
          onClick={() => {
            navigate(-1);
          }}
        >
          PREVIOUS PAGE
        </button>
        <button
          className="gohome"
          onClick={() => {
            navigate("/");
          }}
        >
          GO TO HOME PAGE
        </button>
      </div>
    </>
  );
};

export default Error;
