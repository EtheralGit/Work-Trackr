// import code file
import { useReducer, useState } from "react";
import useCreateTask from "../../hooks/TaskHook/useCreateTask";

const NewTask = () => {
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    category: "Primary",
    dueDate: "",
  });

  // useCreateTask hook
  const { loading, createTask } = useCreateTask();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTask(inputs);
  };

  return (
    <div className="min-h-screen bg-secondary 2xl:p-6 p-4 text-center flex flex-col justify-center center items-center gap-8">
      <div>
        <h1 className=" text-primary 2xl:text-4xl text-3xl font-bold">
          Make Your New Task
        </h1>
        <p className="text-primary opacity-80 2xl:text-xl text-lg">
          Unleash your creativity by crafting a new task that will enrich your
          schedule
        </p>
      </div>
      {loading ? (
        <div>
          <span className="loading loading-dots loading-lg"></span>
          <h1 className="text-primary text-xl opacity-80">Creating...</h1>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:w-1/2">
          <input
            type="text"
            className="w-full bg-transparent border-1 border-opacity-55 border-primary border-solid border px-4 py-2 text-primary rounded-md"
            placeholder="Title"
            value={inputs.title}
            onChange={(e) => setInputs({ ...inputs, title: e.target.value })}
          />
          <textarea
            className="w-full h-96 rounded-md bg-transparent border border-opacity-55 border-primary border-solid px-4 py-2 text-primary opacity-75"
            placeholder="Make a fullstack website..."
            value={inputs.description}
            onChange={(e) =>
              setInputs({ ...inputs, description: e.target.value })
            }
          ></textarea>
          <div className="flex gap-4 ">
            <select
              className="select border border-primary border-solid text-primary border-opacity-55 w-full bg-transparent outline-none"
              value={inputs.category}
              onChange={(e) =>
                setInputs({ ...inputs, category: e.target.value })
              }
            >
              <option value="Primary">Primary</option>
              <option value="Secondary">Secondary</option>
            </select>
            <div className="relative">
              <input
                type="date"
                className="w-full bg-transparent border border-1 border-solid border-primary border-opacity-55 rounded-lg text-primary px-4 py-2.5
              focus:border-primary focus:outline-none"
                min={new Date().toISOString().split("T")[0]}
                value={inputs.dueDate}
                onChange={(e) =>
                  setInputs({ ...inputs, dueDate: e.target.value })
                }
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
          </div>
          <button className="w-full bg-primary bg-opacity-80 py-4 px-8 text-secondary rounded-md text-lg font-medium">
            Create
          </button>
        </form>
      )}
    </div>
  );
};

export default NewTask;
