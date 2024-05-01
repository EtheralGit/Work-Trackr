// import react
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import code file
import useCreateNote from "../../hooks/Notehook/useCreateNote";
// fontawesome
import { FaArrowLeft } from "react-icons/fa6";

const CreateNote = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { loading, createNote } = useCreateNote();

  const handleBack = () => {
    setTimeout(() => {
      navigate("/dashboard-notes");
    }, 1000);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    await createNote(title, description);
  };

  return (
    <div
      className={`min-h-screen bg-secondary flex flex-col items-center p-12 ${
        loading ? "justify-center" : ""
      }`}
    >
      <h1 className="text-primary text-4xl font-bold 2xl:mb-12 mb-8">
        {loading ? "Creating New Notes..." : "New Notes"}
      </h1>
      <div className="2xl:w-1/3 w-1/2 bg-tertiary shadow-xl 2xl:p-16 p-12 rounded-md">
        {loading ? (
          <span className="loading loading-dots loading-lg mx-auto flex justify-center items-center"></span>
        ) : (
          <div>
            <button onClick={handleBack} className="mb-4">
              <FaArrowLeft className="text-primary w-8 h-8" />
            </button>
            <form
              onSubmit={handleCreate}
              className="flex flex-col items-center gap-4"
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
                className="w-full h-[28rem] rounded-sm bg-transparent border border-opacity-55 border-primary border-solid 
            px-4 py-2 text-primary opacity-75"
                placeholder="Make a note..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <div className="flex justify-between items-center"></div>
              <button className="bg-primary text-secondary text-lg px-7 py-3 rounded-md hover:opacity-80 duration-300">
                Create
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateNote;
