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
