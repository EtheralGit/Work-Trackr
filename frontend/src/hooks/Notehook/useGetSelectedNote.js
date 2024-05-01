// import react
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetSelectedNote = (id) => {
  const [getLoading, setGetLoading] = useState(false);
  const [selectedNote, setSelectedNote] = useState([]);

  useEffect(() => {
    const getSelectedNote = async () => {
      setGetLoading(true);
      try {
        const res = await fetch(`/api/note/${id}`);

        const data = await res.json();
        if (data.error) {
          setGetLoading(false);
          return toast.error(data.error);
        }

        setSelectedNote(data.selectedNote);
      } catch (error) {
        console.log("Error in useGetSelectedNote: ", error.message);
      } finally {
        setGetLoading(false);
      }
    };
    getSelectedNote();
  }, []);
  return { getLoading, selectedNote };
};

export default useGetSelectedNote;
