// import react
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// import coding file
import useGetGoals from "../../hooks/GoalHook/useGetGoals";
import GoalCard from "../Cards/GoalCard";

// import react icons
import { GoGoal } from "react-icons/go";

const Goals = () => {
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();

  // useGetGoals hook
  const { loading, goals } = useGetGoals();
  const handleCreate = () => {
    setTimeout(() => {
      setLoad(false);
      navigate("/goal-create");
    }, 1000);
  };

  return (
    <div className="w-full bg-secondary flex flex-col gap-4 p-8">
      <div className="flex justify-between items-center">
        <h1 className="text-primary text-4xl font-semibold">Goals</h1>
        <button
          className="text-primary text-xl font-medium px-8 py-4 hover:scale-110 duration-300 outline-none"
          onClick={() => {
            setLoad(true);
            handleCreate();
          }}
        >
          {load ? (
            <span className="loading loading-dots loading-lg"></span>
          ) : (
            "+ Set New Goals"
          )}
        </button>
      </div>
      <span className="block border border-1 border-primary mb-8"></span>
      <div
        className={`items-center w-full h-full flex flex-col gap-4 ${
          loading ? "justify-center items-center" : ""
        }`}
      >
        {loading ? (
          <span className="loading loading-dots loading-lg h-full justify-center items-center"></span>
        ) : goals.length > 0 ? (
          goals.map((item) => <GoalCard key={item._id} item={item} />)
        ) : (
          <div className="w-full h-[80%] flex justify-center items-center flex-col">
            <GoGoal className="2xl:text-[12rem] xl:text-[10rem] text-[8rem] text-primary mb-2" />
            <h1 className="2xl:text-4xl xl:text-3xl text-2xl font-semibold text-primary">
              Let's Make Your Own Goals
            </h1>
            <p className="text-xl text-primary opacity-80">
              Transform dreams into reality through focused action
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Goals;
