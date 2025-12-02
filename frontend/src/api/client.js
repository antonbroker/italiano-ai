const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

if (!apiBaseUrl) {
  console.error("VITE_API_BASE_URL is not defined. Please set it in your .env file.");
  throw new Error("VITE_API_BASE_URL is not defined. Please set it in your .env file.");
}

const API_BASE_URL = apiBaseUrl.replace(/\/$/, "");

// Debug: log the API base URL in development
if (import.meta.env.DEV) {
  console.log("[API Client] Using API base URL:", API_BASE_URL);
}

async function request(path, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      credentials: "include",
      ...options,
    });

    if (!response.ok) {
      // For /auth/me, 401 is expected when not logged in - don't throw error
      if (path === "/auth/me" && response.status === 401) {
        return null;
      }
      
      const errorBody = await response.json().catch(() => ({}));
      const message = errorBody.message || `Request failed with status ${response.status}`;
      throw new Error(message);
    }

    if (response.status === 204) {
      return null;
    }

    // Check if response has content before parsing JSON
    const contentType = response.headers.get('content-type');
    const contentLength = response.headers.get('content-length');
    
    // If no content or content-length is 0, return null
    if (contentLength === '0' || !contentType?.includes('application/json')) {
      return null;
    }

    // Get response text first to handle empty responses
    const text = await response.text();
    
    // If empty, return null
    if (!text || text.trim() === '') {
      return null;
    }

    // Try to parse JSON
    try {
      return JSON.parse(text);
    } catch (parseError) {
      console.error('[API Client] Failed to parse JSON response:', parseError, 'Response text:', text);
      throw new Error('Invalid JSON response from server');
    }
  } catch (error) {
    // If it's already an Error with a message, re-throw it
    if (error instanceof Error && error.message) {
      throw error;
    }
    // Network errors or other fetch failures
    throw new Error(`Network error: ${error.message || 'Failed to connect to server'}`);
  }
}

export const apiClient = {
  auth: {
    me: () => request("/auth/me"),
    register: (payload) => request("/auth/register", { method: "POST", body: JSON.stringify(payload) }),
    login: (payload) => request("/auth/login", { method: "POST", body: JSON.stringify(payload) }),
    logout: () => request("/auth/logout", { method: "POST" }),
  },
  lessons: {
    list: () => request("/lessons"),
    getById: (id) => request(`/lessons/${id}`),
  },
  userProgress: {
    list: ({ userEmail, lessonId }) => {
      if (!userEmail) throw new Error("userEmail is required");
      const params = new URLSearchParams({ userEmail });
      if (lessonId) params.append("lessonId", lessonId);
      return request(`/user-progress?${params.toString()}`);
    },
    upsert: (payload) => request("/user-progress", { method: "POST", body: JSON.stringify(payload) }),
    update: (id, payload) => request(`/user-progress/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
  },
  chatMessages: {
    list: ({ userEmail, limit = 100 }) => {
      if (!userEmail) throw new Error("userEmail is required");
      const params = new URLSearchParams({ userEmail, limit: String(limit) });
      return request(`/chat-messages?${params.toString()}`);
    },
    create: (payload) => request("/chat-messages", { method: "POST", body: JSON.stringify(payload) }),
  },
};

