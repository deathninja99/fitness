import { createContext, useState, useEffect } from "react";
import { fetchme } from "../../api/api";
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setuser] = useState({ username: "Guest" });
  const [loggedin, setloggedin] = useState(false);
  useEffect(() => {
    async function getme() {
      try {
        const { message, success, user } = await fetchme();
        setuser(user);
      } catch (error) {
        setuser({ username: "Guest" });
      }
    }
    getme();
  }, [loggedin]);

  const contextvalue = {
    user,
    setuser,
    loggedin,
    setloggedin,
  };

  return (
    <AuthContext.Provider value={contextvalue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
