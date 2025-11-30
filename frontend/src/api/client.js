const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

if (!apiBaseUrl) {
  throw new Error("VITE_API_BASE_URL is not defined. Please set it in your .env file.");
}

const API_BASE_URL = apiBaseUrl.replace(/\/$/, "");

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    credentials: "include",
    ...options,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    const message = errorBody.message || "Request failed";
    throw new Error(message);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
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

