import { useState } from "react";
import { supabase } from "../supabaseClient";

function UploadDocument() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);

  async function handleUpload(e) {
    e.preventDefault();

    if (!file) {
      alert("Please choose a file.");
      return;
    }

    const filePath = `${Date.now()}-${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from("fund-documents")
      .upload(filePath, file);

    if (uploadError) {
      console.log("Upload error:", uploadError.message);
      alert(uploadError.message);
      return;
    }

    const { data: urlData, error: signedUrlError } = await supabase.storage
      .from("fund-documents")
      .createSignedUrl(filePath, 60 * 60);

    if (signedUrlError) {
      console.log("Signed URL error:", signedUrlError.message);
      alert(signedUrlError.message);
      return;
    }

    const { error: dbError } = await supabase.from("documents").insert({
      title,
      category,
      file_url: filePath,
    });

    if (dbError) {
      console.log("Database error:", dbError.message);
      alert(dbError.message);
      return;
    }

    alert("Document uploaded!");
    setTitle("");
    setCategory("");
    setFile(null);
  }

  return (
    <main className="page-layout">
      <section className="page-header">
        <h1>Upload Document</h1>
        <p>Add fund documents, meeting notes, charters, or reports.</p>
      </section>

      <form className="feature-card" onSubmit={handleUpload}>
        <label>Document Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <label>File</label>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />

        <button type="submit" className="primary-btn">
          Upload Document
        </button>
      </form>
    </main>
  );
}

export default UploadDocument;
