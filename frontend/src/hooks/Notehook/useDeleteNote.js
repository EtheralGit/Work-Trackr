// import react
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const useDeleteNote = () => {
  const [loadingdel, setLoadingdel] = useState(false);
  const navigate = useNavigate();

  const deleteNote = async (id) => {
    setLoadingdel(true);
    try {
      const res = await fetch(`/api/note/delete/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (data.error) {
        setLoadingdel(false);
        return toast.error(data.error);
      }

      setTimeout(() => {
        setLoadingdel(false);
        navigate("/dashboard-notes");
        return toast.success("Note Deleted Successfully");
      }, 1000);
    } catch (error) {
      setLoadingdel(false);
      console.log("Error in useDeleteNote: ", error.message);
    }
  };
  return { loadingdel, deleteNote };
};

export default useDeleteNote;
