// import react
import { useState } from "react";
import toast from "react-hot-toast";

const useDeleteSelectedDone = () => {
  const [loadingdel, setLoadingdel] = useState(false);

  const deleteDone = async (id) => {
    setLoadingdel(true);
    try {
      const res = await fetch(`/api/done/delete/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        setLoadingdel(false);
        return toast.error("Task Not Found");
      }
      setTimeout(() => {
        setLoadingdel(false);
        return toast.success("Deleted Successfully");
      }, 1000);
    } catch (error) {
      console.log("Error in useDeleteSelectedDone: ", error.message);
    }
  };
  return { loadingdel, deleteDone };
};

export default useDeleteSelectedDone;
