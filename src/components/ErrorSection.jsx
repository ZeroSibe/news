import React from "react";

export default function ErrorSection({ error }) {
  console.log(error);
  return (
    <section className="error-container">
      <p>An error occured please try again later</p>
    </section>
  );
}
