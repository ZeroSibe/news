import React, { useEffect, useState } from "react";

export default function SortArticles({ setSearchParams, searchParams }) {
  const [activeSortby, setActiveSortby] = useState("");
  const [activeOrder, setActiveOrder] = useState("Descending");

  useEffect(() => {
    const orderValue = searchParams.get("order") || "desc";
    const sortByValue = searchParams.get("sort_by") || "created_at";

    setActiveOrder(orderValue === "asc" ? "Ascending" : "Descending");
    setActiveSortby(sortByValue);
  }, [searchParams]);

  function handleSortBy(e) {
    const selectedValue = e.target.value;
    setSearchParams((params) => {
      params.set("sort_by", selectedValue);
      return params;
    });
    setActiveSortby(selectedValue);
  }

  function handleOrder(e) {
    const newOrder = activeOrder === "Descending" ? "asc" : "desc";
    setSearchParams((params) => {
      params.set("order", newOrder);
      return params;
    });
    setActiveOrder(newOrder === "asc" ? "Ascending" : "Descending");
  }

  return (
    <section className="grey-btm-border grey-tp-border">
      <h3>Sort By</h3>
      <form className="sortby-form">
        <div className="horizontal-align sortby-btns">
          <button
            aria-label="sort by date"
            className={`sortby-btn ${
              activeSortby === "created_at" ? "active-btn" : ""
            }`}
            name="sort_by"
            value="created_at"
            type="button"
            onClick={handleSortBy}
            aria-pressed={activeSortby === "created_at"}
          >
            Date
          </button>
          <button
            aria-label="sort by comment count"
            className={`sortby-btn ${
              activeSortby === "comment_count" ? "active-btn" : ""
            }`}
            name="sort_by"
            value="comment_count"
            type="button"
            onClick={handleSortBy}
            aria-pressed={activeSortby === "comment_count"}
          >
            Comments
          </button>
          <button
            aria-label="sort by votes"
            className={`sortby-btn ${
              activeSortby === "votes" ? "active-btn" : ""
            }`}
            name="sort_by"
            value="votes"
            type="button"
            onClick={handleSortBy}
            aria-pressed={activeSortby === "votes"}
          >
            Votes
          </button>
        </div>

        <div className="horizontal-align-end">
          <label htmlFor="order">Order</label>
          <input
            className="order-btn"
            name="order"
            id="order"
            type="button"
            value={activeOrder}
            onClick={handleOrder}
          />
        </div>
      </form>
    </section>
  );
}
