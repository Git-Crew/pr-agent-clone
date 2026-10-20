import type { Metadata } from "next";

import { SiteChrome } from "../_components/landing/site-chrome";

export const metadata: Metadata = { title: "Blog · GitCrew" };

const posts = [
  ["The slop score", "How AntiSlop reads tint, emoji, and redundant code on a diff."],
  ["One contract", "Why Hermes, OpenClaw, and Grokbot share a review and a check run."],
  ["Fork safety", "What the runner is allowed to touch, and what it never writes."],
];

export default function BlogPage() {
  return (
    <SiteChrome>
      <p className="mkt-kicker">Blog</p>
      <h1>
        Notes from the <span className="mkt-mark">review</span>.
      </h1>
      <div className="mkt-grid">
        {posts.map(([title, copy]) => (
          <article key={title} className="mkt-card">
            <h2>{title}</h2>
            <p>{copy}</p>
          </article>
        ))}
      </div>
    </SiteChrome>
  );
}
