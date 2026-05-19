function Dashboard() {
  return (
    <section className="page-layout">
      <div className="page-header">
        <p className="section-tag">Family Dashboard</p>

        <h1>Investment Overview</h1>

        <p>
          Monitor contributions, investment performance,
          long-term growth, and future financial planning.
        </p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Total Contributions</h3>

          <p className="dashboard-number">$8,450</p>

          <span>Updated monthly</span>
        </div>

        <div className="dashboard-card">
          <h3>Active Investments</h3>

          <p className="dashboard-number">14</p>

          <span>Diversified portfolio tracking</span>
        </div>

        <div className="dashboard-card">
          <h3>Projected Growth</h3>

          <p className="dashboard-number">+18%</p>

          <span>Estimated yearly growth target</span>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;