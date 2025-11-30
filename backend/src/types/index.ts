export type LessonLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Lesson {
  id: string;
  title: string;
  description: string | null;
  level: LessonLevel;
  topics: string[];
  duration: string | null;
  content: string | null;
  createdAt: string;
  updatedAt: string;
}

export type ChatRole = 'user' | 'tutor';

export interface ChatMessage {
  id: string;
  userEmail: string;
  message: string;
  role: ChatRole;
  lessonId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UserProgress {
  id: string;
  userEmail: string;
  lessonId: string;
  completed: boolean;
  progressPercentage: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  avatarUrl: string | null;
  createdAt: string;
}

