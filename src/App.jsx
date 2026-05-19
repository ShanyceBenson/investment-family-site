import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminRoute from "./components/AdminRoute";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Documents from "./pages/Documents";
import Announcements from "./pages/Announcements";
import Voting from "./pages/Voting";
import Suggestions from "./pages/Suggestions";
import Admin from "./pages/Admin";
import ManageUsers from "./pages/ManageUsers";
import UploadDocument from "./pages/UploadDocument";
import CreateAnnouncement from "./pages/CreateAnnouncement";
import ReviewSuggestions from "./pages/ReviewSuggestions";
import CreateVote from "./pages/CreateVote";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

function App() {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  async function getProfile(userId) {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      console.log("FULL PROFILE ERROR:", error);
      return;
    }

    setProfile(data);
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        getProfile(session.user.id);
      } else {
        setProfile(null);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        getProfile(session.user.id);
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar
          session={session}
          profile={profile}
          handleLogout={handleLogout}
        />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute session={session}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/documents"
            element={
              <ProtectedRoute session={session}>
                <Documents />
              </ProtectedRoute>
            }
          />
          <Route
            path="/announcements"
            element={
              <ProtectedRoute session={session}>
                <Announcements />
              </ProtectedRoute>
            }
          />
          <Route
            path="/voting"
            element={
              <ProtectedRoute session={session}>
                <Voting />
              </ProtectedRoute>
            }
          />
          <Route
            path="/suggestions"
            element={
              <ProtectedRoute session={session}>
                <Suggestions />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute session={session}>
                <AdminRoute profile={profile}>
                  <Admin />
                </AdminRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute session={session}>
                <AdminRoute profile={profile}>
                  <ManageUsers />
                </AdminRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/upload-document"
            element={
              <ProtectedRoute session={session}>
                <AdminRoute profile={profile}>
                  <UploadDocument />
                </AdminRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/create-announcement"
            element={
              <ProtectedRoute session={session}>
                <AdminRoute profile={profile}>
                  <CreateAnnouncement />
                </AdminRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/review-suggestions"
            element={
              <ProtectedRoute session={session}>
                <AdminRoute profile={profile}>
                  <ReviewSuggestions />
                </AdminRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/create-vote"
            element={
              <ProtectedRoute session={session}>
                <AdminRoute profile={profile}>
                  <CreateVote />
                </AdminRoute>
              </ProtectedRoute>
            }
          />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
