import { useEffect, useRef } from "react";
import { useState } from "react";
import { useKey } from "../../hooks/useKey";

export default function Search({ query, setQuery }) {
  const inputEl = useRef(null);

  function actionForUseKey() {
    if (document.activeElement === inputEl.current) {
      return;
    }

    inputEl.current.focus();
    setQuery("");
  }

  useKey("Enter", actionForUseKey, "keydown");

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}
