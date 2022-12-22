import React from "react";
import { useSelector } from "react-redux";
import "./home.css";

const Home = () => {
  const isLoggedin = useSelector((state) => state.isLoggedin);
  // console.log(isLoggedin);
  return (
    <>

    <div className="home">
      <div
        className="homeing"
        style={{ 
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <img
          src="./images/Welcome.jpg"
          className="homeinginner"
          alt="Welcome"
        />
      </div>

      {!isLoggedin && (
        
          <p className="parasignuporlogin">
            Please Signup or Login to continue.
          </p>
        
      )}
      </div>
    </>
    
  );
};

export default Home;
