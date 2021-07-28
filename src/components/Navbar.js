import React, { Fragment } from "react";

const Navbar = () => {
  return (
    <Fragment>
      <div className="navBar">
        <a href="/search">
          <i
            className="far fa-arrow-alt-circle-left"
            style={{ fontSize: "1.2em" }}
          ></i>
          <h2>Search Again</h2>
        </a>
      </div>
    </Fragment>
  );
};

export default Navbar;
