import React from 'react';
import {
  Users,
  CheckCircle2,
  Wallet,
  CheckSquare,
  Clock,
  ArrowRight,
  Sparkles,
  UserCheck,
  UserX,
  ExternalLink,
  Calendar,
} from 'lucide-react';
import { Wedding } from '@/types/wedding';
import { Guest, RSVP } from '@/types/guest';
import { PlannerTask } from '@/types/planner';
import { BudgetItem } from '@/types/budget';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatRupiah, calculateTimeLeft, formatDateIndo } from '@/lib/utils';

export interface OverviewTabProps {
  wedding: Wedding;
  guests: Guest[];
  rsvps: RSVP[];
  tasks: PlannerTask[];
  budget: BudgetItem[];
  onNavigateTab: (tab: string) => void;
  onViewInvitation: () => void;
}

export function OverviewTab({
  wedding,
  guests,
  rsvps,
  tasks,
  budget,
  onNavigateTab,
  onViewInvitation,
}: OverviewTabProps) {
  const timeLeft = calculateTimeLeft(wedding.weddingDate);

  const attendingCount = rsvps
    .filter((r) => r.attendance === 'attending')
    .reduce((acc, curr) => acc + curr.guestCount, 0);

  const declinedCount = rsvps.filter((r) => r.attendance === 'declined').length;

  const totalEstimatedBudget = budget.reduce((acc, curr) => acc + curr.estimatedCost, 0);
  const totalActualBudget = budget.reduce((acc, curr) => acc + curr.actualCost, 0);

  const pendingTasks = tasks.filter((t) => t.columnId !== 'done');
  const completedTasks = tasks.filter((t) => t.columnId === 'done');

  return (
    <div className="space-y-8 animate-in fade-in duration-150">
      {/* Welcome Banner & Countdown */}
      <div className="relative overflow-hidden bg-white rounded-2xl border border-neutral-200/80 p-6 sm:p-8 shadow-xs">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-medium text-slate-500 block mb-1">
              Selamat datang kembali,
            </span>
            <h2 className="font-brand text-3xl sm:text-4xl text-neutral-900 mb-2">
              {wedding.groomName.split(' ')[0]} & {wedding.brideName.split(' ')[0]}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 font-light">
              {wedding.weddingDate ? (
                <>
                  Menuju hari istimewa Anda pada <strong className="font-semibold text-neutral-900">{formatDateIndo(wedding.weddingDate)}</strong>.
                </>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200 text-xs">
                  <span>Tanggal pernikahan belum diatur.</span>
                  <button
                    type="button"
                    onClick={() => onNavigateTab('wedding')}
                    className="underline hover:text-amber-950 font-semibold"
                  >
                    Atur Sekarang →
                  </button>
                </span>
              )}
            </p>
          </div>

          {/* Mini Countdown Card */}
          {wedding.weddingDate ? (
            <div className="flex items-center gap-3 bg-neutral-50/80 p-4 rounded-xl border border-neutral-200/70 shadow-2xs">
              <div className="text-center px-2">
                <span className="font-brand text-2xl font-bold text-neutral-900 block leading-none">
                  {timeLeft.days}
                </span>
                <span className="text-xs text-slate-500 font-medium">Hari</span>
              </div>
              <span className="text-neutral-300 font-light">:</span>
              <div className="text-center px-2">
                <span className="font-brand text-2xl font-bold text-neutral-900 block leading-none">
                  {timeLeft.hours}
                </span>
                <span className="text-xs text-slate-500 font-medium">Jam</span>
              </div>
              <span className="text-neutral-300 font-light">:</span>
              <div className="text-center px-2">
                <span className="font-brand text-2xl font-bold text-neutral-900 block leading-none">
                  {timeLeft.minutes}
                </span>
                <span className="text-xs text-slate-500 font-medium">Menit</span>
              </div>
            </div>
          ) : (
            <div
              onClick={() => onNavigateTab('wedding')}
              className="cursor-pointer group flex items-center gap-2.5 bg-neutral-50 px-4 py-3 rounded-xl border border-dashed border-neutral-300 hover:border-neutral-400 transition-colors shadow-2xs"
            >
              <Calendar className="w-5 h-5 text-neutral-500 group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <span className="text-xs font-semibold text-neutral-900 block leading-tight">Countdown Belum Aktif</span>
                <span className="text-[10px] text-neutral-500">Klik untuk atur tanggal</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Guests */}
        <Card hoverable onClick={() => onNavigateTab('guests')} className="cursor-pointer">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-slate-700">
              Total Tamu
            </span>
            <div className="w-8 h-8 rounded-xl bg-neutral-100 text-[#263238] flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#263238] mb-1">{guests.length}</p>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="text-[#3D6420] font-medium">{attendingCount} hadir</span>
            <span>•</span>
            <span>{guests.filter(g => g.rsvpStatus === 'pending').length} menunggu</span>
          </div>
        </Card>

        {/* RSVP Summary */}
        <Card hoverable onClick={() => onNavigateTab('guests')} className="cursor-pointer">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-slate-700">
              RSVP Terkonfirmasi
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#B9DCA9]/30 text-[#3D6420] flex items-center justify-center border border-[#B9DCA9]/40">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#263238] mb-1">{rsvps.length}</p>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="text-[#3D6420] font-medium">{attendingCount} orang hadir</span>
            <span>•</span>
            <span className="text-[#B83D58]">{declinedCount} berhalangan</span>
          </div>
        </Card>

        {/* Budget Summary */}
        <Card hoverable onClick={() => onNavigateTab('budget')} className="cursor-pointer">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-slate-700">
              Total Realisasi Biaya
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#FFEAAB]/40 text-[#7A5D00] flex items-center justify-center border border-[#FFEAAB]/60">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <p className="text-xl font-bold text-[#263238] mb-1 truncate">{formatRupiah(totalActualBudget)}</p>
          <p className="text-xs text-slate-500 truncate">
            dari estimasi {formatRupiah(totalEstimatedBudget)}
          </p>
        </Card>

        {/* Planner Tasks */}
        <Card hoverable onClick={() => onNavigateTab('planner')} className="cursor-pointer">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-slate-700">
              Wedding Planner
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#FCBACB]/30 text-[#7D4050] flex items-center justify-center border border-[#FCBACB]/50">
              <CheckSquare className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#263238] mb-1">{completedTasks.length}/{tasks.length}</p>
          <p className="text-xs text-slate-500">
            {pendingTasks.length} tugas masih berjalan
          </p>
        </Card>
      </div>

      {/* Main Split Grid: Upcoming Tasks & Recent RSVP */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Upcoming Tasks */}
        <div className="bg-white rounded-xl border border-neutral-100 p-6 shadow-subtle flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-slate-700" />
                <h3 className="font-semibold text-slate-900">Tugas Menjelang Hari H</h3>
              </div>
              <button
                onClick={() => onNavigateTab('planner')}
                className="text-xs text-slate-600 font-medium hover:text-slate-950 flex items-center gap-1"
              >
                Lihat Semua
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2.5">
              {pendingTasks.slice(0, 4).map((task) => (
                <div
                  key={task.id}
                  className="p-3.5 rounded-lg border border-neutral-100 bg-[#FCFCFC] flex items-center justify-between hover:border-neutral-300 transition-colors"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-2 h-2 rounded-full bg-slate-400 flex-shrink-0" />
                    <div className="truncate">
                      <p className="text-xs font-semibold text-neutral-900 truncate">{task.title}</p>
                      <span className="text-xs text-slate-500">{task.category}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge variant={task.priority === 'high' ? 'error' : task.priority === 'medium' ? 'warning' : 'neutral'} size="sm">
                      {task.priority === 'high' ? 'Tinggi' : task.priority === 'medium' ? 'Sedang' : 'Rendah'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => onNavigateTab('planner')}
            className="w-full mt-5 text-xs"
          >
            Buka Papan Planner (Kanban)
          </Button>
        </div>

        {/* Right: Recent RSVPs */}
        <div className="bg-white rounded-xl border border-neutral-100 p-6 shadow-subtle flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-slate-700" />
                <h3 className="font-semibold text-neutral-900">Konfirmasi Kehadiran Terbaru</h3>
              </div>
              <button
                onClick={() => onNavigateTab('guests')}
                className="text-xs text-neutral-700 font-semibold hover:text-neutral-950 flex items-center gap-1"
              >
                Kelola Tamu
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2.5">
              {rsvps.slice(0, 4).map((rsvp) => (
                <div
                  key={rsvp.id}
                  className="p-3 rounded-lg border border-neutral-100 bg-[#FCFCFC] flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-neutral-900">{rsvp.name}</span>
                      <Badge variant={rsvp.attendance === 'attending' ? 'success' : 'error'} size="sm">
                        {rsvp.attendance === 'attending' ? `Hadir (${rsvp.guestCount} pax)` : 'Tidak Hadir'}
                      </Badge>
                    </div>
                    {rsvp.message && (
                      <p className="text-xs text-slate-500 italic mt-0.5 truncate max-w-xs">
                        "{rsvp.message}"
                      </p>
                    )}
                  </div>
                  <span className="text-xs text-slate-500">
                    {new Date(rsvp.submittedAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                    })}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 mt-5">
            <Button
              variant="outline"
              size="sm"
              onClick={onViewInvitation}
              icon={<ExternalLink className="w-3.5 h-3.5" />}
              className="flex-1 text-xs"
            >
              Undangan Publik
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => onNavigateTab('editor')}
              icon={<Sparkles className="w-3.5 h-3.5 text-white" />}
              className="flex-1 text-xs"
            >
              Edit Undangan
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
