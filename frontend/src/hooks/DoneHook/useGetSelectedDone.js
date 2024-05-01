// import react
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetSelectedDone = (id) => {
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const getSelectedDone = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/done/${id}`);

        if (!res.ok) {
          setLoading(false);
          toast.error("Task Not Found");
        }

        const data = await res.json();
        if (data.error) throw new Error(data.error);

        setSelected(data.selectedDone);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    getSelectedDone();
  }, [id]);
  return { loading, selected };
};

export default useGetSelectedDone;
