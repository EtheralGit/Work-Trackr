// import react
import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const Navigate = useNavigate();

  const handleLogin = () => {
    setTimeout(() => {
      Navigate("/login");
    }, 1000);
  };

  const handleSignup = () => {
    setTimeout(() => {
      Navigate("/signup");
    }, 1000);
  };

  return (
    <div className="py-12 px-24 h-8 flex justify-between items-center">
      <h1 href="#" className="text-primary font-semibold 2xL:text-3xl text-2xl">
        WorkTrackr
      </h1>
      <div className="flex gap-2">
        <button
          onClick={handleLogin}
          className=" xl:text-primary text-white 2xl:text-xl text-md px-4 py-2 rounded-md font-semibold hover:opacity-90"
        >
          Login
        </button>
        <button
          onClick={handleSignup}
          className="bg-primary text-secondary 2xl:text-xl text-md 2xl:px-5 px-4 py-3 rounded-md font-semibold hover:opacity-90"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Navbar;
