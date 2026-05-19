import "./Admin.css";
import { Link } from "react-router-dom";

function Admin() {
  return (
    <main className="admin-page">
      <section className="admin-header">
        <p className="eyebrow">Admin Access</p>
        <h1>Admin Panel</h1>
        <p>
          Manage family fund tools, documents, announcements, voting, and member
          access.
        </p>
      </section>

      <section className="admin-grid">
        <Link to="/admin/users" className="admin-card-link">
          <div className="admin-card">
            <h2>Manage Users</h2>
            <p>View members, assign roles, and manage access.</p>
          </div>
        </Link>

        <Link to="/admin/upload-document" className="admin-card-link">
          <div className="admin-card">
            <h2>Documents</h2>
            <p>Upload fund documents, charters, meeting notes, and reports.</p>
          </div>
        </Link>

        <Link to="/admin/create-announcement" className="admin-card-link">
          <div className="admin-card">
            <h2>Announcements</h2>
            <p>
              Create updates for meetings, fund changes, and family decisions.
            </p>
          </div>
        </Link>

        <Link to="/admin/create-vote" className="admin-card-link">
          <div className="admin-card">
            <h2>Voting</h2>
            <p>Create private voting topics for family fund decisions.</p>
          </div>
        </Link>

        <Link to="/admin/review-suggestions" className="admin-card-link">
          <div className="admin-card">
            <h2>Suggestions</h2>
            <p>Review submitted ideas and feedback from family members.</p>
          </div>
        </Link>
      </section>
    </main>
  );
}

export default Admin;
