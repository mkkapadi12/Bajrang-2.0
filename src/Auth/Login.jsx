import React from "react";
import login from "../assets/Auth/login.gif";
// import LoginForm from "../Shared/LoginForm";
import LoginForm2 from "../Shared/LoginForm2";
import useTitle from "../Hooks/title";

const Login = () => {
  useTitle("Log In");
  return (
    <div className="w-full p-3 sm:p-7">
      <div className="container grid w-full mx-auto sm:w-4/5 sm:grid-cols-2">
        <div className="flex items-center justify-center ">
          <LoginForm2 />
        </div>
        <div className="flex items-center justify-center ">
          <img src={login} alt="login" />
        </div>
      </div>
    </div>
  );
};

export default Login;
