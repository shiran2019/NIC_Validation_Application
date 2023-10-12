import React, { useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import "../styles/Login.css";

function Login() {
  console.log("Login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);

  const login = () => {
    const data = { userName: username, password: password };
    axios.post("http://localhost:3001/Login/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
        localStorage.setItem("accessToken", "");
      } else {
        localStorage.setItem("accessToken", response.data);
        setAuthState(true);
        window.location = "/";
      }
    });
  };

  return (
    <div className="main-container">
      <div className="loginContainer">
        <label>Username:</label>
        <input
          type="text"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <label>Password:</label>
        <input
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />

        <div className="button-content">
          <button className="login-button" onClick={login}>
            <b>Login</b>
          </button>

          <Link to="/forgot-password">Forgot Password ?</Link>

          <p className="sign-div">
            If you don't have an account ,{" "}
            <Link to="/reg">
              <b className="signUp-word">sign up</b>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
