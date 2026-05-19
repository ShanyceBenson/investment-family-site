import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

function Voting() {
  const [votes, setVotes] = useState([]);
  const [userId, setUserId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
  getCurrentUser();
  fetchVotes();
}, []);

async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  setUserId(user.id);

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role === "admin") {
    setIsAdmin(true);
  }
}

async function fetchVotes() {
  const { data, error } = await supabase
    .from("votes")
    .select("*, vote_responses(*)")
    .order("created_at", { ascending: false });

  if (error) {
    console.log("Vote fetch error:", error.message);
    return;
  }

  setVotes(data);
}

async function toggleVoteStatus(voteId, currentStatus) {
  const newStatus = currentStatus === "active" ? "closed" : "active";

  const { error } = await supabase
    .from("votes")
    .update({ status: newStatus })
    .eq("id", voteId);

  if (error) {
    console.log("Status update error:", error.message);
    alert(error.message);
    return;
  }

  fetchVotes();
}

async function deleteVote(voteId) {
  const { error } = await supabase
    .from("votes")
    .delete()
    .eq("id", voteId);

  if (error) {
    console.log("Delete vote error:", error.message);
    alert(error.message);
    return;
  }

  fetchVotes();
}

  return (
    <main className="page-layout">
      <section className="page-header">
        <h1>Voting Center</h1>

        <p>Participate in family fund proposals and governance decisions.</p>
      </section>

      <section className="announcement-grid">
        {votes.map((vote) => {
          const yesVotes =
            vote.vote_responses?.filter(
              (response) => response.response === "Yes",
            ).length || 0;

          const noVotes =
            vote.vote_responses?.filter(
              (response) => response.response === "No",
            ).length || 0;

          const userVote = vote.vote_responses?.find(
            (response) => response.user_id === userId,
          );

          const totalVotes = yesVotes + noVotes;

          const yesPercentage =
            totalVotes > 0 ? Math.round((yesVotes / totalVotes) * 100) : 0;

          const noPercentage =
            totalVotes > 0 ? Math.round((noVotes / totalVotes) * 100) : 0;

          return (
            <article className="announcement-card" key={vote.id}>
              <span className="announcement-date">
                {new Date(vote.created_at).toLocaleDateString()}
              </span>

              <h3>{vote.title}</h3>

              <p>{vote.description}</p>

              {vote.status === "closed" ? (
                <div className="already-voted closed-vote">Voting Closed</div>
              ) : userVote ? (
                <div className="already-voted">
                  You already voted: <strong>{userVote.response}</strong>
                </div>
              ) : (
                <div className="vote-buttons">
                  <button
                    className="primary-btn"
                    onClick={() => submitVote(vote.id, "Yes")}
                  >
                    Yes
                  </button>

                  <button
                    className="secondary-btn"
                    onClick={() => submitVote(vote.id, "No")}
                  >
                    No
                  </button>
                </div>
              )}

              <div className="vote-results">
                <p>
                  Yes: {yesVotes} vote
                  {yesVotes !== 1 ? "s" : ""} — {yesPercentage}%
                </p>

                <div className="vote-bar">
                  <div
                    className="vote-fill yes-fill"
                    style={{ width: `${yesPercentage}%` }}
                  ></div>
                </div>

                <p>
                  No: {noVotes} vote
                  {noVotes !== 1 ? "s" : ""} — {noPercentage}%
                </p>

                <div className="vote-bar">
                  <div
                    className="vote-fill no-fill"
                    style={{ width: `${noPercentage}%` }}
                  ></div>
                </div>

                <p className="total-votes">Total Votes: {totalVotes}</p>
              </div>
              {isAdmin && (
                <div className="admin-vote-controls">
                  <button
                    className="secondary-btn"
                    onClick={() => toggleVoteStatus(vote.id, vote.status)}
                  >
                    {vote.status === "active" ? "Close Vote" : "Reopen Vote"}
                  </button>

                  <button
                    className="primary-btn"
                    onClick={() => deleteVote(vote.id)}
                  >
                    Delete Vote
                  </button>
                </div>
              )}
            </article>
          );
        })}
      </section>
    </main>
  );
}

export default Voting;
