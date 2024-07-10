import React from "react";
import LoginFormComponent from "./login/LoginComponent.tsx";
import SignUpFormComponent from "./signup/SignUpComponent.tsx";

interface LoginSignUpFormsProps {
  showLoginForm: boolean;
  showSignUpForm: boolean;
  handleCloseLogin: () => void;
  handleCloseSignUp: () => void;
}

const LoginSignUpFormsComponent: React.FC<LoginSignUpFormsProps> = ({
  showLoginForm,
  showSignUpForm,
  handleCloseLogin,
  handleCloseSignUp,
}) => {
  return (
    <>
      {showLoginForm && (<LoginFormComponent onClose={handleCloseLogin} />)}
      {showSignUpForm && (<SignUpFormComponent onClose={handleCloseSignUp} />)}
    </>
  );
}

export default LoginSignUpFormsComponent;
