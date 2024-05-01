// import react
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import code file
import Navbar from "../../components/Navbar";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();

  const handleLink = () => {
    setTimeout(() => {
      Navigate("/login");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="home-bg ">
      <Navbar />
      <div className="flex justify-center flex-col 2xl:pt-60 pt-36 px-24 2xl:w-1/2 w-3/5">
        <h1 className="text-primary 2xl:text-6xl text-4xl font-bold">
          Track Your Progress, Achieve Your Goals
        </h1>
        <p className="2xl:text-2xl text-xl mt-4 mb-24 text-white">
          Enhance productivity and efficiency with WorkTrackr, the comprehensive
          solution for managing your tasks and projects
        </p>
        <button
          onClick={() => {
            setLoading(true);
            handleLink();
          }}
          className="btn btn-primary 2xl:btn-lg btn-md w-1/3 text-secondary 2xl:text-xl text-lg h-16"
          disabled={loading}
        >
          {loading ? (
            <span className="loading loading-dots loading-md"></span>
          ) : (
            "Get Started"
          )}
        </button>
      </div>
    </div>
  );
};

export default Home;
