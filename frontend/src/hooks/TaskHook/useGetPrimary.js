// import react
import { useState, useEffect } from "react";

const useGetPrimary = () => {
  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState([]);

  useEffect(() => {
    const getPrimaryTask = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/task/primary-task");
        const data = await res.json();

        if (data.error) throw new Error(error.message);
        setTask(data.primaryTasks);
      } catch (error) {
        console.log("Error in useGetPrimary hooks: ", error);
      } finally {
        setLoading(false);
      }
    };
    getPrimaryTask();
  }, []);
  return { loading, task };
};

export default useGetPrimary;
