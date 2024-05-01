// import react
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetSelectedGoal = (id) => {
  const [loading, setLoading] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState([]);

  useEffect(() => {
    const selectedGoal = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/goal/${id}`);

        const data = await res.json();
        if (data.error) {
          setLoading(false);
          return toast.error(data.error);
        }

        setSelectedGoal(data.selectedGoal);
      } catch (error) {
        console.log("Error in useGetSelectedGoal hook: ", error.messsge);
      } finally {
        setLoading(false);
      }
    };
    selectedGoal();
  }, []);
  return { loading, selectedGoal };
};

export default useGetSelectedGoal;
