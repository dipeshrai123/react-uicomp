import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "../contexts";

// AuthContainer HOC
export const AuthContainer = props => {
  const { children, authConfig, authHandlers } = props;
  return (
    <AuthContext.Provider value={{ ...authConfig, ...authHandlers }}>
      <BrowserRouter>
        { children }
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

AuthContainer.propTypes = {
  authConfig: PropTypes.shape({
    isLoggedIn: PropTypes.bool.isRequired,
    userRole: PropTypes.string.isRequired
  }).isRequired,
  authHandlers: PropTypes.object,
  children: PropTypes.any.isRequired
};