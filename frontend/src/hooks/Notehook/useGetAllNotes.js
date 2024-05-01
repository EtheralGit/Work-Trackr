// import react
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetAllNotes = () => {
  const [loading, setLoading] = useState(false);
  const [allNotes, setAllNotes] = useState([]);

  useEffect(() => {
    const allNotes = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/note/get");

        const data = await res.json();
        if (data.error) {
          setLoading(false);
          return toast.error(data.error);
        }

        setAllNotes(data.allNotes);
      } catch (error) {
        console.log("Error in getAllNotes hook: ", error.message);
      } finally {
        setLoading(false);
      }
    };
    allNotes();
  }, []);
  return { loading, allNotes };
};

export default useGetAllNotes;
