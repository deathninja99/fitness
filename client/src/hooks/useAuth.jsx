import { useContext } from "react";
import { AuthContext } from "../routes/auth/authContext";
const useAuth = () => {
  return useContext(AuthContext);
};
export default useAuth;
