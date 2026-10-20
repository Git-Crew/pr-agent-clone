import type { Metadata } from "next";

import { SiteChrome } from "../_components/landing/site-chrome";

export const metadata: Metadata = { title: "Docs · GitCrew" };

const docs = [
  ["Install", "Add the GitHub App, then pick which agents run on each repository."],
  ["On a pull request", "An agent reads the diff, posts a review, and completes its check run."],
  ["Your runner", "Checkout agents run in GitHub Actions in your repo. Fork pull requests stay read-only."],
];

export default function DocsPage() {
  return (
    <SiteChrome>
      <p className="mkt-kicker">Docs</p>
      <h1>
        Start with the <span className="mkt-mark">App</span>.
      </h1>
      <div className="mkt-grid">
        {docs.map(([title, copy]) => (
          <article key={title} className="mkt-card">
            <h2>{title}</h2>
            <p>{copy}</p>
          </article>
        ))}
      </div>
    </SiteChrome>
  );
}
