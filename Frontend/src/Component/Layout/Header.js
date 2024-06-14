import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../Store/Comtext";

const Header = ({ showcart, hide }) => {
  const location = useNavigate();
  const uselocation = useLocation();
  const ctx = useContext(Context);

  const onLogoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    location("/");
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <span className="navbar-brand fw-bolder"> ECOMMERCE</span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-auto fw-bold">
            <li className="nav-item ms-5">
              <Link className="nav-link active" to="/">
                HOME
              </Link>
            </li>
            <hr className="divider" />
            {localStorage.getItem("admin") ? (
              <li className="nav-item ms-5">
                <Link className="nav-link active" to="/admin">
                  ADMIN
                </Link>
              </li>
            ) : (
              <></>
            )}
            <hr className="divider" />
          </ul>
          {uselocation.pathname !== "/admin" && (
            <div
              className="ms-auto"
              onClick={() => {
                showcart();
              }}
            >
              <button className="btn btn-primary">CART</button>
            </div>
          )}
          <div className="ms-lg-2" onClick={onLogoutHandler}>
            <button className="btn btn-danger">LOG OUT</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
