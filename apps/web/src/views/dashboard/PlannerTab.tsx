import React, { useState } from 'react';
import {
  CheckSquare,
  Plus,
  Calendar,
  Clock,
  Trash2,
  Edit2,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { Wedding } from '@/types/wedding';
import { PlannerTask, ColumnId, TaskPriority } from '@/types/planner';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { plannerTaskSchema } from '@/schemas/validation';

export interface PlannerTabProps {
  wedding: Wedding;
  tasks: PlannerTask[];
  onAddTask: (task: Omit<PlannerTask, 'id' | 'weddingId' | 'order' | 'createdAt' | 'updatedAt'>) => void;
  onUpdateTask: (task: PlannerTask) => void;
  onDeleteTask: (id: string) => void;
  onShowToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

export function PlannerTab({
  wedding,
  tasks,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
  onShowToast,
}: PlannerTabProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<PlannerTask | null>(null);

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [category, setCategory] = useState('Umum');
  const [dueDate, setDueDate] = useState('');
  const [columnId, setColumnId] = useState<ColumnId>('todo');
  const [formError, setFormError] = useState('');

  const columns: { id: ColumnId; title: string; subtitle: string; bg: string; border: string }[] = [
    {
      id: 'todo',
      title: 'Akan Dikerjakan',
      subtitle: 'Daftar persiapan awal',
      bg: 'bg-neutral-50/80',
      border: 'border-neutral-200',
    },
    {
      id: 'in_progress',
      title: 'Sedang Berjalan',
      subtitle: 'Dalam proses komunikasi/eksekusi',
      bg: 'bg-slate-50/80',
      border: 'border-slate-200/80',
    },
    {
      id: 'done',
      title: 'Selesai',
      subtitle: 'Tugas yang telah beres',
      bg: 'bg-emerald-50/50',
      border: 'border-emerald-200/70',
    },
  ];

  const openAddModal = (targetColumn: ColumnId = 'todo') => {
    setEditingTask(null);
    setTitle('');
    setDescription('');
    setPriority('medium');
    setCategory('Umum');
    setDueDate('');
    setColumnId(targetColumn);
    setFormError('');
    setIsModalOpen(true);
  };

  const openEditModal = (task: PlannerTask) => {
    setEditingTask(task);
    setTitle(task.title);
    setDescription(task.description || '');
    setPriority(task.priority);
    setCategory(task.category);
    setDueDate(task.dueDate || '');
    setColumnId(task.columnId);
    setFormError('');
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    const validation = plannerTaskSchema.safeParse({
      title,
      description,
      priority,
      category,
      dueDate,
      columnId,
    });

    if (!validation.success) {
      setFormError(validation.error.errors[0]?.message || 'Input tidak valid');
      return;
    }

    if (editingTask) {
      onUpdateTask({
        ...editingTask,
        title,
        description,
        priority,
        category,
        dueDate,
        columnId,
      });
      onShowToast('Tugas berhasil diperbarui!', 'success');
    } else {
      onAddTask({
        title,
        description,
        priority,
        category,
        dueDate,
        columnId,
      });
      onShowToast('Tugas baru berhasil ditambahkan ke papan!', 'success');
    }

    setIsModalOpen(false);
  };

  const moveColumn = (task: PlannerTask, targetCol: ColumnId) => {
    onUpdateTask({
      ...task,
      columnId: targetCol,
    });
    onShowToast(`Tugas dipindahkan ke "${columns.find(c => c.id === targetCol)?.title}"`, 'info');
  };

  const completedCount = tasks.filter((t) => t.columnId === 'done').length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header & Progress Bar */}
      <div className="bg-white p-6 rounded-xl border border-neutral-100 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <CheckSquare className="w-5 h-5 text-slate-700" />
            <h2 className="text-lg font-bold text-slate-900">Papan Perencanaan (Wedding Planner)</h2>
          </div>
          <p className="text-xs text-neutral-500">
            Atur dan pantau setiap checklist persiapan pernikahan tanpa ada yang terlewat.
          </p>
        </div>

        {/* Progress gauge */}
        <div className="w-full sm:w-72 bg-[#FCFCFC] p-3 rounded-lg border border-neutral-100">
          <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
            <span className="text-neutral-600">Progres Persiapan</span>
            <span className="text-[#74A12E]">{progressPercent}% Selesai</span>
          </div>
          <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-slate-900 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-[10px] text-neutral-400 mt-1 block">
            {completedCount} dari {tasks.length} tugas terselesaikan
          </span>
        </div>
      </div>

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {columns.map((col) => {
          const colTasks = tasks.filter((t) => t.columnId === col.id);

          return (
            <div
              key={col.id}
              className={`rounded-2xl border p-4 flex flex-col min-h-[500px] ${col.bg} ${col.border}`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200/50 mb-4">
                <div>
                  <h3 className="font-bold text-sm text-[#263238] flex items-center gap-2">
                    {col.title}
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white text-neutral-600 border border-neutral-200">
                      {colTasks.length}
                    </span>
                  </h3>
                  <span className="text-[10px] text-neutral-400 block">{col.subtitle}</span>
                </div>
                <button
                  onClick={() => openAddModal(col.id)}
                  className="p-1 rounded-md text-neutral-500 hover:text-neutral-900 hover:bg-white transition-colors"
                  title="Tambah tugas di kolom ini"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Tasks List */}
              <div className="space-y-3 flex-1 overflow-y-auto pr-1">
                {colTasks.length === 0 ? (
                  <div className="h-32 flex flex-col items-center justify-center border-2 border-dashed border-neutral-200 rounded-xl text-neutral-400 text-xs">
                    <span>Belum ada tugas</span>
                    <button
                      onClick={() => openAddModal(col.id)}
                      className="text-[11px] text-neutral-700 hover:text-neutral-950 hover:underline mt-1 font-medium"
                    >
                      + Buat tugas baru
                    </button>
                  </div>
                ) : (
                  colTasks.map((task) => (
                    <Card
                      key={task.id}
                      hoverable
                      className="p-4 bg-white border border-neutral-200/70 shadow-xs flex flex-col justify-between"
                    >
                      <div>
                        {/* Top tags */}
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                            {task.category}
                          </span>
                          <Badge
                            variant={
                              task.priority === 'high'
                                ? 'error'
                                : task.priority === 'medium'
                                ? 'warning'
                                : 'neutral'
                            }
                            size="sm"
                          >
                            {task.priority === 'high' ? 'Penting' : task.priority === 'medium' ? 'Sedang' : 'Rendah'}
                          </Badge>
                        </div>

                        {/* Title & Desc */}
                        <h4 className="text-sm font-semibold text-slate-900 mb-1 leading-snug">
                          {task.title}
                        </h4>
                        {task.description && (
                          <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-3">
                            {task.description}
                          </p>
                        )}
                      </div>

                      {/* Footer & Actions */}
                      <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-slate-500 text-xs">
                        {task.dueDate ? (
                          <span className="flex items-center gap-1 text-slate-500">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            {task.dueDate}
                          </span>
                        ) : (
                          <span />
                        )}

                        <div className="flex items-center gap-1">
                          {col.id === 'in_progress' && (
                            <button
                              onClick={() => moveColumn(task, 'todo')}
                              title="Kembalikan ke Akan Dikerjakan"
                              className="p-1 hover:text-neutral-700 rounded"
                            >
                              <ChevronLeft className="w-3.5 h-3.5" />
                            </button>
                          )}
                          {col.id === 'todo' && (
                            <button
                              onClick={() => moveColumn(task, 'in_progress')}
                              title="Mulai Kerjakan"
                              className="p-1 hover:text-neutral-900 rounded"
                            >
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          )}
                          {col.id === 'in_progress' && (
                            <button
                              onClick={() => moveColumn(task, 'done')}
                              title="Tandai Selesai"
                              className="p-1 hover:text-[#74A12E] rounded"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#74A12E]" />
                            </button>
                          )}
                          {col.id === 'done' && (
                            <button
                              onClick={() => moveColumn(task, 'in_progress')}
                              title="Kembalikan ke Dalam Proses"
                              className="p-1 hover:text-neutral-700 rounded"
                            >
                              <ChevronLeft className="w-3.5 h-3.5" />
                            </button>
                          )}

                          <button
                            onClick={() => openEditModal(task)}
                            title="Edit Tugas"
                            className="p-1 hover:text-neutral-700 rounded ml-1"
                          >
                            <Edit2 className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => onDeleteTask(task.id)}
                            title="Hapus Tugas"
                            className="p-1 hover:text-rose-500 rounded"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>

              {/* Add Task Button inside column */}
              <button
                onClick={() => openAddModal(col.id)}
                className="mt-3 w-full py-2 border border-neutral-200 hover:border-neutral-300 bg-white text-xs font-semibold text-neutral-600 hover:text-neutral-900 rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
              >
                <Plus className="w-3.5 h-3.5" />
                Tambah Tugas
              </button>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Task Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingTask ? 'Ubah Tugas Planner' : 'Tambah Tugas Planner'}
        description="Rinci pekerjaan persiapan pernikahan Anda dengan jelas."
      >
        <form onSubmit={handleSave} className="space-y-4">
          {formError && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg">
              {formError}
            </div>
          )}

          <Input
            label="Judul Tugas"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Contoh: Booking Photographer & Teaser"
            required
          />

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Catatan / Detail Pekerjaan (Opsional)
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Contoh: Termasuk DP 30% dan review portofolio..."
              className="w-full bg-white border border-neutral-200 text-sm rounded-md p-3 text-slate-900 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Prioritas
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                className="w-full bg-white border border-neutral-200 text-xs font-medium rounded-md px-3 py-2.5 text-slate-900 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
              >
                <option value="low">Rendah</option>
                <option value="medium">Sedang</option>
                <option value="high">Tinggi / Mendesak</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Kategori
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Contoh: Venue, Busana, Katering"
                className="w-full bg-white border border-neutral-200 text-xs font-medium rounded-md px-3 py-2.5 text-slate-900 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Tenggat Waktu (Due Date)
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full bg-white border border-neutral-200 text-xs font-medium rounded-md px-3 py-2.5 text-slate-900 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Kolom Status
              </label>
              <select
                value={columnId}
                onChange={(e) => setColumnId(e.target.value as ColumnId)}
                className="w-full bg-white border border-neutral-200 text-xs font-medium rounded-md px-3 py-2.5 text-slate-900 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
              >
                <option value="todo">Akan Dikerjakan</option>
                <option value="in_progress">Sedang Berjalan</option>
                <option value="done">Selesai</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-neutral-100">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsModalOpen(false)}
            >
              Batal
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
            >
              {editingTask ? 'Simpan Perubahan' : 'Tambahkan Tugas'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
