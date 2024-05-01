// import react
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetSelectedTask = (id) => {
  const [loading, setLoading] = useState(false);
  const [selectedTask, setSelectedTask] = useState([]);

  useEffect(() => {
    const getSelectedTask = async () => {
      setLoading(true);

      try {
        const res = await fetch(`/api/task/${id}`);

        if (!res) {
          setLoading(false);
          return toast.error("Task Not Found");
        }

        const data = await res.json();
        if (data.error) throw new Error(data.error);

        setSelectedTask(data.selectedTasks);
      } catch (error) {
        console.log("Error in UseGetSelectedTask hook: ", error.message);
      } finally {
        setLoading(false);
      }
    };
    getSelectedTask();
  }, [id]);
  return { loading, selectedTask };
};

export default useGetSelectedTask;
