import { Link } from "react-router-dom";
import flogo from "../assets/flogo.png";

function Navbar({ session, profile, handleLogout }) {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={flogo} alt="Family Legacy Logo" />
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>

        {!session ? (
          <Link to="/login">Login</Link>
        ) : (
          <>
            <Link to="/dashboard">Dashboard</Link>
            {profile?.role === "admin" && <Link to="/admin">Admin</Link>}
            <Link to="/documents">Documents</Link>
            <Link to="/announcements">Announcements</Link>
            <Link to="/voting">Voting</Link>
            <Link to="/suggestions">Suggestions</Link>

            {profile?.role && <span className="user-role">{profile.role}</span>}

            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
