import { createContext, useState } from "react";

export let tokenContext = createContext();

export default function TokenContextProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <tokenContext.Provider value={{ user, setUser }}>
      {children}
    </tokenContext.Provider>
  );
}