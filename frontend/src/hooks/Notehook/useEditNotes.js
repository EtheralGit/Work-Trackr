// import react
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const useEditNotes = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const editNote = async (id, title, description) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/note/edit/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });

      const data = await res.json();
      if (data.error) {
        setLoading(false);
        return toast.error(data.error);
      }

      setTimeout(() => {
        setLoading(false);
        navigate("/dashboard-notes");
        return toast.success("Note Edited Successfully");
      }, 1000);
    } catch (error) {
      setLoading(false);
      console.log("Error in useEditNotes hook: ", error.message);
    }
  };
  return { loading, editNote };
};

export default useEditNotes;
