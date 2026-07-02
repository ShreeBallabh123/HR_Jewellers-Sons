/**
 * Debounce and Throttle utilities
 */

export function debounce(fn, waitMs) {
  let timeoutId;
  return function(...args) {
    const context = this;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn.apply(context, args);
    }, waitMs);
  };
}

export function throttle(fn, limitMs) {
  let inThrottle;
  return function(...args) {
    const context = this;
    if (!inThrottle) {
      fn.apply(context, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limitMs);
    }
  };
}
