import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

function ReviewSuggestions() {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetchSuggestions();
  }, []);

  async function fetchSuggestions() {
    const { data, error } = await supabase
      .from("suggestions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log("Suggestion fetch error:", error.message);
      return;
    }

    setSuggestions(data);
  }

  async function deleteSuggestion(id) {
    const { error } = await supabase
      .from("suggestions")
      .delete()
      .eq("id", id);

    if (error) {
      console.log("Delete error:", error.message);
      alert(error.message);
      return;
    }

    setSuggestions((prev) =>
      prev.filter((suggestion) => suggestion.id !== id)
    );
  }

  return (
    <main className="page-layout">
      <section className="page-header">
        <h1>Review Suggestions</h1>
        <p>View and manage submitted family fund suggestions.</p>
      </section>

      <section className="announcement-grid">
        {suggestions.map((suggestion) => (
          <article className="announcement-card" key={suggestion.id}>
            <span className="announcement-date">
              {new Date(suggestion.created_at).toLocaleDateString()}
            </span>

            <h3>
              {suggestion.is_anonymous
                ? "Anonymous Suggestion"
                : "Member Suggestion"}
            </h3>

            <p>{suggestion.message}</p>

            <button
              className="secondary-btn"
              onClick={() => deleteSuggestion(suggestion.id)}
            >
              Delete
            </button>
          </article>
        ))}
      </section>
    </main>
  );
}

export default ReviewSuggestions;