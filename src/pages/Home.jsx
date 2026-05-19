function Home() {
  return (
    <>
      <main className="hero">
        <section className="hero-content">
          <p className="eyebrow">Private Family Investment Hub</p>

          <h1>
            Organize, track, and grow our family investment fund together.
          </h1>

          <p className="hero-text">
            A secure space for investment dashboards, family documents,
            announcements, and future investment planning.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn">View Dashboard</button>

            <button className="secondary-btn">View Documents</button>
          </div>
        </section>

        <section className="hero-card">
          <h2>Phase 1</h2>

          <p className="amount">Build Charter</p>

          <p>target 3 Months</p>
        </section>
      </main>

      <section className="mission-section">
        <div className="mission-grid">
          <div className="mission-card">
            <p className="section-tag">Mission Statement</p>

            <h2>Build, protect, and sustain multi-generational wealth.</h2>

            <p>
              The Family Fund Project exists to build, protect, and sustain
              multi-generational wealth through a structured and collaborative
              financial system. By pooling resources, promoting accountability,
              and making strategic long-term decisions, the fund is designed to
              create financial stability, opportunity, and legacy for current
              and future generations of the family.
            </p>
          </div>

          <div className="vision-card">
            <p className="section-tag">Vision Statement</p>

            <h2>Establish a lasting family financial institution.</h2>

            <p>
              To establish a lasting family financial institution that empowers
              generations through unity, disciplined wealth building, and shared
              ownership evolving into a legally structured entity that preserves
              the family’s assets, values, and financial independence for
              decades to come.
            </p>
          </div>
        </div>
      </section>

      {/* <section className="dashboard-preview">
        <div className="section-header">
          <p className="section-tag">Investment Overview</p>

          <h2>Track fund performance and family contributions.</h2>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Total Contributions</h3>

            <p className="dashboard-number">$8,450</p>

            <span>+12% this quarter</span>
          </div>

          <div className="dashboard-card">
            <h3>Active Investments</h3>

            <p className="dashboard-number">14</p>

            <span>Stocks, ETFs, and real estate</span>
          </div>
        </div>
      </section> */}
      <section className="timeline-section">
        <div className="section-header">
          <p className="section-tag">Family Growth Plan</p>

          <h2>Long-term financial milestones.</h2>
        </div>

        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-dot"></div>

            <div className="timeline-content">
              <span>Phase 1</span>

              <h3>Build the Family Fund Charter</h3>

              <p>
                Establish the foundation, governance structure, contribution
                expectations, accountability standards, and long-term vision for
                the Family Fund Project.
              </p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot"></div>

            <div className="timeline-content">
              <span>Phase 2</span>

              <h3>Reach $25,000 Collective Fund Goal</h3>

              <p>
                Build the initial investment pool through structured
                contributions and collaborative family participation.
              </p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot"></div>

            <div className="timeline-content">
              <span>Phase 3</span>

              <h3>Expand to $50,000+</h3>

              <p>
                Increase investment diversification, strategic growth, and
                long-term financial planning opportunities.
              </p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot"></div>

            <div className="timeline-content">
              <span>Future Vision</span>

              <h3>Transition Into a Formal Legal Entity</h3>

              <p>
                Evolve the Family Fund Project into a legally structured
                organization designed to preserve family assets, strengthen
                governance, protect future generations, and sustain long-term
                financial independence.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
