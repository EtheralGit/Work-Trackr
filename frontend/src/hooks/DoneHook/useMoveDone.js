// import react
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useMoveDone = () => {
  const [moveLoading, setMoveLoading] = useState(false);
  const Navigate = useNavigate();

  const moveDone = async (taskId) => {
    setMoveLoading(true);

    try {
      const res = await fetch(`/api/done/move/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (data.error) {
        setMoveLoading(false);
        return toast.error(data.error);
      }

      setTimeout(() => {
        setMoveLoading(false);
        Navigate("/dashboard-done");
        toast.success("Congrats! You have done your task!");
      }, 1000);
    } catch (error) {
      console.log("Error in useMoveDone hooks: ", error.message);
    }
  };
  return { moveLoading, moveDone };
};
