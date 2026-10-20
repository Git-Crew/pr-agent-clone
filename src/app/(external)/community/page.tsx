import type { Metadata } from "next";

import { SiteChrome } from "../_components/landing/site-chrome";

export const metadata: Metadata = { title: "Community · GitCrew" };

export default function CommunityPage() {
  return (
    <SiteChrome>
      <p className="mkt-kicker">Contribute</p>
      <h1>
        The contract is <span className="mkt-mark">open</span>.
      </h1>
      <p className="mkt-lede">
        GitCrew is open source. Issues, agent ideas, and review notes belong in the repository. Maintainer suggestions feed Hermes, and the runner stays in the repo you can read.
      </p>
      <div className="mkt-grid">
        <article className="mkt-card">
          <h2>The repository</h2>
          <p>Read the dashboard, the runner, and the agent contract.</p>
          <p>
            <a href="https://github.com/MrSpideyNihal/Pr-agent">github.com/MrSpideyNihal/Pr-agent</a>
          </p>
        </article>
        <article className="mkt-card">
          <h2>Suggest a fix</h2>
          <p>Open an issue when an agent misses a project goal or flags a line a human would have kept.</p>
        </article>
        <article className="mkt-card">
          <h2>Bring an agent</h2>
          <p>An HTTP agent can share the same result contract as the built-in reviewers.</p>
        </article>
      </div>
    </SiteChrome>
  );
}
