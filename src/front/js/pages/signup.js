import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const navigate = useNavigate();

  const { actions } = useContext(Context);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    password_check: "",
  });

  async function handleSignUp(e) {
    e.preventDefault();
    if (data.password === data.password_check) {
      let created = await actions.createUser(data);
      if (created) {
        console.log("Registration Successfull");
        navigate("/");
      } else {
        console.log("Fail to Register");
      }
    }
  }

  return (
    <div className="container-fluid h-100 d-flex justify-content-center">
      <div className="col-md-6 col-sm-12 bg-white d-flex flex-column justify-content-center align-items-center">
        <div className="w-75">
          <h1 className="mb-4 text-center text-primary">SIGN UP</h1>
          <form
            className="d-flex flex-column align-items-center"
            onSubmit={handleSignUp}
          >
            <div className="form-group w-100">
              <label htmlFor="name" className="text-primary">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                id="name"
                autoComplete="name"
                required
                value={data.name}
                onChange={(e) => {
                  setData({
                    ...data,
                    name: e.target.value,
                  });
                }}
              />
            </div>
            <div className="form-group w-100">
              <label htmlFor="email" className="text-primary">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                id="email"
                autoComplete="email"
                required
                value={data.email}
                onChange={(e) => {
                  setData({
                    ...data,
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
                autoComplete="new-password"
                value={data.password}
                onChange={(e) => {
                  setData({
                    ...data,
                    password: e.target.value,
                  });
                }}
              />
            </div>
            <div className="form-group w-100">
              <label htmlFor="password_check" className="text-primary mt-4">
                Repeat Password
              </label>
              <input
                className="form-control"
                placeholder="Repeat Password"
                type="password"
                required
                id="password_check"
                value={data.password_check}
                onChange={(e) =>
                  setData({ ...data, password_check: e.target.value })
                }
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 mt-4">
              SIGN UP
            </button>
          </form>
          <hr className="my-4" />
          <p className="text-center text-secondary">
            Already have an account?
            <Link to="/login" className="ml-2 text-primary">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
