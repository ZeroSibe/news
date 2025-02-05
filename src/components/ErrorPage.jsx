import React from "react";
import { Link } from "react-router-dom";

export default function ErrorPage({ error }) {
  console.log(error);
  return (
    <section className="content-section container">
      <h2 className="container-header">{error}</h2>
      <p>
        Sorry, we couldn't find this page, but don't worry, you can find plenty
        of other things in our
        <Link to={"/"}> homepage.</Link>
      </p>
    </section>
  );
}
