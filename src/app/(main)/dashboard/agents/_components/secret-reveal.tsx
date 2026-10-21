"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CodeBlock, CodeBlockActions, CodeBlockContent, CodeBlockCopyButton } from "@/components/ui/code-block";

/** A signing secret, shown once. The agent uses it to check that requests really come from GitCrew. */
export function SecretReveal({ secret }: { secret: string }) {
  return (
    <div className="flex flex-col gap-2">
      <Alert>
        <AlertTitle>Copy this secret now</AlertTitle>
        <AlertDescription>
          <p>
            Put it in your agent as <code>GITCREW_SECRET</code>. It won&apos;t be shown again; you can create a new one
            any time.
          </p>
        </AlertDescription>
      </Alert>
      <CodeBlock size="sm">
        <CodeBlockActions>
          <CodeBlockCopyButton value={secret} />
        </CodeBlockActions>
        <CodeBlockContent>{secret}</CodeBlockContent>
      </CodeBlock>
    </div>
  );
}
