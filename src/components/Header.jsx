import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export default function Header() {
  const { user } = useContext(UserContext);
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
          {!user ? (
            <li>
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/my-profile" className="nav-link">
                Profile
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
