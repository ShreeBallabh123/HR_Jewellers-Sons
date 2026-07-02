/**
 * Input sanitization utilities
 */

/** Escape HTML special characters to prevent XSS injection */
export function escHtml(str) {
  if (typeof str !== 'string') return '';
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return str.replace(/[&<>"']/g, char => map[char]);
}

/** Sanitize URL to ensure safety */
export function sanitizeUrl(url) {
  if (typeof url !== 'string') return '#';
  const trimmed = url.trim();
  if (/^(https?:\/\/|\/|#)/i.test(trimmed)) return trimmed;
  return '#';
}

/** Sanitize phone — keep only digits and leading plus if present */
export function sanitizePhone(phone) {
  if (typeof phone !== 'string') return '';
  return phone.replace(/[^0-9+]/g, '').trim();
}
