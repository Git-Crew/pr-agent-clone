import type { Metadata } from "next";

import { LandingPage } from "./_components/landing/landing-page";

export const metadata: Metadata = {
  title: "GitCrew · Highly customized agents on every pull request",
  description:
    "GitCrew is open source. Install a GitHub App and run AntiSlop, Hermes, OpenClaw, Grokbot, OpenAI Dots, and Ponytail on the pull requests your team already opens.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return <LandingPage />;
}
