// GitHub only accepts inline review comments on lines that appear in the PR diff. This maps each file's `patch`
// (from GET /pulls/{n}/files) to the new-file line numbers that can carry a comment on the RIGHT side:
// added lines and unchanged context lines inside a hunk.

const HUNK_HEADER = /^@@ -\d+(?:,\d+)? \+(\d+)(?:,\d+)? @@/;

export function commentableLines(patch: string | undefined): Set<number> {
  const lines = new Set<number>();
  if (!patch) return lines;

  let newLine = 0;
  let inHunk = false;
  for (const raw of patch.split("\n")) {
    const header = HUNK_HEADER.exec(raw);
    if (header) {
      newLine = Number(header[1]);
      inHunk = true;
      continue;
    }
    if (!inHunk) continue;
    const marker = raw[0];
    if (marker === "+" || marker === " ") {
      lines.add(newLine);
      newLine++;
    }
    // "-" lines only exist on the LEFT side; "\ No newline at end of file" is metadata; "" is a trailing newline.
  }
  return lines;
}

export type DiffIndex = Map<string, Set<number>>;

export function buildDiffIndex(files: { filename: string; patch?: string }[]): DiffIndex {
  return new Map(files.map((file) => [file.filename, commentableLines(file.patch)]));
}
