import { createContext, useState, useEffect } from "react";
import { fetchme } from "../../api/api";
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loggedin, setloggedin] = useState(false);
  console.log("loggedin?", loggedin);
  const [user, setuser] = useState("Guest");
  console.log("user?", user);
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
        console.log("---------------response from get me function", response);
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
