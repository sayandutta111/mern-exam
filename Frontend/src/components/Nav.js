import React from "react";
import { Link } from "react-router-dom";
const Nav = () => {
  return (
    <div>
      <ul className="nav-ul">
        {/* <li>
          <Link to="/">Tweets</Link>
        </li> */}
        <li>
          <Link to="/add">Add Tweet</Link>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
