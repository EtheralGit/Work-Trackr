// import react
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
// import code file
import { useAuthContext } from "../../../context/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const Navigate = useNavigate();

  const login = async (email, password) => {
    const success = handleInputErrors(email, password);
    if (!success) return;

    setLoading(true);

    setTimeout(async () => {
      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        if (res.status === 400)
          return toast.error("Invalid username or password");

        setTimeout(() => {
          Navigate("/dashboard");
        }, 1000);

        const data = await res.json();
        console.log(data);

        localStorage.setItem("user", JSON.stringify(data));
        setAuthUser(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }, 1000);
  };
  return { loading, login };
};

export default useLogin;

function handleInputErrors(email, password) {
  if (!email || !password) {
    toast.error("Please fill all the fields");
    return false;
  }
  return true;
}
