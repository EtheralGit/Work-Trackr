// import react
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const useCreateGoal = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const createGoal = async (title, text, completedAt) => {
    setLoading(true);
    try {
      const res = await fetch("/api/goal/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, text, completedAt }),
      });

      const data = await res.json();
      if (data.error) {
        setLoading(false);
        return toast.error(data.error);
      }

      setTimeout(() => {
        setLoading(false);
        navigate("/dashboard-goals");
        return toast.success("Goals Created Successfully!");
      }, 1000);
    } catch (error) {
      setLoading(false);
      console.log("Error in useCreateGoal hook: ", error.message);
    }
  };
  return { loading, createGoal };
};

export default useCreateGoal;
