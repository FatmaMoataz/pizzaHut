import { createContext, useState, useEffect } from "react";

export let tokenContext = createContext();

export default function TokenContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("userToken");
    if (storedToken) {
      setUser({ token: storedToken });
    }
  }, []);

  return (
    <tokenContext.Provider value={{ user, setUser }}>
      {children}
    </tokenContext.Provider>
  );
}
