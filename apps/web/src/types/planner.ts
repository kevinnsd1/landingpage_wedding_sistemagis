export type TaskPriority = 'low' | 'medium' | 'high';
export type ColumnId = 'todo' | 'in_progress' | 'done';

export interface PlannerColumn {
  id: ColumnId;
  title: string;
  order: number;
}

export interface PlannerTask {
  id: string;
  weddingId: string;
  columnId: ColumnId;
  title: string;
  description?: string;
  priority: TaskPriority;
  category: string;
  dueDate?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export type MilestoneCategory = 'ceremony' | 'traditional' | 'meeting' | 'deadline' | 'other';

export interface WeddingMilestone {
  id: string;
  weddingId: string;
  title: string;
  date: string; // YYYY-MM-DD
  time?: string; // HH:mm
  venue?: string;
  category: MilestoneCategory;
  description?: string;
  isCompleted: boolean;
  createdAt?: string;
  updatedAt?: string;
}

