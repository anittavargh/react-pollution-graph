import React from "react";

import AuthNav from "./AuthNav";
import MainNav from "./Main-nav";

const NavBar = () => {
  return (
    <div className="nav-container mb-3">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <a class="nav-link">
                {" "}
                <AuthNav />{" "}
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link">
                {" "}
                <MainNav />{" "}
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
