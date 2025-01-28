import React from "react";

export default function ErrorSection({ error }) {
  return (
    <section className="error-container">
      <p>{error}</p>
    </section>
  );
}
