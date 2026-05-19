import { useState } from "react";
import { supabase } from "../supabaseClient";

function Suggestions() {
  const [message, setMessage] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase
      .from("suggestions")
      .insert({
        message,
        submitted_by: user.id,
        is_anonymous: isAnonymous,
      });

    if (error) {
      console.log("Suggestion error:", error.message);
      alert(error.message);
      return;
    }

    alert("Suggestion submitted!");

    setMessage("");
    setIsAnonymous(false);
  }

  return (
    <main className="page-layout">
      <section className="page-header">
        <h1>Suggestions Box</h1>

        <p>
          Share ideas, concerns, or recommendations to help improve the family fund project.
        </p>
      </section>

      <form className="feature-card" onSubmit={handleSubmit}>
        <label>Your Suggestion</label>

        <textarea
          rows="6"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={isAnonymous}
            onChange={(e) =>
              setIsAnonymous(e.target.checked)
            }
          />

          Submit anonymously
        </label>

        <button type="submit" className="primary-btn">
          Submit Suggestion
        </button>
      </form>
    </main>
  );
}

export default Suggestions;