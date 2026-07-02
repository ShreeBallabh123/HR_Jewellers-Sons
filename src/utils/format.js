/**
 * Formatting utilities
 */

/** Format currency value in INR locale styling */
export function formatINR(amount) {
  if (amount === undefined || amount === null || isNaN(amount)) return '₹ 0';
  return `₹ ${Math.round(amount).toLocaleString('en-IN')}`;
}

/** Format weight to fixed precision */
export function formatWeight(grams) {
  const num = parseFloat(grams);
  if (isNaN(num)) return '0g';
  return `${num.toFixed(3)}g`;
}

/** Format date string for localized standard display */
export function formatDisplayDate(dateVal) {
  if (!dateVal) return '';
  const date = new Date(dateVal);
  if (isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}
