// import react
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// import from code file
import HomeCard from "../Cards/HomeCard";
import useGetPrimary from "../../hooks/TaskHook/useGetPrimary";
import useGetSecondary from "../../hooks/TaskHook/useGetSecondary";

// react icons
import { MdArrowOutward } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import { IoBookOutline } from "react-icons/io5";

const Home = () => {
  const [load, setLoad] = useState(false);

  // useGetPrimary hooks
  const { loading, task } = useGetPrimary();
  // useGetSecondary hooks
  const { secLoad, secondary } = useGetSecondary();

  const Navigate = useNavigate();

  const handleNewTask = () => {
    setTimeout(() => {
      setLoad(false);
      Navigate("/dashboard-new");
    }, 1000);
  };

  const handlePrimary = () => {
    setTimeout(() => {
      Navigate("/primary-task");
    }, 1000);
  };

  const handleSecondary = () => {
    setTimeout(() => {
      Navigate("/secondary-task");
    }, 1000);
  };

  // Fungsi untuk mengonversi tanggal ke objek Date
  const parseDate = (dateString) => new Date(dateString);

  // Fungsi untuk membandingkan dua objek berdasarkan tanggal
  const compareDates = (a, b) => parseDate(a.dueDate) - parseDate(b.dueDate);

  // Mengurutkan task berdasarkan tanggal tercepat untuk tiba
  const sortedPrimaryTasks = loading ? [] : task.slice().sort(compareDates);
  const sortedSecondaryTasks = secLoad
    ? []
    : secondary.slice().sort(compareDates);

  return (
    <div className="w-full bg-secondary flex flex-col 2xl:p-8 p-2 pl-8">
      <div className="flex justify-between items-center">
        <h1 className="text-primary 2xl:text-4xl xl:text-2xl text-2xl font-semibold">
          Home
        </h1>
        <button
          className="text-primary text-xl font-medium px-8 py-4 hover:scale-105 duration-300 outline-none"
          onClick={() => {
            setLoad(true);
            handleNewTask();
          }}
        >
          {load ? (
            <span className="loading loading-dots loading-lg"></span>
          ) : (
            "+ New Task"
          )}
        </button>
      </div>
      <span className="block border border-1 border-primary 2xl:mb-8"></span>
      {sortedPrimaryTasks.length < 1 && sortedSecondaryTasks.length < 1 ? (
        <div className="flex flex-col justify-center items-center w-full h-[80%]">
          <IoBookOutline className="2xl:text-[12rem] xl:text-[10rem] text-[8rem] text-primary" />
          <h1 className="text-primary 2xl:text-4xl xl:text-3xl text-2xl font-bold">
            Let's Make New Task!
          </h1>
          <p className="text-primary opacity-75 text-xl flex justify-center items-center">
            The journey of a thousand tasks begins with one
            <MdArrowOutward className="opacity-100 w-8 h-8" />
          </p>
        </div>
      ) : (
        <div>
          <div className="">
            <h1 className="text-black 2xl:text-3xl xl:text-2xl text-xl font-semibold mb-4 mt-2">
              Primary Task
            </h1>
            <div className="flex items-center gap-4">
              {sortedPrimaryTasks.map((item, index) =>
                index < 3 ? (
                  <HomeCard key={item._id} item={item} />
                ) : index === 3 ? (
                  <button className=" outline-none " onClick={handlePrimary}>
                    <FaArrowRight className="2xl:w-16 2xl:h-16 xl:w-12 xl:h-12 w-8 h-8 text-primary hover:scale-125 duration-300" />
                  </button>
                ) : null
              )}
            </div>
            {sortedPrimaryTasks.length === 0 && (
              <div className="flex flex-col justify-center items-center w-full 2xl:h-64 h-56">
                <h1 className="text-primary text-4xl font-bold">
                  No Primary Task
                </h1>
                <p className="text-primary opacity-75 text-xl flex justify-center items-center">
                  Let's organize your important task
                  <MdArrowOutward className="opacity-100 w-8 h-8" />
                </p>
              </div>
            )}
          </div>
          <div className="mt-8">
            <h1 className="text-black 2xl:text-3xl xl:text-2xl text-xl font-semibold mb-4">
              Secondary Task
            </h1>
            <div className="flex items-center gap-4">
              {sortedSecondaryTasks.map((item, index) =>
                index < 3 ? (
                  <HomeCard key={item._id} item={item} />
                ) : index === 3 ? (
                  <button
                    className="2xl:ml-12 outline-none "
                    onClick={handleSecondary}
                  >
                    <FaArrowRight className="2xl:w-16 2xl:h-16 xl:w-12 xl:h-12 w-8 h-8 text-primary hover:scale-125 duration-300" />
                  </button>
                ) : null
              )}
            </div>
            {sortedSecondaryTasks.length === 0 && (
              <div className="flex flex-col justify-center items-center w-full 2xl:h-64 h-56">
                <h1 className="text-primary text-4xl font-bold">
                  No Secondary Task
                </h1>
                <p className="text-primary opacity-75 text-xl flex justify-center items-center">
                  Let's organize your additional task
                  <MdArrowOutward className="opacity-100 w-8 h-8" />
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
