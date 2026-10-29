/**
 * Parses a front-matter date. Accepts ISO dates (2025-06-30) and forgives
 * day/month swaps (2025-16-10 → 16 Oct 2025), which happen when writing by hand.
 */
export function parseDate(value: string): Date | null {
  const match = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(value.trim());
  if (match) {
    let [, y, a, b] = match.map(Number);
    if (a > 12 && b <= 12) [a, b] = [b, a];
    const date = new Date(Date.UTC(y, a - 1, b));
    return date.getUTCMonth() === a - 1 ? date : null;
  }
  const date = new Date(value);
  return isNaN(date.getTime()) ? null : date;
}

const full = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

const short = new Intl.DateTimeFormat("en-GB", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

/** "16 October 2025" */
export const formatDate = (date: Date) => full.format(date);

/** "Oct 2025" */
export const formatMonth = (date: Date) => short.format(date);
