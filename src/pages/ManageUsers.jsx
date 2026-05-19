import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

function ManageUsers() {
  const [users, setUsers] = useState([]);

  async function updateRole(userId, newRole) {
  const { error } = await supabase
    .from("profiles")
    .update({ role: newRole })
    .eq("id", userId);

  if (error) {
    console.log("Role update error:", error.message);
    return;
  }

  setUsers((prevUsers) =>
    prevUsers.map((user) =>
      user.id === userId
        ? { ...user, role: newRole }
        : user
    )
  );
}

  useEffect(() => {
    async function fetchUsers() {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.log("Error loading users:", error.message);
        return;
      }

      setUsers(data);
    }

    fetchUsers();
  }, []);

  return (
    <main className="page-layout">
      <section className="page-header">
        <h1>Manage Users</h1>
        <p>View family members and their current access roles.</p>
      </section>

      <div className="feature-card">
        {users.map((user) => (
          <div key={user.id}>
            <h3>{user.full_name || "No name added"}</h3>
            <p>{user.email}</p>
            <select
              value={user.role}
              onChange={(e) => updateRole(user.id, e.target.value)}
            >
              <option value="viewer">Viewer</option>
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select>
            <hr />
          </div>
        ))}
      </div>
    </main>
  );
}

export default ManageUsers;
