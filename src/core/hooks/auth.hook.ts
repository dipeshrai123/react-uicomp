import { useContext } from "react";
import { AuthContext } from "../contexts";

// AUTH
export const useAuth = () => {
  return useContext(AuthContext);
}