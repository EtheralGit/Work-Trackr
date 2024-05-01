// import react
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const useGetDonePrimary = () => {
  const [loading, setLoading] = useState(false);
  const [primaryDone, SetPrimaryDone] = useState([]);

  useEffect(() => {
    const getDonePrimary = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/done/primary/task");

        if (!res.ok) {
          setLoading(false);
          return toast.error("You haven't done any primary tasks");
        }

        const data = await res.json();
        if (data.error) throw new Error(data.error);

        SetPrimaryDone(data.primaryDone);
      } catch (error) {
        console.log("Error in useGetDonePrimary: ", error.message);
      } finally {
        setLoading(false);
      }
    };
    getDonePrimary();
  }, []);
  return { loading, primaryDone };
};

export default useGetDonePrimary;
