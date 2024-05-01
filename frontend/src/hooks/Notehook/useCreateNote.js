// import react
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useCreateNote = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const createNote = async (title, description) => {
    setLoading(true);
    try {
      const res = await fetch("/api/note/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });

      const data = await res.json();
      if (data.error) {
        setLoading(false);
        return toast.error(data.error);
      }

      setTimeout(() => {
        toast.success("Successfully Creating Note");
        navigate("/dashboard-notes");
        setLoading(false);
      }, 1000);
    } catch (error) {
      setLoading(false);
      console.log("Error in useCreateNote hook: ", error.message);
    }
  };
  return { loading, createNote };
};

export default useCreateNote;
