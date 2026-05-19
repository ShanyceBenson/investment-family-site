import { useState } from "react";
import { supabase } from "../supabaseClient";

function CreateAnnouncement() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase
      .from("announcements")
      .insert({
        title,
        content,
        created_by: user.id,
      });

    if (error) {
      console.log("Announcement error:", error.message);
      alert(error.message);
      return;
    }

    alert("Announcement created!");

    setTitle("");
    setContent("");
  }

  return (
    <main className="page-layout">
      <section className="page-header">
        <h1>Create Announcement</h1>
        <p>Post important updates for family fund members.</p>
      </section>

      <form className="feature-card" onSubmit={handleSubmit}>
        <label>Announcement Title</label>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Announcement Content</label>

        <textarea
          rows="6"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button type="submit" className="primary-btn">
          Publish Announcement
        </button>
      </form>
    </main>
  );
}

export default CreateAnnouncement;