/**
 * Format dates according to the following rules:
 * - If date is within the last 3 months: show as "24th May"
 * - If date is older than 3 months but within a year: show as "in January"
 * - If date is more than a year ago: show as "1 year ago" or "X years ago"
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();

  // Check if date is valid
  if (isNaN(date.getTime())) {
    return "";
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayOfMonth = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const currentYear = now.getFullYear();

  // Calculate difference in months
  const monthDiff = now.getMonth() - month + 12 * (currentYear - year);

  // If within last 3 months
  if (monthDiff < 3 && currentYear === year) {
    // Add ordinal suffix to day number
    const ordinal = getOrdinalSuffix(dayOfMonth);
    return `${dayOfMonth}${ordinal} ${monthNames[month]}`;
  }
  // If within last year but more than 3 months ago
  else if (monthDiff < 12) {
    return `in ${monthNames[month]}`;
  }
  // More than a year ago
  else {
    const yearDiff = Math.floor(monthDiff / 12);
    return yearDiff === 1 ? "1 year ago" : `${yearDiff} years ago`;
  }
}

/**
 * Return the ordinal suffix for a number (e.g., 1st, 2nd, 3rd, 4th)
 */
function getOrdinalSuffix(day: number): string {
  if (day > 3 && day < 21) return "th";

  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}
