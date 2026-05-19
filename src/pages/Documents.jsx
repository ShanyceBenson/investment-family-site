import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

function Documents() {
  const [documents, setDocuments] = useState([]);

  async function viewDocument(filePath) {
  const { data, error } = await supabase.storage
    .from("fund-documents")
    .createSignedUrl(filePath, 60 * 60);

  if (error) {
    console.log("View document error:", error.message);
    alert(error.message);
    return;
  }

  window.open(data.signedUrl, "_blank");
}

  useEffect(() => {
    async function fetchDocuments() {
      const { data, error } = await supabase
        .from("documents")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.log("Document error:", error.message);
        return;
      }

      setDocuments(data);
    }

    fetchDocuments();
  }, []);

  return (
    <main className="page-layout">
      <section className="page-header">
        <h1>Document Library</h1>
        <p>
          Access family fund documents, meeting notes, reports, and governance
          files.
        </p>
      </section>

      <div className="documents-table">
        <div className="document-row heading">
          <span>Document</span>
          <span>Category</span>
          <span>Access</span>
        </div>

        {documents.map((doc) => (
          <div className="document-row" key={doc.id}>
            <span>{doc.title}</span>

            <span>{doc.category || "General"}</span>

            <span>
              <button onClick={() => viewDocument(doc.file_url)}>
                View Document
              </button>
            </span>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Documents;
