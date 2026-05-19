import { Navigate } from "react-router-dom";

function AdminRoute({ profile, children }) {
  if (!profile || profile.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default AdminRoute;