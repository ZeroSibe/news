import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="main-header">
      <h1 className="app-name">NEWS</h1>
      <nav className="nav main-nav grey-border">
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
          <li>
            <Link to="/topics" className="nav-link">
              Topics
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
