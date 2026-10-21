import { BRAND } from "@/config/app-config";
import type { ReviewComment, ReviewInput } from "@/lib/github/client";

import type { AgentComment, AgentResult } from "./contract";
import type { DiffIndex } from "./diff";

// Turn an AgentResult into one PR review. Comments on lines inside the diff become inline comments (GitHub rejects
// the whole review with 422 if any inline comment points outside the diff); the rest are listed in the review body.

export type BuiltReview = { review: ReviewInput | null; inline: number; outside: number };

export function buildReview(params: {
  agentName: string;
  result: AgentResult;
  diff: DiffIndex;
  headSha: string;
  maxComments: number;
  runUrl: string;
  /** "request_changes" asks for changes when the agent failed; otherwise the review is a comment. */
  reviewMode?: "comment" | "request_changes";
}): BuiltReview {
  const { agentName, result, diff, headSha, maxComments, runUrl } = params;
  const event =
    params.reviewMode === "request_changes" && result.conclusion === "failure" ? "REQUEST_CHANGES" : "COMMENT";
  const footer = `<sub>Posted by ${BRAND} · [run details](${runUrl})</sub>`;

  if (result.comments.length === 0) {
    // A clean pass stays quiet; a reply without line comments (e.g. plain text) is posted as a summary.
    if (result.conclusion === "success" || !result.summary.trim()) return { review: null, inline: 0, outside: 0 };
    const body = [`### ${agentName}`, "", result.title, "", result.summary, "", footer].join("\n");
    return { review: { commit_id: headSha, event, body, comments: [] }, inline: 0, outside: 0 };
  }

  const inline: ReviewComment[] = [];
  const outside: AgentComment[] = [];
  const seen = new Set<string>();

  for (const comment of result.comments) {
    const key = `${comment.path}:${comment.line}:${comment.body}`;
    if (seen.has(key)) continue;
    seen.add(key);
    if (inline.length < maxComments && diff.get(comment.path)?.has(comment.line)) {
      inline.push({ path: comment.path, line: comment.line, side: "RIGHT", body: comment.body });
    } else {
      outside.push(comment);
    }
  }

  const body = [`### ${agentName}`, "", result.title];
  if (outside.length > 0) {
    body.push(
      "",
      `<details><summary>${outside.length} more finding${outside.length === 1 ? "" : "s"} outside the diff or over the inline limit</summary>`,
      "",
    );
    for (const comment of outside.slice(0, 100)) {
      const firstLine = comment.body.split("\n")[0];
      body.push(`- \`${comment.path}:${comment.line}\` ${firstLine}`);
    }
    if (outside.length > 100) body.push(`- …and ${outside.length - 100} more`);
    body.push("", "</details>");
  }
  body.push("", footer);

  return {
    review: { commit_id: headSha, event, body: body.join("\n"), comments: inline },
    inline: inline.length,
    outside: outside.length,
  };
}
