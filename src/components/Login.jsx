import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { getUserByUsername } from "../utils/api";
import ErrorSection from "./ErrorSection";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

export default function Login() {
  const { setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setIsDisabled(true);

    if (!username) {
      setError("Error - Please provide a username");
      setIsDisabled(false);
      return;
    }
    setIsLoading(true);

    getUserByUsername(username)
      .then((userfromApi) => {
        setUser(username);
        setIsLoading(false);
        navigate("/my-profile");
      })
      .catch((err) => {
        if (err.response.status === 404) {
          setError(
            `Error - ${err.response.data.msg} - please provide a registered username`
          );
        } else if (err.response.status === 400) {
          setError(
            `Error - ${err.response.data.msg} - please provide a valid username, with letters only`
          );
        } else {
          setError("Error- Failed to login. Please try again later");
        }
      })
      .finally(() => {
        setIsLoading(false);
        setIsDisabled(false);
      });
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="content-section">
      {error && <ErrorSection error={error} />}
      <section className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="username">Login with your Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <button type="submit" disabled={isDisabled}>
            Login
          </button>
        </form>
      </section>
    </div>
  );
}
