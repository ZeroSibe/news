import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="main-header">
      <h1 className="app-name app-name-large">NEWS</h1>
      <nav className="nav main-nav">
        <ul>
          <li>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/articles" className="nav-link">
              Articles
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
