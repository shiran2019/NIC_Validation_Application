import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Login from "../pages/Login";
import Register from "../pages/Register";

import AdminDashboard from "../pages/AdminDashboard";
import PageNotFound from "../ErrorHandle/PageNotFound";
import DataGrid from "../components/DataGrid";
import OtpVerification from "../pages/OTP/OtpVerification";
import ProfilePage from "../pages/ProfilePage";

export default function Paths() {
  const [authState, setAuthState] = useState({
    userName: "",
    status: false,
    role: "",
    userId: ""
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/Login/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        console.log(response.data.role);
        console.log(response.data.userId);
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else if (response.data.role == "Admin") {
          setAuthState({
            userName: response.data.user,
            status: true,
            role: response.data.role,
            userID : response.data.userId
          });
        } else if (response.data.role == "NormalUser") {
          setAuthState({
            userName: response.data.user,
            status: true,
            role: response.data.role,
            userID : response.data.userId
          });
        } else console.log("This is not a valid user");
      });
  }, []);

  return (
    <>
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <div>
          <Router>
            <Routes>
              {!authState.status && (
                <>
                  <Route path="/" element={<Login />}></Route>
                  <Route path="/reg" element={<Register />}></Route>
                  <Route path="*" element={<PageNotFound />}></Route>
                  <Route path="/forgot-password" element={<OtpVerification/>}></Route>
                </>
              )}

              {authState.status && (
                <>
                  {authState.role === "Admin" && (
                    <>
                      <Route path="/" element={<AdminDashboard />}></Route>
                      <Route path="/reg" element={<Register />}></Route>
                      <Route path="*" element={<AdminDashboard />}></Route>
                    </>
                  )}

                  {authState.role === "NormalUser" && (
                    <>
                      <Route path="/" element={<ProfilePage/>}></Route>
                    </>
                  )}
                </>
              )}
            </Routes>
          </Router>
        </div>
      </AuthContext.Provider>
    </>
  );
}
