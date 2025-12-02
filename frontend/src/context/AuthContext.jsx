import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { apiClient } from "@/api/client";

const AuthContext = createContext({
  user: null,
  isLoading: true,
  lessons: [],
  progress: [],
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  refreshUser: async () => {},
  refreshLessons: async () => {},
  refreshProgress: async () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lessons, setLessons] = useState([]);
  const [progress, setProgress] = useState([]);

  const refreshUser = useCallback(async () => {
    try {
      const data = await apiClient.auth.me();
      setUser(data);
      return data;
    } catch {
      setUser(null);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshLessons = useCallback(async () => {
    try {
      const data = await apiClient.lessons.list();
      setLessons(data || []);
      return data || [];
    } catch (error) {
      console.error('[AuthContext] Error loading lessons:', error);
      setLessons([]);
      return [];
    }
  }, []);

  const refreshProgress = useCallback(async (userEmail) => {
    if (!userEmail) {
      setProgress([]);
      return [];
    }
    try {
      const data = await apiClient.userProgress.list({ userEmail });
      setProgress(data || []);
      return data || [];
    } catch (error) {
      console.error('[AuthContext] Error loading progress:', error);
      setProgress([]);
      return [];
    }
  }, []);

  const loadUserData = useCallback(async (userData) => {
    if (!userData) {
      setLessons([]);
      setProgress([]);
      return;
    }

    // Load lessons and progress in parallel
    await Promise.all([
      refreshLessons(),
      refreshProgress(userData.email),
    ]);
  }, [refreshLessons, refreshProgress]);

  useEffect(() => {
    refreshUser().then((userData) => {
      if (userData) {
        loadUserData(userData);
      }
    });
  }, [refreshUser, loadUserData]);

  const login = async (credentials) => {
    const userData = await apiClient.auth.login(credentials);
    if (userData) {
      setUser(userData);
      setIsLoading(false);
      // Automatically load lessons and progress after login
      await loadUserData(userData);
    } else {
      // If login didn't return user, refresh to get it
      const refreshedUser = await refreshUser();
      if (refreshedUser) {
        await loadUserData(refreshedUser);
      }
    }
  };

  const register = async (payload) => {
    const userData = await apiClient.auth.register(payload);
    if (userData) {
      setUser(userData);
      setIsLoading(false);
      // Automatically load lessons and progress after registration
      await loadUserData(userData);
    } else {
      // If register didn't return user, refresh to get it
      const refreshedUser = await refreshUser();
      if (refreshedUser) {
        await loadUserData(refreshedUser);
      }
    }
  };

  const logout = async () => {
    await apiClient.auth.logout();
    setUser(null);
    setLessons([]);
    setProgress([]);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      lessons, 
      progress,
      login, 
      register, 
      logout, 
      refreshUser,
      refreshLessons,
      refreshProgress,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

