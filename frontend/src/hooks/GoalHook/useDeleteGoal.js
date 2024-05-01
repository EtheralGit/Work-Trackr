// import react
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const useDeleteGoal = () => {
  const [loadingdel, setLoadingdel] = useState(false);
  const navigate = useNavigate();

  const deleteGoal = async (id) => {
    setLoadingdel(true);
    try {
      const res = await fetch(`/api/goal/delete/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (data.error) {
        setLoadingdel(false);
        return toast.error(data.error);
      }

      setTimeout(() => {
        setLoadingdel(false);
        navigate("/dashboard-goals");
        return toast.success("Deleted Successfully");
      }, 1000);
    } catch (error) {
      setLoadingdel(false);
      console.log("Error in useDeleteGoal hook: ", error.message);
    }
  };
  return { loadingdel, deleteGoal };
};

export default useDeleteGoal;
