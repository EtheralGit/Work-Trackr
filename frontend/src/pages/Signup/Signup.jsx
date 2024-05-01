// import react
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import code file
import useSignup from "../../hooks/authHook/useSignup";
// import react icons
import { PiBookOpenLight } from "react-icons/pi";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { loading, signup } = useSignup();
  const Navigate = useNavigate();

  const handleAccount = () => {
    setTimeout(() => {
      Navigate("/login");
    }, 1000);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };

  return (
    <div className="flex h-screen">
      <div className="bg-secondary xl:w-1/3 w-1/2 h-full flex justify-center items-center">
        <div className="w-4/5 2xl:h-3/4  bg-white rounded-lg shadow-md mx-auto my-auto  p-12 ">
          <h1 className="text-primary text-3xl font-semibold text-center mb-4">
            Sign Up
          </h1>
          <form onSubmit={handleSignup}>
            <div className="w-full items-center mb-4">
              <label
                htmlFor="username"
                className="text-primary 2xl:text-xl text-lg"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="Username"
                className="2xl:text-lg text-md border border-solid border-black bg-transparent text-md rounded-md block px-5 py-3 
                text-primary outline-none w-full "
                value={inputs.username}
                onChange={(e) =>
                  setInputs({ ...inputs, username: e.target.value })
                }
              />
            </div>
            <div className="w-full items-center mb-4">
              <label
                htmlFor="email"
                className="text-primary 2xl:text-xl text-lg"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                className="2xl:text-lg text-md border border-solid border-black bg-transparent text-md rounded-md block px-5 py-3 
                text-primary outline-none w-full "
                value={inputs.email}
                onChange={(e) =>
                  setInputs({ ...inputs, email: e.target.value })
                }
              />
            </div>
            <div className="w-full items-center mb-4">
              <label
                htmlFor="password"
                className="text-primary 2xl:text-xl text-lg"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="2xl:text-lg text-md border border-solid border-black bg-transparent text-md rounded-md block px-5 py-3 
                text-primary outline-none w-full "
                value={inputs.password}
                onChange={(e) =>
                  setInputs({ ...inputs, password: e.target.value })
                }
              />
            </div>
            <div className="w-full items-center mb-4">
              <label
                htmlFor="confirm"
                className="text-primary 2xl:text-xl text-lg"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Confirm Password"
                className="2xl:text-lg text-md border border-solid border-black bg-transparent text-md rounded-md block px-5 py-3 
                text-primary outline-none w-full "
                value={inputs.confirmPassword}
                onChange={(e) =>
                  setInputs({ ...inputs, confirmPassword: e.target.value })
                }
              />
            </div>
            <a
              className="text-primary mb-4 hover:underline 2xl:text-xl text-lg cursor-pointer inline-block"
              onClick={handleAccount}
            >
              Already have an account?
            </a>
            <div className="w-full flex flex-col justify-center items-center 2xl:mt-8 mt-4">
              <button className="bg-primary text-lg rounded-lg 2xl:px-8 2xl:py-4 px-6 py-3 text-white">
                {loading ? (
                  <span className="loading loading-dots"></span>
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="bg-primary w-2/3 h-full flex justify-center items-center gap-8">
        <PiBookOpenLight className="text-white 2xl:text-[15rem] text-[11rem]" />
        <div className="w-1/2">
          <h1 className="text-white 2xl:text-5xl text-3xl font-bold">
            WorkTrackr.
          </h1>
          <p className="text-secondary 2xl:text-3xl text-xl font-medium mt-2 w-4/5">
            Optimize Workflow, Achieve Success Effortlessly
          </p>
          <p className="text-white opacity-60 text-xl mt-2">
            Free for all users, to manage tasks efficiently
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
