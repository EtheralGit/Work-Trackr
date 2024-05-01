// import react
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import code file
import useLogin from "../../hooks/authHook/useLogin";
// import react icon
import { PiBookOpenLight } from "react-icons/pi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Navigate = useNavigate();

  const handleAccount = () => {
    setTimeout(() => {
      Navigate("/signup");
    }, 1000);
  };

  const { loading, login } = useLogin();
  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="flex h-screen">
      <div className="bg-secondary xl:w-1/3 w-1/2 h-full flex justify-center items-center">
        <div className="w-4/5 2xl:h-3/5 h-5/6 bg-white rounded-lg shadow-md mx-auto my-auto p-16 ">
          <h1 className="text-primary text-4xl font-semibold text-center mb-8">
            Login
          </h1>
          <form onSubmit={handleLogin}>
            <div className="w-full items-center mb-4">
              <label htmlFor="email" className="text-primary text-xl">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                className=" 2xl:text-lg text-md border border-solid border-black bg-transparent rounded-md block 2xl:p-4 p-3
                text-primary outline-none w-full "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="w-full items-center mb-8">
              <label htmlFor="email" className="text-primary text-xl">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                className=" 2xl:text-lg text-md border border-solid border-black bg-transparent rounded-md block 2xl:p-4 p-3 
                text-primary outline-none w-full "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <a
              className="text-primary mb-4 hover:underline text-xl cursor-pointer inline-block"
              onClick={handleAccount}
            >
              Don't have an account?
            </a>
            <div className="w-full flex flex-col justify-center items-center mt-8">
              <button className="bg-primary text-lg rounded-lg 2xl:px-8 2xl:py-4 px-6 py-3 text-white hover:opacity-85">
                {loading ? (
                  <span className="loading loading-dots"></span>
                ) : (
                  "Login"
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
