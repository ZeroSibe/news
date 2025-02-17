import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { getUserByUsername } from "../utils/api";
import { useNavigate, Link } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import Loading from "./Loading";
import UserArticles from "./UserArticles";

export default function Profile() {
  const [loggedUser, setLoggedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setLoggedUser(null);
      setIsLoading(true);
      setError(null);
      getUserByUsername(user)
        .then((userFromApi) => {
          setLoggedUser(userFromApi);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(err);
          setIsLoading(false);
        });
    } else {
      navigate("/login");
    }
  }, [user, navigate]);

  if (error) {
    return <ErrorPage error={error} />;
  }

  if (isLoading || !loggedUser) {
    return <Loading />;
  }

  return (
    <div className="container">
      <h2 className="container-header">My Profile</h2>
      <section className="profile-card">
        <img
          src={loggedUser.avatar_url}
          alt={`${loggedUser.username}'s avatar`}
        />
        <h3>{loggedUser.username}</h3>
        <h4> {loggedUser.name}</h4>
        <div className="align-col">
          <button
            className="logout-btn"
            aria-label="sign out"
            onClick={() => {
              setUser(null);
              navigate("/login");
            }}
          >
            Logout
          </button>
          <Link to="/create-post">
            <button aria-label="go to create post" className="post-article-btn">
              + Create Post
            </button>
          </Link>
        </div>
      </section>
      <UserArticles username={loggedUser.username} />
    </div>
  );
}
