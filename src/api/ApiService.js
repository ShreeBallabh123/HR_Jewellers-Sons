/**
 * Abstract ApiService class representing the core request client.
 * In a real backend, this would encapsulate axios / fetch instances, base URLs, headers, and intercepts.
 */
class ApiService {
  static async request(url, options = {}) {
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `API error with status ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`ApiService Request Failed on ${url}:`, error);
      throw error;
    }
  }
}

export default ApiService;
