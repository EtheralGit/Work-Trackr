// import react
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// import code file
import useEditNotes from "../../hooks/Notehook/useEditNotes";
import useGetSelectedNote from "../../hooks/Notehook/useGetSelectedNote";
import useDeleteNote from "../../hooks/Notehook/useDeleteNote";
// fontawesome
import { FaArrowLeft } from "react-icons/fa6";

const EditNote = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { getLoading, selectedNote } = useGetSelectedNote(id);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setDescription(selectedNote.description);
    }
  }, [selectedNote]);

  const { loading, editNote } = useEditNotes();
  const { loadingdel, deleteNote } = useDeleteNote();

  const handleBack = () => {
    setTimeout(() => {
      navigate("/dashboard-notes");
    }, 1000);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (e.nativeEvent.submitter.name === "edit") {
      await editNote(id, title, description);
    } else if (e.nativeEvent.submitter.name === "delete") {
      await deleteNote(id);
    }
  };

  return (
    <div
      className={`min-h-screen bg-secondary flex flex-col items-center p-12 ${
        loading || loadingdel ? "justify-center" : ""
      } `}
    >
      <h1 className="text-primary text-5xl mb-12">
        {loading || loadingdel ? "Processing..." : "Edit Notes"}
      </h1>
      <div className="2xl:w-1/3 xl:w-1/2 w-2/3 bg-tertiary shadow-xl p-16 rounded-md">
        {loading || loadingdel || getLoading ? (
          <span className="loading loading-dots loading-lg mx-auto flex justify-center items-center"></span>
        ) : (
          <div>
            <button onClick={handleBack} className="mb-4">
              <FaArrowLeft className="text-primary w-8 h-8" />
            </button>
            <form
              className="flex flex-col items-center gap-4"
              onSubmit={handleFormSubmit}
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
                placeholder="Make a fullstack website..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <div className="flex justify-between items-center w-full">
                <button
                  type="submit"
                  name="edit"
                  className="bg-primary text-secondary text-lg px-7 py-3 rounded-md hover:opacity-80 duration-300"
                >
                  Edit
                </button>
                <button
                  type="submit"
                  name="delete"
                  className="bg-primary text-secondary text-lg px-7 py-3 rounded-md hover:opacity-80 duration-300"
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditNote;
