export interface Project {
  id: string;
  name: string;
  color: string; // Tailwind bg- class or hex
}

export interface Task {
  id: string;
  title: string;
  projectId?: string;
  dueDate?: string;
  priority: 'High' | 'Medium' | 'Low';
  completed: boolean;
  starred: boolean;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  projectId?: string;
  tags: string[];
  pinned: boolean;
  archived: boolean;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  isSystemAction?: boolean;
  actionDetails?: string;
}
