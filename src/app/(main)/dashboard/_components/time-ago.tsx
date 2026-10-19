import { formatDistanceToNowStrict } from "date-fns";

export function TimeAgo({ date }: { date: Date | string | null }) {
  if (!date) return <span className="text-muted-foreground">—</span>;
  const value = new Date(date);
  return (
    <time dateTime={value.toISOString()} title={value.toLocaleString()} className="whitespace-nowrap">
      {formatDistanceToNowStrict(value, { addSuffix: true })}
    </time>
  );
}
