import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const LogIn = () => {
  const [logInData, setLogInData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);

  async function handleLogIn(e) {
    e.preventDefault();
    let login = await actions.loginUser(logInData);
    if (login) {
      console.log("Login Successfull");
      navigate("/");
    } else {
      console.log("Fail to Login");
    }
  }

  useEffect(() => {
    store.token && navigate("/");
  });

  return (
    <div className="container-fluid h-100 d-flex justify-content-center">
      <div className="col-md-6 col-sm-12 bg-white d-flex flex-column justify-content-center align-items-center">
        <div className="w-75">
          <h1 className="mb-4 text-center text-primary">LOGIN</h1>
          <form
            className="d-flex flex-column align-items-center"
            onSubmit={handleLogIn}
          >
            <div className="form-group w-100">
              <label htmlFor="email" className="text-primary">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="email"
                id="email"
                autoComplete="email"
                required
                value={logInData.email}
                onChange={(e) => {
                  setLogInData({
                    ...logInData,
                    email: e.target.value,
                  });
                }}
              />
            </div>
            <div className="form-group w-100">
              <label htmlFor="password" className="text-primary mt-4">
                Password
              </label>
              <input
                className="form-control"
                placeholder="Password"
                type="password"
                required
                id="password"
                autoComplete="current-password"
                value={logInData.password}
                onChange={(e) => {
                  setLogInData({
                    ...logInData,
                    password: e.target.value,
                  });
                }}
              />
            </div>
            <p className="mt-4">
              <Link className="text-primary" to="/forgot-password">
                Olvide Password
              </Link>
            </p>
            <button type="submit" className="btn btn-primary w-100 mt-4">
              LOGIN
            </button>
          </form>
          <hr className="my-4" />
          <p className="text-center text-secondary">
            "No hay cuenta"
            <Link to="/signup" className="ml-2 text-primary">
              SignUP
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
