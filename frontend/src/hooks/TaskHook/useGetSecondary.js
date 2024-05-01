// import react
import { useEffect, useState } from "react";

const useGetSecondary = () => {
  const [secLoad, setSecLoad] = useState(false);
  const [secondary, setSecondary] = useState([]);

  useEffect(() => {
    const getSecondaryTask = async () => {
      setSecLoad(true);
      try {
        const res = await fetch("/api/task/secondary-task");

        const data = await res.json();
        if (data.error) throw new Error(data.error);

        setSecondary(data.secondaryTasks);
      } catch (error) {
        console.log("Error in useGetSecondary hooks:", error);
      } finally {
        setSecLoad(false);
      }
    };
    getSecondaryTask();
  }, []);
  return { secLoad, secondary };
};

export default useGetSecondary;
