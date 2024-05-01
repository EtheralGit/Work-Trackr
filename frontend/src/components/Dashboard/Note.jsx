// import react
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// import coding file
import NoteCard from "../Cards/NoteCard";
import useGetAllNotes from "../../hooks/Notehook/useGetAllNotes";

// react icons
import { MdArrowOutward } from "react-icons/md";
import { SlNote } from "react-icons/sl";

const Notes = () => {
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();

  const { loading, allNotes } = useGetAllNotes();

  const handleNewNote = () => {
    setTimeout(() => {
      setLoad(false);
      navigate("/new-note");
    }, 1000);
  };
  return (
    <div className="w-full bg-secondary flex flex-col 2xl:p-8 p-2 pl-8 pr-4">
      <div className="flex justify-between items-center">
        <h1 className="text-primary 2xl:text-4xl xl:text-2xl text-2xl font-semibold">
          Notes
        </h1>
        <button
          className="text-primary text-xl font-medium px-8 py-4 hover:scale-105 duration-300 outline-none"
          onClick={() => {
            setLoad(true);
            handleNewNote();
          }}
        >
          {load ? (
            <span className="loading loading-dots loading-lg"></span>
          ) : (
            "+ Add New Notes"
          )}
        </button>
      </div>
      <span className="block border border-1 border-primary mb-8"></span>
      {loading ? (
        <span className="loading loading-dots loading-lg"></span>
      ) : allNotes.length < 1 ? (
        <div className="flex flex-col justify-center items-center w-full h-[80%]">
          <SlNote className="2xl:text-[12rem] xl:text-[10rem] text-[8rem] text-primary mb-8" />
          <h1 className="text-primary 2xl:text-4xl xl:text-3xl text-2xl font-bold">
            Let's Write Your New Note
          </h1>
          <p className="text-primary opacity-75 text-xl flex justify-center items-center mt-[2px]">
            Capture your thoughts and ideas in a new note today!
            <MdArrowOutward className="opacity-100 w-8 h-8" />
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-4 2xl:gap-8 gap-4">
          {allNotes.map((item) => (
            <NoteCard key={item._id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Notes;
