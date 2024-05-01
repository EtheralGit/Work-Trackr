// import react
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const useCreateTask = () => {
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();

  const createTask = async ({ title, description, category, dueDate }) => {
    const success = handleInputsError({
      title,
      description,
      category,
      dueDate,
    });
    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch("/api/task/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, category, dueDate }),
      });

      const data = await res.json();

      if (data.error) {
        setLoading(false);
        return toast.error(data.error);
      }

      // pass the error
      setTimeout(() => {
        Navigate("/dashboard");
        return toast.success("Task Successfully Created!");
        setLoading(false);
      }, 1000);

      if (data.error) throw new Error(data.error);
    } catch (error) {
      console.log("Error in create task hook:", error);
      setLoading(false);
    }
  };
  return { loading, createTask };
};

export default useCreateTask;

function handleInputsError({ title, description, category, dueDate }) {
  if (!title || !description || !category || !dueDate) {
    console.log({ title, description, category, dueDate });
    toast.error("Please fill all the fields");
    return false;
  }
  if (title.length > 40) {
    toast.error("Title must be less than 40 characters");
    return false;
  }
  if (description.length > 1200) {
    toast.error("Description must be less than 250 characters");
    return false;
  }
  return true;
}
