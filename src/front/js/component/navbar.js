import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">React Boilerplate</span>
        </Link>
        <div className="ml-auto">
          <br />
          {!store.token && (
            <>
              <Link to="/signup">
                <button className="btn btn-primary">Login</button>
              </Link>
            </>
          )}

          {store.token && (
            <>
              <button
                className="btn btn-danger"
                onClick={() => actions.logOut()}
              >
                <i className="fa-solid fa-right-from-bracket"></i>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
