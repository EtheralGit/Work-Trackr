// import react
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetGoals = () => {
  const [loading, setLoading] = useState(false);
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const getGoals = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/goal/user");

        const data = await res.json();
        if (data.error) {
          setLoading(false);
          return toast.error(data.error);
        }
        setGoals(data);
      } catch (error) {
        console.log("Error in useGetGoals Hook", error.message);
      } finally {
        setLoading(false);
      }
    };
    getGoals();
  }, []);
  return { loading, goals };
};

export default useGetGoals;
