import { createContext, useState, useEffect } from "react";
import { fetchme } from "../../api/api";
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loggedin, setloggedin] = useState(false);
  const [user, setuser] = useState({ id: null, username: "Guest" });

  const contextvalue = {
    user,
    setuser,
    loggedin,
    setloggedin,
  };
  useEffect(() => {
    async function getme() {
      try {
        const response = await fetchme();
        console.log("results", response);
        setuser(user);
        setloggedin(true);
      } catch (error) {
        console.log("error?", error);
        setuser({ username: "Guest" });
        setloggedin(false);
      }
    }
    getme();
  }, [loggedin]);

  return (
    <AuthContext.Provider value={contextvalue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
