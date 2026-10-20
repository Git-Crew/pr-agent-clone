import type { Metadata } from "next";

import { SiteChrome } from "../_components/landing/site-chrome";

export const metadata: Metadata = { title: "Pricing · GitCrew" };

const tiers = [
  ["Starter", "$0", "The open source agents, on the pull requests you already open."],
  ["Team", "Together", "Every agent on one contract, managed and billed as a single allowance."],
  ["Scale", "Custom", "The same review contract, with a larger allowance for the repos that need it."],
];

export default function PricingPage() {
  return (
    <SiteChrome>
      <p className="mkt-kicker">Pricing</p>
      <h1>
        Multiple agents, <span className="mkt-mark">one bill</span>.
      </h1>
      <p className="mkt-lede">
        Install the GitHub App once. AntiSlop, Hermes, OpenClaw, Grokbot, OpenAI Dots, and Ponytail run on the same contract, and the managed allowance is billed together.
      </p>
      <div className="mkt-grid">
        {tiers.map(([name, price, copy]) => (
          <article key={name} className="mkt-card">
            <p className="mkt-kicker">{name}</p>
            <h2 style={{ marginTop: 12 }}>{price}</h2>
            <p>{copy}</p>
          </article>
        ))}
      </div>
    </SiteChrome>
  );
}
