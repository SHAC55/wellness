import { createContext, useState } from "react";
import axios from "axios";

const wellnessContext = createContext();

const WellnessProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const loginFetch = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      setUser(res.data.user);
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <wellnessContext.Provider
      value={{ user, token, loading, error, loginFetch, setUser,setToken }}
    >
      {children}
    </wellnessContext.Provider>
  );
};

export { WellnessProvider };
export default wellnessContext;
