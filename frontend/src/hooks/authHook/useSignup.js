// import react
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();

  const signup = async ({ username, email, password, confirmPassword }) => {
    const success = handleInputErrors({
      username,
      email,
      password,
      confirmPassword,
    });
    if (!success) return;

    setLoading(true);

    setTimeout(async () => {
      try {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password, confirmPassword }),
        });
        if (!res.ok) {
          const data = await res.json();
          setLoading(false);
          if (res.status === 400) {
            if (data.error === "Username already exists") {
              return toast.error("Username already exists");
            } else if (data.error === "Password do not match") {
              return toast.error("Password do not match");
            } else if (data.error === "Email already exists") {
              return toast.error("Email already exists");
            } else {
              return toast.error("Invalid User Data");
            }
          } else {
            return toast.error("Please try again");
          }
        }

        const data = await res.json();
        console.log(data);

        setTimeout(() => {
          Navigate("/login");
        }, 1000);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }, 1200);
  };
  return { loading, signup };
};

export default useSignup;

function handleInputErrors({ username, email, password, confirmPassword }) {
  if (!username || !email || !password || !confirmPassword) {
    toast.error("Please fill all the fields");
    return false;
  }
  if (username.length < 3) {
    toast.error("Username must be at least 3 characters");
    return false;
  }
  if (password !== confirmPassword) {
    toast.error("Password do not match");
    return false;
  }
  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }
  return true;
}
