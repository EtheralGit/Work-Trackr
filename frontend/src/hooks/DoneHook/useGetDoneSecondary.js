// import react
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetDoneSecondary = () => {
  const [secLoading, setSecLoading] = useState(false);
  const [secondaryDone, setSecondaryDone] = useState([]);

  useEffect(() => {
    const getDoneSecondary = async () => {
      setSecLoading(true);
      try {
        const res = await fetch("/api/done/secondary/task");

        if (!res.ok) {
          setSecLoading(false);
          return toast.error("You haven't completed any secondary task!");
        }

        const data = await res.json();
        if (data.error) throw new Error(data.error);

        setSecondaryDone(data.secondaryDone);
      } catch (error) {
        console.log("Error in useGetDoneSecondary: ", error.message);
      } finally {
        setSecLoading(false);
      }
    };
    getDoneSecondary();
  }, []);
  return { secLoading, secondaryDone };
};

export default useGetDoneSecondary;
