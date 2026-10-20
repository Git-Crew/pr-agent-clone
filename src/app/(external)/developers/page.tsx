import type { Metadata } from "next";

import { SiteChrome } from "../_components/landing/site-chrome";

export const metadata: Metadata = { title: "Developers · GitCrew" };

export default function DevelopersPage() {
  return (
    <SiteChrome>
      <p className="mkt-kicker">Developers</p>
      <h1>
        Built for the <span className="mkt-mark">pull request</span>.
      </h1>
      <div className="mkt-grid">
        <article id="why" className="mkt-card">
          <h2>Why we built</h2>
          <p>
            Reviews were filling up with generated filler, tint, emoji, and diffs a human would not have written. GitCrew puts a reviewer on the pull request your team already opened.
          </p>
        </article>
        <article id="how" className="mkt-card">
          <h2>How we're working</h2>
          <p>
            One GitHub App. Agents run in GitHub Actions inside your repository, post a review, and finish a check run. Fork pull requests never get write access.
          </p>
        </article>
        <article className="mkt-card">
          <h2>The contract</h2>
          <p>
            Built-in agents and your own HTTP agents share one result. The dashboard, the runner, and the contract live in the open repository.
          </p>
          <p>
            <a href="https://github.com/MrSpideyNihal/Pr-agent">View the source</a>
          </p>
        </article>
      </div>
    </SiteChrome>
  );
}
