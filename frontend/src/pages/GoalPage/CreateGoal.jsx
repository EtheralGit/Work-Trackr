// import react
import { useState } from "react";

// import code file
import useCreateGoal from "../../hooks/GoalHook/useCreateGoal.js";

const CreateGoal = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [completedAt, setCompletedAt] = useState("");

  // useCreateGoal hook
  const { loading, createGoal } = useCreateGoal();

  const handleSubmit = (e) => {
    e.preventDefault();
    createGoal(title, text, completedAt);
  };

  return (
    <div className="bg-secondary min-h-screen flex flex-col items-center 2xl:p-12 p-8">
      <h1 className="text-primary text-4xl mb-2 font-bold">New Goals</h1>
      <h3 className="text-primary text-xl font-medium 2xl:mb-12 mb-4">
        Transform dreams into reality through focused action
      </h3>
      <div className="2xl:w-1/3 w-1/2 bg-tertiary shadow-xl 2xl:p-16 p-12 rounded-md">
        {loading ? (
          <span className="mx-auto loading loading-dots loading-lg flex justify-center items-center"></span>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 items-center"
          >
            <input
              type="text"
              className="w-full bg-transparent border-1 border-opacity-55 border-primary 
            border-solid border px-4 py-2 text-primary rounded-sm outline-none"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="w-full 2xl:h-[28rem] h-[23rem] rounded-sm bg-transparent border border-opacity-55 border-primary border-solid 
            px-4 py-2 text-primary opacity-75"
              placeholder="Make a fullstack website..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>

            <div className="relative">
              <input
                type="date"
                className="w-full bg-transparent border border-1 border-solid border-primary border-opacity-55 rounded-lg text-primary px-4 py-2.5
              focus:border-primary focus:outline-none"
                min={new Date().toISOString().split("T")[0]}
                value={completedAt}
                onChange={(e) => setCompletedAt(e.target.value)}
              />
              <div className="absolute right-2 top-2 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 8l-4 4-4-4"
                  />
                </svg>
              </div>
            </div>
            <button className="bg-primary text-secondary text-lg px-7 py-3 rounded-md hover:opacity-80 duration-300">
              Create
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreateGoal;
