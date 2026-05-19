import { useState } from "react";
import { supabase } from "../supabaseClient";

function CreateVote() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase.from("votes").insert({
      title,
      description,
      created_by: user.id,
    });

    if (error) {
      console.log("Vote creation error:", error.message);
      alert(error.message);
      return;
    }

    alert("Voting topic created!");

    setTitle("");
    setDescription("");
  }

  return (
    <main className="page-layout">
      <section className="page-header">
        <h1>Create Voting Topic</h1>
        <p>Create a proposal or question for family members to vote on.</p>
      </section>

      <form className="feature-card" onSubmit={handleSubmit}>
        <label>Voting Topic</label>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Example: Should we invest in the new business opportunity?"
        />

        <label>Description</label>

        <textarea
          rows="6"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add details, context, or instructions for this vote."
        />

        <button type="submit" className="primary-btn">
          Create Vote
        </button>
      </form>
    </main>
  );
}

export default CreateVote;