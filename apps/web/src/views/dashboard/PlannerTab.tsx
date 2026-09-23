import React, { useState } from 'react';
import {
  CheckSquare,
  Plus,
  Calendar as CalendarIcon,
  Clock,
  Trash2,
  Edit2,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  AlertCircle,
  Columns,
  ListTodo,
  MapPin,
  Sparkles,
  CalendarCheck2,
  CalendarPlus,
  Tag,
} from 'lucide-react';
import { Wedding } from '@/types/wedding';
import { PlannerTask, ColumnId, TaskPriority, WeddingMilestone, MilestoneCategory } from '@/types/planner';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { plannerTaskSchema } from '@/schemas/validation';
import { formatDateIndo } from '@/lib/utils';

export interface PlannerTabProps {
  wedding: Wedding;
  tasks: PlannerTask[];
  milestones?: WeddingMilestone[];
  onAddTask: (task: Omit<PlannerTask, 'id' | 'weddingId' | 'order' | 'createdAt' | 'updatedAt'>) => void;
  onUpdateTask: (task: PlannerTask) => void;
  onDeleteTask: (id: string) => void;
  onAddMilestone?: (milestone: Omit<WeddingMilestone, 'id' | 'weddingId'>) => void;
  onUpdateMilestone?: (milestone: WeddingMilestone) => void;
  onDeleteMilestone?: (id: string) => void;
  onShowToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

export function PlannerTab({
  wedding,
  tasks,
  milestones = [],
  onAddTask,
  onUpdateTask,
  onDeleteTask,
  onAddMilestone,
  onUpdateMilestone,
  onDeleteMilestone,
  onShowToast,
}: PlannerTabProps) {
  // View Switcher state: 'kanban' | 'calendar' | 'timeline'
  const [viewMode, setViewMode] = useState<'kanban' | 'calendar' | 'timeline'>('kanban');

  // Task Modal state
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<PlannerTask | null>(null);

  // Milestone Modal state
  const [isMilestoneModalOpen, setIsMilestoneModalOpen] = useState(false);
  const [editingMilestone, setEditingMilestone] = useState<WeddingMilestone | null>(null);

  // Task Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [category, setCategory] = useState('Persiapan');
  const [dueDate, setDueDate] = useState('');
  const [columnId, setColumnId] = useState<ColumnId>('todo');
  const [taskFormError, setTaskFormError] = useState('');

  // Milestone Form state
  const [mTitle, setMTitle] = useState('');
  const [mDate, setMDate] = useState('');
  const [mTime, setMTime] = useState('');
  const [mVenue, setMVenue] = useState('');
  const [mCategory, setMCategory] = useState<MilestoneCategory>('ceremony');
  const [mDescription, setMDescription] = useState('');
  const [mFormError, setMFormError] = useState('');

  // Calendar State: determine active month based on weddingDate or current date
  const initialCalendarDate = wedding.weddingDate ? new Date(wedding.weddingDate) : new Date();
  const [calendarMonth, setCalendarMonth] = useState<Date>(
    new Date(initialCalendarDate.getFullYear(), initialCalendarDate.getMonth(), 1)
  );
  const [selectedDateStr, setSelectedDateStr] = useState<string>(
    wedding.weddingDate ? wedding.weddingDate.slice(0, 10) : new Date().toISOString().slice(0, 10)
  );

  const columns: { id: ColumnId; title: string; subtitle: string; bg: string; border: string; badge: string; text: string }[] = [
    {
      id: 'todo',
      title: 'Akan Dikerjakan',
      subtitle: 'Daftar persiapan awal',
      bg: 'bg-[#FFFDF5]',
      border: 'border-[#FFEAAB]',
      badge: 'bg-[#FFEAAB]/40 text-[#7A5D00] border-[#FFEAAB]',
      text: 'text-[#7A5D00]',
    },
    {
      id: 'in_progress',
      title: 'Sedang Berjalan',
      subtitle: 'Dalam proses komunikasi/eksekusi',
      bg: 'bg-[#FFF7F9]',
      border: 'border-[#FCBACB]',
      badge: 'bg-[#FCBACB]/35 text-[#7D4050] border-[#FCBACB]',
      text: 'text-[#7D4050]',
    },
    {
      id: 'done',
      title: 'Selesai',
      subtitle: 'Tugas yang telah beres',
      bg: 'bg-[#F6FAF3]',
      border: 'border-[#B9DCA9]',
      badge: 'bg-[#B9DCA9]/35 text-[#3D6420] border-[#B9DCA9]',
      text: 'text-[#3D6420]',
    },
  ];

  // Merge Wedding built-in events into milestones list
  const allMilestones: WeddingMilestone[] = [
    ...milestones,
    ...(wedding.akadEvent?.date
      ? [
          {
            id: 'auto-akad',
            weddingId: wedding.id,
            title: wedding.akadEvent.title || 'Akad Nikah',
            date: wedding.weddingDate ? wedding.weddingDate.slice(0, 10) : '2026-12-20',
            time: wedding.akadEvent.time || '08:00',
            venue: wedding.akadEvent.venue || 'Plataran Dharmawangsa',
            category: 'ceremony' as MilestoneCategory,
            description: wedding.akadEvent.address || 'Prosesi ijab qabul utama',
            isCompleted: false,
          },
        ]
      : []),
    ...(wedding.receptionEvent?.date
      ? [
          {
            id: 'auto-reception',
            weddingId: wedding.id,
            title: wedding.receptionEvent.title || 'Resepsi Pernikahan',
            date: wedding.weddingDate ? wedding.weddingDate.slice(0, 10) : '2026-12-20',
            time: wedding.receptionEvent.time || '11:00',
            venue: wedding.receptionEvent.venue || 'Plataran Dharmawangsa',
            category: 'ceremony' as MilestoneCategory,
            description: wedding.receptionEvent.address || 'Pesta perayaan bersama kerabat',
            isCompleted: false,
          },
        ]
      : []),
  ];

  // Deduplicate milestones by ID
  const uniqueMilestones = Array.from(new Map(allMilestones.map((m) => [m.id, m])).values()).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Task Modal Handlers
  const openAddTaskModal = (targetColumn: ColumnId = 'todo') => {
    setEditingTask(null);
    setTitle('');
    setDescription('');
    setPriority('medium');
    setCategory('Persiapan');
    setDueDate(selectedDateStr || '');
    setColumnId(targetColumn);
    setTaskFormError('');
    setIsTaskModalOpen(true);
  };

  const openEditTaskModal = (task: PlannerTask) => {
    setEditingTask(task);
    setTitle(task.title);
    setDescription(task.description || '');
    setPriority(task.priority);
    setCategory(task.category);
    setDueDate(task.dueDate || '');
    setColumnId(task.columnId);
    setTaskFormError('');
    setIsTaskModalOpen(true);
  };

  const handleSaveTask = (e: React.FormEvent) => {
    e.preventDefault();
    setTaskFormError('');

    const validation = plannerTaskSchema.safeParse({
      title,
      description,
      priority,
      category,
      dueDate,
      columnId,
    });

    if (!validation.success) {
      setTaskFormError(validation.error.errors[0]?.message || 'Input tidak valid');
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

    setIsTaskModalOpen(false);
  };

  const moveColumn = (task: PlannerTask, targetCol: ColumnId) => {
    onUpdateTask({
      ...task,
      columnId: targetCol,
    });
    onShowToast(`Tugas dipindahkan ke "${columns.find((c) => c.id === targetCol)?.title}"`, 'info');
  };

  // Milestone Modal Handlers
  const openAddMilestoneModal = (presetDate?: string) => {
    setEditingMilestone(null);
    setMTitle('');
    setMDate(presetDate || selectedDateStr || '');
    setMTime('09:00');
    setMVenue('');
    setMCategory('ceremony');
    setMDescription('');
    setMFormError('');
    setIsMilestoneModalOpen(true);
  };

  const openEditMilestoneModal = (milestone: WeddingMilestone) => {
    setEditingMilestone(milestone);
    setMTitle(milestone.title);
    setMDate(milestone.date);
    setMTime(milestone.time || '');
    setMVenue(milestone.venue || '');
    setMCategory(milestone.category);
    setMDescription(milestone.description || '');
    setMFormError('');
    setIsMilestoneModalOpen(true);
  };

  const handleSaveMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    setMFormError('');

    if (!mTitle.trim()) {
      setMFormError('Nama acara penting wajib diisi.');
      return;
    }
    if (!mDate) {
      setMFormError('Tanggal acara wajib ditentukan.');
      return;
    }

    if (editingMilestone) {
      if (onUpdateMilestone) {
        onUpdateMilestone({
          ...editingMilestone,
          title: mTitle.trim(),
          date: mDate,
          time: mTime || undefined,
          venue: mVenue.trim() || undefined,
          category: mCategory,
          description: mDescription.trim() || undefined,
        });
      }
      onShowToast('Acara berhasil diperbarui!', 'success');
    } else {
      if (onAddMilestone) {
        onAddMilestone({
          title: mTitle.trim(),
          date: mDate,
          time: mTime || undefined,
          venue: mVenue.trim() || undefined,
          category: mCategory,
          description: mDescription.trim() || undefined,
          isCompleted: false,
        });
      }
      onShowToast('Acara penting baru berhasil ditambahkan ke kalender!', 'success');
    }

    setIsMilestoneModalOpen(false);
  };

  const toggleMilestoneComplete = (milestone: WeddingMilestone) => {
    if (onUpdateMilestone) {
      onUpdateMilestone({
        ...milestone,
        isCompleted: !milestone.isCompleted,
      });
      onShowToast(
        `Acara "${milestone.title}" ditandai ${!milestone.isCompleted ? 'selesai' : 'belum selesai'}`,
        'info'
      );
    }
  };

  // Overall Task Progress
  const completedCount = tasks.filter((t) => t.columnId === 'done').length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  // Calendar Math
  const year = calendarMonth.getFullYear();
  const month = calendarMonth.getMonth(); // 0-indexed
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay(); // 0 is Sunday

  const prevMonthDays = new Date(year, month, 0).getDate();
  const calendarCells = [];

  // Previous month trailing days
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    const d = prevMonthDays - i;
    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    calendarCells.push({ dayNumber: d, isCurrentMonth: false, dateStr });
  }

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    calendarCells.push({ dayNumber: d, isCurrentMonth: true, dateStr });
  }

  // Next month leading days to complete grid
  const remainingCells = 42 - calendarCells.length;
  for (let d = 1; d <= remainingCells && calendarCells.length % 7 !== 0; d++) {
    const dateStr = `${year}-${String(month + 2).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    calendarCells.push({ dayNumber: d, isCurrentMonth: false, dateStr });
  }

  const monthNamesIndo = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
  ];

  const handlePrevMonth = () => {
    setCalendarMonth(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCalendarMonth(new Date(year, month + 1, 1));
  };

  // Selected date events & tasks
  const selectedMilestones = uniqueMilestones.filter((m) => m.date === selectedDateStr);
  const selectedTasks = tasks.filter((t) => t.dueDate === selectedDateStr);

  // Helper for category badge
  const categoryLabels: Record<MilestoneCategory, { label: string; badge: 'primary' | 'success' | 'warning' | 'neutral' }> = {
    ceremony: { label: 'Upacara Utama', badge: 'primary' },
    traditional: { label: 'Prosesi Adat', badge: 'warning' },
    meeting: { label: 'Rapat Vendor', badge: 'neutral' },
    deadline: { label: 'Tenggat Waktu', badge: 'warning' },
    other: { label: 'Lainnya', badge: 'neutral' },
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* ── Top Header & Mode Switcher ────────────────────────────── */}
      <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 bg-slate-100 text-slate-800 rounded-lg">
              <CheckSquare className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-900">Perencanaan &amp; Agenda Pernikahan</h2>
          </div>
          <p className="text-xs text-neutral-500 max-w-xl">
            Pantau alur persiapan melalui Papan Kanban, atau lihat jadwal acara penting (Akad, Resepsi, Lamaran, dll.) berdasarkan tanggal kalender.
          </p>
        </div>

        {/* View Switcher Controls */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <div className="flex items-center p-1 bg-neutral-100 rounded-xl">
            <button
              onClick={() => setViewMode('kanban')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'kanban'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span>Papan Kanban</span>
            </button>

            <button
              onClick={() => setViewMode('calendar')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'calendar'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>Kalender Acara</span>
            </button>

            <button
              onClick={() => setViewMode('timeline')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'timeline'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              <CalendarCheck2 className="w-3.5 h-3.5" />
              <span>Timeline Rangkaian</span>
            </button>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => openAddTaskModal('todo')}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-150 active:scale-[0.98] cursor-pointer shadow-xs ${
                viewMode === 'kanban'
                  ? 'bg-[#263238] text-white hover:bg-[#1E293B]'
                  : 'bg-white hover:bg-neutral-50 text-[#263238] border border-[#E8E8E8]'
              }`}
            >
              <Plus className={`w-4 h-4 stroke-[2.2] ${viewMode === 'kanban' ? 'text-white' : 'text-[#263238]'}`} />
              <span>Tambah Tugas</span>
            </button>

            <button
              type="button"
              onClick={() => openAddMilestoneModal(selectedDateStr)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-150 active:scale-[0.98] cursor-pointer shadow-xs ${
                viewMode !== 'kanban'
                  ? 'bg-[#263238] text-white hover:bg-[#1E293B]'
                  : 'bg-[#FFEAAB]/35 hover:bg-[#FFEAAB]/55 text-[#7A5D00] border border-[#FFEAAB]'
              }`}
            >
              <CalendarPlus className={`w-4 h-4 stroke-[2] ${viewMode !== 'kanban' ? 'text-white' : 'text-[#7A5D00]'}`} />
              <span>Tambah Acara</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Progress & Quick Stats ─────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Kanban Task Progress */}
        <div className="bg-white p-4 rounded-xl border border-neutral-100 shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold mb-1">
            <span className="text-neutral-600">Progres Checklist Tugas</span>
            <span className="text-[#3D6420] font-bold">{progressPercent}% Selesai</span>
          </div>
          <div className="w-full h-2 bg-[#B9DCA9]/20 rounded-full overflow-hidden mt-2">
            <div
              className="h-full bg-[#74A12E] rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-[10px] text-neutral-400 mt-1.5 block">
            {completedCount} dari {tasks.length} tugas terselesaikan
          </span>
        </div>

        {/* Milestone Agenda Count */}
        <div className="bg-white p-4 rounded-xl border border-neutral-100 shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold mb-1">
            <span className="text-neutral-600">Agenda &amp; Rangkaian Acara</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-xl font-bold text-slate-900 mt-1">
            {uniqueMilestones.length} Acara Penting
          </p>
          <span className="text-[10px] text-neutral-400 mt-1 block">
            {uniqueMilestones.filter((m) => m.isCompleted).length} prosesi telah selesai dilaksanakan
          </span>
        </div>

        {/* Target Wedding Date */}
        <div className="bg-white p-4 rounded-xl border border-neutral-100 shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold mb-1">
            <span className="text-neutral-600">Hari Bahagia (H-Day)</span>
            <CalendarIcon className="w-4 h-4 text-[#FC9FB1]" />
          </div>
          <p className="text-lg font-bold text-[#7D4050] mt-1">
            {wedding.weddingDate ? formatDateIndo(wedding.weddingDate) : 'Belum Ditentukan'}
          </p>
          <span className="text-[10px] text-neutral-400 mt-1 block">
            {wedding.akadEvent?.venue || 'Venue Belum Diatur'}
          </span>
        </div>
      </div>

      {/* ── 1. KANBAN VIEW ────────────────────────────────────────── */}
      {viewMode === 'kanban' && (
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
                    <h3 className={`font-bold text-sm flex items-center gap-2 ${col.text}`}>
                      {col.title}
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${col.badge}`}>
                        {colTasks.length}
                      </span>
                    </h3>
                    <span className="text-[10px] text-neutral-400 block">{col.subtitle}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => openAddTaskModal(col.id)}
                    className="p-1.5 rounded-lg text-neutral-400 hover:text-[#263238] hover:bg-white hover:shadow-2xs transition-all active:scale-95 cursor-pointer"
                    title="Tambah tugas di kolom ini"
                  >
                    <Plus className="w-4 h-4 stroke-[2.2]" />
                  </button>
                </div>

                {/* Tasks List */}
                <div className="space-y-3 flex-1 overflow-y-auto pr-1">
                  {colTasks.length === 0 ? (
                    <div className="h-36 flex flex-col items-center justify-center border-2 border-dashed border-neutral-200/90 rounded-xl text-neutral-400 text-xs p-4">
                      <span className="text-neutral-500 font-medium">Belum ada tugas</span>
                      <button
                        type="button"
                        onClick={() => openAddTaskModal(col.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 mt-2 rounded-lg text-xs font-semibold text-[#7A5D00] bg-[#FFEAAB]/35 hover:bg-[#FFEAAB]/55 border border-[#FFEAAB] transition-all active:scale-95 cursor-pointer shadow-2xs"
                      >
                        <Plus className="w-3.5 h-3.5 stroke-[2.2]" />
                        <span>+ Buat tugas baru</span>
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
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
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

                          <h4 className="text-sm font-semibold text-neutral-900 mb-1 leading-snug">
                            {task.title}
                          </h4>

                          {task.description && (
                            <p className="text-xs text-neutral-500 line-clamp-2 mb-3 font-light leading-relaxed">
                              {task.description}
                            </p>
                          )}
                        </div>

                        {/* Card Footer: Due date & Actions */}
                        <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                          {task.dueDate ? (
                            <span className="flex items-center gap-1 text-[11px] text-neutral-400">
                              <CalendarIcon className="w-3 h-3 text-neutral-400" />
                              {task.dueDate}
                            </span>
                          ) : (
                            <span className="text-[10px] text-neutral-300 italic">Tanpa tenggat</span>
                          )}

                          <div className="flex items-center gap-1">
                            {col.id !== 'todo' && (
                              <button
                                onClick={() => moveColumn(task, col.id === 'done' ? 'in_progress' : 'todo')}
                                className="p-1 text-neutral-400 hover:text-neutral-700 rounded hover:bg-neutral-100"
                                title="Pindahkan ke kolom sebelumnya"
                              >
                                <ChevronLeft className="w-3.5 h-3.5" />
                              </button>
                            )}

                            {col.id !== 'done' && (
                              <button
                                onClick={() => moveColumn(task, col.id === 'todo' ? 'in_progress' : 'done')}
                                className="p-1 text-neutral-400 hover:text-neutral-700 rounded hover:bg-neutral-100"
                                title="Pindahkan ke kolom berikutnya"
                              >
                                <ChevronRight className="w-3.5 h-3.5" />
                              </button>
                            )}

                            <button
                              onClick={() => openEditTaskModal(task)}
                              className="p-1 text-neutral-400 hover:text-neutral-700 rounded hover:bg-neutral-100"
                              title="Edit tugas"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => {
                                if (confirm(`Hapus tugas "${task.title}"?`)) {
                                  onDeleteTask(task.id);
                                  onShowToast('Tugas dihapus.', 'info');
                                }
                              }}
                              className="p-1 text-neutral-400 hover:text-rose-600 rounded hover:bg-neutral-100"
                              title="Hapus tugas"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </Card>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── 2. CALENDAR VIEW ──────────────────────────────────────── */}
      {viewMode === 'calendar' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Monthly Calendar Grid (8 cols) */}
          <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-neutral-100 shadow-xs">
            {/* Calendar Month Header */}
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {monthNamesIndo[month]} {year}
                </h3>
                <span className="text-xs text-neutral-400">
                  Pilih tanggal untuk melihat jadwal dan tenggat tugas
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <Button variant="ghost" size="sm" onClick={handlePrevMonth}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCalendarMonth(new Date(initialCalendarDate.getFullYear(), initialCalendarDate.getMonth(), 1))}
                >
                  Bulan Hari-H
                </Button>
                <Button variant="ghost" size="sm" onClick={handleNextMonth}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Days of week header */}
            <div className="grid grid-cols-7 text-center font-semibold text-neutral-400 text-xs py-2 border-b border-neutral-100 mb-2">
              <span className="text-rose-500">Min</span>
              <span>Sen</span>
              <span>Sel</span>
              <span>Rab</span>
              <span>Kam</span>
              <span>Jum</span>
              <span className="text-emerald-600">Sab</span>
            </div>

            {/* 7-column Calendar Cells */}
            <div className="grid grid-cols-7 gap-1.5">
              {calendarCells.map((cell, idx) => {
                const isSelected = cell.dateStr === selectedDateStr;
                const cellMilestones = uniqueMilestones.filter((m) => m.date === cell.dateStr);
                const cellTasks = tasks.filter((t) => t.dueDate === cell.dateStr);
                const isWeddingDay = wedding.weddingDate && cell.dateStr === wedding.weddingDate.slice(0, 10);

                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedDateStr(cell.dateStr)}
                    className={`min-h-[85px] p-1.5 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between ${
                      !cell.isCurrentMonth
                        ? 'opacity-30 bg-neutral-50/50 border-transparent'
                        : isSelected
                        ? 'border-slate-900 bg-neutral-50 shadow-xs'
                        : isWeddingDay
                        ? 'border-pink-300 bg-pink-50/40 hover:border-pink-400'
                        : 'border-neutral-100 hover:border-neutral-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full ${
                          isSelected
                            ? 'bg-slate-900 text-white'
                            : isWeddingDay
                            ? 'bg-pink-500 text-white'
                            : 'text-neutral-700'
                        }`}
                      >
                        {cell.dayNumber}
                      </span>

                      {isWeddingDay && (
                        <span className="text-[9px] font-bold text-pink-600 uppercase tracking-tighter">
                          Hari-H
                        </span>
                      )}
                    </div>

                    {/* Indicators on Day */}
                    <div className="space-y-1 mt-1">
                      {cellMilestones.slice(0, 1).map((m) => (
                        <div
                          key={m.id}
                          className="text-[9px] font-semibold truncate px-1.5 py-0.5 rounded bg-pink-100 text-pink-800"
                          title={m.title}
                        >
                          ★ {m.title}
                        </div>
                      ))}
                      {cellTasks.length > 0 && (
                        <div className="text-[9px] text-neutral-500 flex items-center gap-1 font-medium px-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                          <span>{cellTasks.length} tugas</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Selected Date Agenda Details (4 cols) */}
          <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-neutral-100 shadow-xs space-y-5">
            <div className="pb-3 border-b border-neutral-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-semibold text-neutral-400 tracking-wider">
                  Agenda Tanggal Terpilih
                </span>
                <h3 className="text-sm font-bold text-slate-900">
                  {selectedDateStr ? formatDateIndo(selectedDateStr) : 'Pilih Tanggal'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => openAddMilestoneModal(selectedDateStr)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FFEAAB]/35 hover:bg-[#FFEAAB]/55 text-[#7A5D00] border border-[#FFEAAB] rounded-lg text-xs font-semibold shadow-2xs hover:shadow-xs transition-all active:scale-95 cursor-pointer"
                title="Tambah agenda pada tanggal ini"
              >
                <Plus className="w-3.5 h-3.5 stroke-[2.2]" />
                <span>Tambah Acara</span>
              </button>
            </div>

            {/* Milestones on Selected Date */}
            <div>
              <span className="text-xs font-semibold text-slate-800 block mb-2">
                Acara / Prosesi Penting ({selectedMilestones.length})
              </span>
              {selectedMilestones.length === 0 ? (
                <p className="text-xs text-neutral-400 italic">Tidak ada acara penting di tanggal ini.</p>
              ) : (
                <div className="space-y-2">
                  {selectedMilestones.map((m) => (
                    <div
                      key={m.id}
                      className="p-3 rounded-xl border border-pink-100 bg-pink-50/30 flex items-start justify-between gap-2"
                    >
                      <div>
                        <Badge variant="primary" size="sm" className="mb-1">
                          {categoryLabels[m.category]?.label || m.category}
                        </Badge>
                        <h4 className="text-xs font-bold text-slate-900">{m.title}</h4>
                        <div className="text-[11px] text-neutral-500 space-y-0.5 mt-1 font-light">
                          {m.time && (
                            <p className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-neutral-400" />
                              <span>Pukul {m.time} WIB</span>
                            </p>
                          )}
                          {m.venue && (
                            <p className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-neutral-400" />
                              <span>{m.venue}</span>
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => openEditMilestoneModal(m)}
                          className="p-1 text-neutral-400 hover:text-slate-900 rounded"
                          title="Edit acara"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                        {onDeleteMilestone && (
                          <button
                            onClick={() => {
                              if (confirm(`Hapus acara "${m.title}"?`)) {
                                onDeleteMilestone(m.id);
                                onShowToast('Acara dihapus.', 'info');
                              }
                            }}
                            className="p-1 text-neutral-400 hover:text-rose-600 rounded"
                            title="Hapus acara"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tasks on Selected Date */}
            <div>
              <span className="text-xs font-semibold text-slate-800 block mb-2">
                Tenggat Tugas Planner ({selectedTasks.length})
              </span>
              {selectedTasks.length === 0 ? (
                <p className="text-xs text-neutral-400 italic">Tidak ada deadline tugas di tanggal ini.</p>
              ) : (
                <div className="space-y-2">
                  {selectedTasks.map((t) => (
                    <div
                      key={t.id}
                      className="p-3 rounded-xl border border-neutral-100 bg-[#FCFCFC] flex items-center justify-between gap-2"
                    >
                      <div>
                        <p className={`text-xs font-semibold ${t.columnId === 'done' ? 'line-through text-neutral-400' : 'text-slate-900'}`}>
                          {t.title}
                        </p>
                        <span className="text-[10px] text-neutral-400">{t.category}</span>
                      </div>
                      <Badge variant={t.columnId === 'done' ? 'success' : 'neutral'} size="sm">
                        {t.columnId === 'done' ? 'Selesai' : t.columnId === 'in_progress' ? 'Berjalan' : 'To Do'}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── 3. TIMELINE VIEW ──────────────────────────────────────── */}
      {viewMode === 'timeline' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-100 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Timeline Kronologis Rangkaian Acara
              </h3>
              <p className="text-xs text-neutral-500">
                Urutan agenda pernikahan mulai dari lamaran keluarga, prosesi adat, hingga resepsi pernikahan.
              </p>
            </div>
            <button
              type="button"
              onClick={() => openAddMilestoneModal()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-white bg-[#263238] hover:bg-[#1E293B] shadow-xs transition-all duration-150 active:scale-[0.98] cursor-pointer"
            >
              <CalendarPlus className="w-4 h-4 stroke-[2] text-white" />
              <span>Tambah Rangkaian Acara</span>
            </button>
          </div>

          {/* Timeline Feed */}
          {uniqueMilestones.length === 0 ? (
            <div className="py-16 text-center bg-neutral-50/60 rounded-2xl border border-dashed border-neutral-200 p-8 flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mb-3">
                <CalendarCheck2 className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">Belum Ada Rangkaian Acara</h4>
              <p className="text-xs text-neutral-500 max-w-sm mb-4">
                Buat susunan agenda pernikahan seperti Lamaran, Siraman, Pengajian, Akad Nikah, dan Resepsi.
              </p>
              <button
                type="button"
                onClick={() => openAddMilestoneModal()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-white bg-[#263238] hover:bg-[#1E293B] shadow-xs active:scale-[0.98] transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4 text-white stroke-[2.2]" />
                <span>Tambah Acara Pertama</span>
              </button>
            </div>
          ) : (
            <div className="relative pl-6 sm:pl-8 border-l-2 border-neutral-200 space-y-8 my-4">
            {uniqueMilestones.map((m) => {
              const isWeddingDay = wedding.weddingDate && m.date === wedding.weddingDate.slice(0, 10);

              return (
                <div key={m.id} className="relative group">
                  {/* Timeline Node Icon */}
                  <div
                    onClick={() => toggleMilestoneComplete(m)}
                    className={`absolute -left-[31px] sm:-left-[39px] top-0.5 w-6 h-6 rounded-full border-2 cursor-pointer flex items-center justify-center transition-all ${
                      m.isCompleted
                        ? 'bg-emerald-500 border-emerald-500 text-white'
                        : isWeddingDay
                        ? 'bg-pink-500 border-pink-500 text-white animate-pulse'
                        : 'bg-white border-slate-900 text-transparent hover:text-slate-400'
                    }`}
                    title="Klik untuk menandai selesai"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>

                  {/* Timeline Event Card */}
                  <div className="bg-[#FCFCFC] p-4 sm:p-5 rounded-2xl border border-neutral-200/80 hover:border-neutral-300 transition-all shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant={categoryLabels[m.category]?.badge || 'neutral'} size="sm">
                          {categoryLabels[m.category]?.label || m.category}
                        </Badge>
                        <span className="text-xs font-semibold text-pink-600 bg-pink-50 px-2 py-0.5 rounded">
                          {formatDateIndo(m.date)}
                        </span>
                        {m.isCompleted && (
                          <Badge variant="success" size="sm">
                            Selesai Dilaksanakan
                          </Badge>
                        )}
                      </div>

                      <h4 className="text-base font-bold text-slate-900">{m.title}</h4>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500 font-light">
                        {m.time && (
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-neutral-400" />
                            Pukul {m.time} WIB
                          </span>
                        )}
                        {m.venue && (
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                            {m.venue}
                          </span>
                        )}
                      </div>

                      {m.description && (
                        <p className="text-xs text-neutral-600 leading-relaxed font-light pt-1">
                          {m.description}
                        </p>
                      )}
                    </div>

                    {/* Timeline Event Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0 self-end md:self-center">
                      <button
                        onClick={() => openEditMilestoneModal(m)}
                        className="p-2 text-neutral-400 hover:text-slate-900 rounded-lg hover:bg-white border border-transparent hover:border-neutral-200 transition-colors"
                        title="Edit acara"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      {onDeleteMilestone && (
                        <button
                          onClick={() => {
                            if (confirm(`Hapus acara "${m.title}"?`)) {
                              onDeleteMilestone(m.id);
                              onShowToast('Acara dihapus.', 'info');
                            }
                          }}
                          className="p-2 text-neutral-400 hover:text-rose-600 rounded-lg hover:bg-white border border-transparent hover:border-neutral-200 transition-colors"
                          title="Hapus acara"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          )}
        </div>
      )}

      {/* ── Modal Add / Edit Task ─────────────────────────────────── */}
      <Modal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        title={editingTask ? 'Edit Tugas Planner' : 'Tambah Tugas Baru'}
      >
        <form onSubmit={handleSaveTask} className="space-y-4">
          {taskFormError && (
            <div className="p-3 rounded-lg bg-rose-50 text-rose-800 text-xs border border-rose-200">
              {taskFormError}
            </div>
          )}

          <Input
            label="Judul Tugas"
            placeholder="Contoh: Booking Photographer"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">
              Deskripsi Singkat (Opsional)
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Rincian catatan tugas persiapan..."
              className="w-full bg-[#FCFCFC] border border-neutral-200 text-xs rounded-lg p-2.5 focus:outline-none focus:border-slate-900 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Prioritas
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                className="w-full bg-[#FCFCFC] border border-neutral-200 text-xs rounded-lg p-2.5 focus:outline-none focus:border-slate-900"
              >
                <option value="low">Rendah (Low)</option>
                <option value="medium">Sedang (Medium)</option>
                <option value="high">Penting (High)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Kategori
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Contoh: Venue, Busana"
                className="w-full bg-[#FCFCFC] border border-neutral-200 text-xs rounded-lg p-2.5 focus:outline-none focus:border-slate-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Tenggat Waktu (Due Date)"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Kolom Status
              </label>
              <select
                value={columnId}
                onChange={(e) => setColumnId(e.target.value as ColumnId)}
                className="w-full bg-[#FCFCFC] border border-neutral-200 text-xs rounded-lg p-2.5 focus:outline-none focus:border-slate-900"
              >
                <option value="todo">Akan Dikerjakan (To Do)</option>
                <option value="in_progress">Sedang Berjalan (In Progress)</option>
                <option value="done">Selesai (Done)</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-100">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setIsTaskModalOpen(false)}
            >
              Batal
            </Button>
            <Button type="submit" variant="primary" size="sm">
              {editingTask ? 'Simpan Perubahan' : 'Tambahkan Tugas'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* ── Modal Add / Edit Milestone ────────────────────────────── */}
      <Modal
        isOpen={isMilestoneModalOpen}
        onClose={() => setIsMilestoneModalOpen(false)}
        title={editingMilestone ? 'Edit Acara Penting' : 'Tambah Rangkaian Acara / Milestone'}
      >
        <form onSubmit={handleSaveMilestone} className="space-y-4">
          {mFormError && (
            <div className="p-3 rounded-lg bg-rose-50 text-rose-800 text-xs border border-rose-200">
              {mFormError}
            </div>
          )}

          <Input
            label="Nama Acara / Prosesi"
            placeholder="Contoh: Lamaran & Pertunangan atau Pengajian"
            value={mTitle}
            onChange={(e) => setMTitle(e.target.value)}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Tanggal Acara"
              type="date"
              value={mDate}
              onChange={(e) => setMDate(e.target.value)}
              required
            />
            <Input
              label="Waktu / Jam (WIB)"
              placeholder="Contoh: 10:00"
              value={mTime}
              onChange={(e) => setMTime(e.target.value)}
            />
          </div>

          <Input
            label="Tempat / Lokasi Acara"
            placeholder="Contoh: Kediaman Mempelai Wanita, Jakarta"
            value={mVenue}
            onChange={(e) => setMVenue(e.target.value)}
          />

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">
              Kategori Acara
            </label>
            <select
              value={mCategory}
              onChange={(e) => setMCategory(e.target.value as MilestoneCategory)}
              className="w-full bg-[#FCFCFC] border border-neutral-200 text-xs rounded-lg p-2.5 focus:outline-none focus:border-slate-900"
            >
              <option value="ceremony">Upacara Utama (Akad / Resepsi)</option>
              <option value="traditional">Prosesi Adat (Lamaran, Siraman, Midodareni, Sangjit)</option>
              <option value="meeting">Rapat &amp; Gladi Resik Vendor</option>
              <option value="deadline">Tenggat Waktu Penting</option>
              <option value="other">Acara Lainnya</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">
              Deskripsi / Catatan Acara (Opsional)
            </label>
            <textarea
              rows={3}
              value={mDescription}
              onChange={(e) => setMDescription(e.target.value)}
              placeholder="Rincian susunan acara, pakaian/dresscode, atau persiapan yang dibutuhkan..."
              className="w-full bg-[#FCFCFC] border border-neutral-200 text-xs rounded-lg p-2.5 focus:outline-none focus:border-slate-900 resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-100">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setIsMilestoneModalOpen(false)}
            >
              Batal
            </Button>
            <Button type="submit" variant="primary" size="sm">
              {editingMilestone ? 'Simpan Perubahan' : 'Tambahkan Acara'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
