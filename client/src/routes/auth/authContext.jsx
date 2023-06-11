import { createContext, useState, useEffect } from "react";
import { fetchme } from "../../api/api";
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loggedin, setloggedin] = useState(false);
  console.log("loggedin?", loggedin);
  const [user, setUser] = useState({ id: null, username: "Guest" });
  console.log("user?", user);
  const contextvalue = {
    user,
    setUser,
    loggedin,
    setloggedin,
  };
  useEffect(() => {
    async function getme() {
      try {
        const response = await fetchme();
        console.log("are we hitting this use effect in authprovider");
        console.log("---------------response from get me function", response);
        setUser(user);
        setloggedin(true);
      } catch (error) {
        console.log("error?", error);
        setUser({ username: "Guest" });
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
