import { useContext } from "react";
import { AuthContext } from "../contexts";

export const useAuth = () => {
  return useContext(AuthContext);
};
