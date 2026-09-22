import React, { useState, useEffect } from 'react';
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { api } from '@/lib/api';
import { INITIAL_WEDDING, INITIAL_INVITATION } from '@/lib/seed';
import { User } from '@/types/user';
import { Wedding } from '@/types/wedding';
import { Invitation } from '@/types/invitation';
import { Guest, RSVP, GuestbookEntry } from '@/types/guest';
import { PlannerTask } from '@/types/planner';
import { BudgetItem } from '@/types/budget';
import { Vendor } from '@/types/vendor';
import { ToastContainer, ToastMessage } from '@/components/ui/Toast';

import { LandingPage } from '@/views/LandingPage';
import { AuthView } from '@/views/AuthView';
import { InvitationView } from '@/views/InvitationView';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

import { OverviewTab } from '@/views/dashboard/OverviewTab';
import { EditorTab } from '@/views/dashboard/EditorTab';
import { GuestsTab } from '@/views/dashboard/GuestsTab';
import { PlannerTab } from '@/views/dashboard/PlannerTab';
import { BudgetTab } from '@/views/dashboard/BudgetTab';
import { VendorsTab } from '@/views/dashboard/VendorsTab';
import { MediaTab } from '@/views/dashboard/MediaTab';
import { SettingsTab } from '@/views/dashboard/SettingsTab';

interface DashboardContentProps {
  user: User;
  wedding: Wedding;
  invitation: Invitation;
  guests: Guest[];
  rsvps: RSVP[];
  guestbook: GuestbookEntry[];
  tasks: PlannerTask[];
  budget: BudgetItem[];
  vendors: Vendor[];
  onUpdateWedding: (updated: Wedding) => Promise<void>;
  onUpdateInvitation: (updated: Invitation) => Promise<void>;
  onAddGuest: (payload: any) => Promise<void>;
  onUpdateGuest: (updated: Guest) => Promise<void>;
  onDeleteGuest: (id: string) => Promise<void>;
  onDeleteGuestbook: (id: string) => Promise<void>;
  onAddTask: (payload: any) => Promise<void>;
  onUpdateTask: (updated: PlannerTask) => Promise<void>;
  onDeleteTask: (id: string) => Promise<void>;
  onAddBudgetItem: (payload: any) => Promise<void>;
  onUpdateBudgetItem: (updated: BudgetItem) => Promise<void>;
  onDeleteBudgetItem: (id: string) => Promise<void>;
  onAddVendor: (payload: any) => Promise<void>;
  onUpdateVendor: (updated: Vendor) => Promise<void>;
  onDeleteVendor: (id: string) => Promise<void>;
  onResetData: () => Promise<void>;
  onLogout: () => Promise<void>;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

function DashboardContent({
  user,
  wedding,
  invitation,
  guests,
  rsvps,
  guestbook,
  tasks,
  budget,
  vendors,
  onUpdateWedding,
  onUpdateInvitation,
  onAddGuest,
  onUpdateGuest,
  onDeleteGuest,
  onDeleteGuestbook,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
  onAddBudgetItem,
  onUpdateBudgetItem,
  onDeleteBudgetItem,
  onAddVendor,
  onUpdateVendor,
  onDeleteVendor,
  onResetData,
  onLogout,
  showToast,
}: DashboardContentProps) {
  const { tab } = useParams<{ tab?: string }>();
  const navigate = useNavigate();
  const validTabs = [
    'overview',
    'wedding',
    'editor',
    'guests',
    'planner',
    'budget',
    'vendors',
    'media',
    'settings',
  ];
  const activeTab = tab && validTabs.includes(tab) ? tab : 'overview';

  return (
    <DashboardLayout
      user={user}
      wedding={wedding}
      activeTab={activeTab}
      onTabChange={(newTab) => navigate(`/dashboard/${newTab}`)}
      onViewInvitation={() => navigate('/invitation')}
      onLogout={onLogout}
    >
      {activeTab === 'overview' && (
        <OverviewTab
          wedding={wedding}
          guests={guests}
          rsvps={rsvps}
          tasks={tasks}
          budget={budget}
          onNavigateTab={(newTab) => navigate(`/dashboard/${newTab}`)}
          onViewInvitation={() => navigate('/invitation')}
        />
      )}

      {activeTab === 'wedding' && (
        <SettingsTab
          wedding={wedding}
          onUpdateWedding={onUpdateWedding}
          onShowToast={showToast}
          onResetData={onResetData}
        />
      )}

      {activeTab === 'editor' && (
        <EditorTab
          wedding={wedding}
          invitation={invitation}
          onSaveInvitation={onUpdateInvitation}
          onViewInvitation={() => navigate('/invitation')}
          onShowToast={showToast}
        />
      )}

      {activeTab === 'guests' && (
        <GuestsTab
          wedding={wedding}
          guests={guests}
          rsvps={rsvps}
          guestbook={guestbook}
          onAddGuest={onAddGuest}
          onUpdateGuest={onUpdateGuest}
          onDeleteGuest={onDeleteGuest}
          onDeleteGuestbookEntry={onDeleteGuestbook}
          onShowToast={showToast}
        />
      )}

      {activeTab === 'planner' && (
        <PlannerTab
          wedding={wedding}
          tasks={tasks}
          onAddTask={onAddTask}
          onUpdateTask={onUpdateTask}
          onDeleteTask={onDeleteTask}
          onShowToast={showToast}
        />
      )}

      {activeTab === 'budget' && (
        <BudgetTab
          wedding={wedding}
          budget={budget}
          onAddBudgetItem={onAddBudgetItem}
          onUpdateBudgetItem={onUpdateBudgetItem}
          onDeleteBudgetItem={onDeleteBudgetItem}
          onShowToast={showToast}
        />
      )}

      {activeTab === 'vendors' && (
        <VendorsTab
          wedding={wedding}
          vendors={vendors}
          onAddVendor={onAddVendor}
          onUpdateVendor={onUpdateVendor}
          onDeleteVendor={onDeleteVendor}
          onShowToast={showToast}
        />
      )}

      {activeTab === 'media' && (
        <MediaTab
          wedding={wedding}
          invitation={invitation}
          onUpdateInvitation={onUpdateInvitation}
          onShowToast={showToast}
        />
      )}

      {activeTab === 'settings' && (
        <SettingsTab
          wedding={wedding}
          onUpdateWedding={onUpdateWedding}
          onShowToast={showToast}
          onResetData={onResetData}
        />
      )}
    </DashboardLayout>
  );
}

function InvitationRoute({
  wedding,
  invitation,
  currentUser,
}: {
  wedding: Wedding;
  invitation: Invitation;
  currentUser: User | null;
}) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const guestToken = searchParams.get('to') || undefined;

  return (
    <InvitationView
      wedding={wedding}
      invitation={invitation}
      guestToken={guestToken}
      onBackToDashboard={() => navigate(currentUser ? '/dashboard' : '/')}
    />
  );
}

function ProtectedRoute({
  isAuthLoading,
  currentUser,
  wedding,
  children,
}: {
  isAuthLoading: boolean;
  currentUser: User | null;
  wedding: Wedding;
  children: React.ReactNode;
}) {
  if (isAuthLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FCFCFC]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-slate-900 border-t-transparent"></div>
          <p className="text-sm text-slate-600 font-medium">Memeriksa sesi pengguna...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (!wedding.id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FCFCFC]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-slate-900 border-t-transparent"></div>
          <p className="text-sm text-slate-600 font-medium">Memuat data pernikahan...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

export function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // Loading state for initial session verification
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);

  // Notifications State
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const newToast: ToastMessage = {
      id: `toast-${Date.now()}-${Math.random()}`,
      message,
      type,
    };
    setToasts((prev) => [...prev, newToast]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Entity States from API
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [wedding, setWedding] = useState<Wedding>(INITIAL_WEDDING);
  const [invitation, setInvitation] = useState<Invitation>(INITIAL_INVITATION);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [guestbook, setGuestbook] = useState<GuestbookEntry[]>([]);
  const [tasks, setTasks] = useState<PlannerTask[]>([]);
  const [budget, setBudget] = useState<BudgetItem[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);

  // Sync state when wedding changes
  const reloadWeddingData = async (targetWedding: Wedding) => {
    setWedding(targetWedding);
    try {
      const [inv, g, r, gb, t, b, v] = await Promise.all([
        api.getInvitation(targetWedding.id).catch(() => INITIAL_INVITATION),
        api.getGuests(targetWedding.id).catch(() => []),
        api.getRSVPs(targetWedding.id).catch(() => []),
        api.getGuestbook(targetWedding.id).catch(() => []),
        api.getTasks(targetWedding.id).catch(() => []),
        api.getBudget(targetWedding.id).catch(() => []),
        api.getVendors(targetWedding.id).catch(() => []),
      ]);
      setInvitation(inv);
      setGuests(g);
      setRsvps(r);
      setGuestbook(gb);
      setTasks(t);
      setBudget(b);
      setVendors(v);
    } catch (err) {
      console.error('Error reloading wedding data:', err);
    }
  };

  // Check URL query and auth session on initial load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const weddingParam = params.get('wedding');
    const toParam = params.get('to');

    // If query parameters exist on root URL, redirect cleanly to /invitation
    if ((weddingParam || toParam) && location.pathname === '/') {
      navigate(`/invitation${window.location.search}`, { replace: true });
    }

    // Check active login session
    api.getCurrentUser()
      .then((res) => {
        if (res.user && res.wedding) {
          setCurrentUser(res.user);
          reloadWeddingData(res.wedding);
        }
      })
      .catch(() => {})
      .finally(() => {
        setIsAuthLoading(false);
      });
  }, []);

  const handleAuthSuccess = async () => {
    try {
      const res = await api.getCurrentUser();
      if (res.user && res.wedding) {
        setCurrentUser(res.user);
        await reloadWeddingData(res.wedding);
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Auth success error:', err);
    }
  };

  const handleLogout = async () => {
    try {
      await api.logout();
    } catch (err) {
      console.error(err);
    }
    setCurrentUser(null);
    navigate('/');
    showToast('Anda telah berhasil keluar.', 'info');
  };

  const handleResetData = async () => {
    try {
      const res = await api.resetDemoData();
      setCurrentUser(res.user);
      await reloadWeddingData(res.wedding);
      showToast('Data demo Andi & Sari berhasil direset ke awal!', 'success');
    } catch (err: any) {
      showToast(err.message || 'Gagal mereset data demo.', 'error');
    }
  };

  // Entity Handlers
  const handleUpdateWedding = async (updated: Wedding) => {
    try {
      const saved = await api.updateWedding(updated.id, updated);
      setWedding(saved);
      showToast('Pengaturan pernikahan berhasil disimpan!', 'success');
    } catch (err: any) {
      showToast(err.message || 'Gagal menyimpan pernikahan', 'error');
    }
  };

  const handleUpdateInvitation = async (updated: Invitation) => {
    try {
      const saved = await api.updateInvitation(wedding.id, updated);
      setInvitation(saved);
      showToast('Desain undangan berhasil diperbarui!', 'success');
    } catch (err: any) {
      showToast(err.message || 'Gagal menyimpan undangan', 'error');
    }
  };

  const handleAddGuest = async (payload: any) => {
    try {
      await api.addGuest(wedding.id, payload);
      const updatedGuests = await api.getGuests(wedding.id);
      setGuests(updatedGuests);
      showToast('Tamu berhasil ditambahkan!', 'success');
    } catch (err: any) {
      showToast(err.message || 'Gagal menambah tamu', 'error');
    }
  };

  const handleUpdateGuest = async (updated: Guest) => {
    try {
      await api.updateGuest(wedding.id, updated.id, updated);
      const updatedGuests = await api.getGuests(wedding.id);
      setGuests(updatedGuests);
      showToast('Data tamu berhasil diperbarui', 'success');
    } catch (err: any) {
      showToast(err.message || 'Gagal memperbarui tamu', 'error');
    }
  };

  const handleDeleteGuest = async (id: string) => {
    try {
      await api.deleteGuest(wedding.id, id);
      setGuests((prev) => prev.filter((g) => g.id !== id));
      showToast('Tamu berhasil dihapus', 'info');
    } catch (err: any) {
      showToast(err.message || 'Gagal menghapus tamu', 'error');
    }
  };

  const handleDeleteGuestbook = async (id: string) => {
    try {
      await api.deleteGuestbook(wedding.id, id);
      setGuestbook((prev) => prev.filter((g) => g.id !== id));
      showToast('Ucapan berhasil dihapus dari buku tamu', 'info');
    } catch (err: any) {
      showToast(err.message || 'Gagal menghapus ucapan', 'error');
    }
  };

  const handleAddTask = async (payload: any) => {
    try {
      await api.addTask(wedding.id, payload);
      const updatedTasks = await api.getTasks(wedding.id);
      setTasks(updatedTasks);
      showToast('Tugas berhasil ditambahkan ke planner', 'success');
    } catch (err: any) {
      showToast(err.message || 'Gagal menambah tugas', 'error');
    }
  };

  const handleUpdateTask = async (updated: PlannerTask) => {
    try {
      await api.updateTask(wedding.id, updated.id, updated);
      const updatedTasks = await api.getTasks(wedding.id);
      setTasks(updatedTasks);
    } catch (err: any) {
      showToast(err.message || 'Gagal memperbarui tugas', 'error');
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await api.deleteTask(wedding.id, id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
      showToast('Tugas berhasil dihapus dari planner', 'info');
    } catch (err: any) {
      showToast(err.message || 'Gagal menghapus tugas', 'error');
    }
  };

  const handleAddBudgetItem = async (payload: any) => {
    try {
      await api.addBudgetItem(wedding.id, payload);
      const updatedBudget = await api.getBudget(wedding.id);
      setBudget(updatedBudget);
      showToast('Pos anggaran berhasil ditambahkan', 'success');
    } catch (err: any) {
      showToast(err.message || 'Gagal menambah pos anggaran', 'error');
    }
  };

  const handleUpdateBudgetItem = async (updated: BudgetItem) => {
    try {
      await api.updateBudgetItem(wedding.id, updated.id, updated);
      const updatedBudget = await api.getBudget(wedding.id);
      setBudget(updatedBudget);
    } catch (err: any) {
      showToast(err.message || 'Gagal memperbarui pos anggaran', 'error');
    }
  };

  const handleDeleteBudgetItem = async (id: string) => {
    try {
      await api.deleteBudgetItem(wedding.id, id);
      setBudget((prev) => prev.filter((b) => b.id !== id));
      showToast('Pos anggaran berhasil dihapus', 'info');
    } catch (err: any) {
      showToast(err.message || 'Gagal menghapus pos anggaran', 'error');
    }
  };

  const handleAddVendor = async (payload: any) => {
    try {
      await api.addVendor(wedding.id, payload);
      const updatedVendors = await api.getVendors(wedding.id);
      setVendors(updatedVendors);
      showToast('Vendor baru berhasil ditambahkan', 'success');
    } catch (err: any) {
      showToast(err.message || 'Gagal menambah vendor', 'error');
    }
  };

  const handleUpdateVendor = async (updated: Vendor) => {
    try {
      await api.updateVendor(wedding.id, updated.id, updated);
      const updatedVendors = await api.getVendors(wedding.id);
      setVendors(updatedVendors);
    } catch (err: any) {
      showToast(err.message || 'Gagal memperbarui vendor', 'error');
    }
  };

  const handleDeleteVendor = async (id: string) => {
    try {
      await api.deleteVendor(wedding.id, id);
      setVendors((prev) => prev.filter((v) => v.id !== id));
      showToast('Vendor berhasil dihapus dari direktori', 'info');
    } catch (err: any) {
      showToast(err.message || 'Gagal menghapus vendor', 'error');
    }
  };

  const dashboardProps: DashboardContentProps = {
    user: currentUser!,
    wedding,
    invitation,
    guests,
    rsvps,
    guestbook,
    tasks,
    budget,
    vendors,
    onUpdateWedding: handleUpdateWedding,
    onUpdateInvitation: handleUpdateInvitation,
    onAddGuest: handleAddGuest,
    onUpdateGuest: handleUpdateGuest,
    onDeleteGuest: handleDeleteGuest,
    onDeleteGuestbook: handleDeleteGuestbook,
    onAddTask: handleAddTask,
    onUpdateTask: handleUpdateTask,
    onDeleteTask: handleDeleteTask,
    onAddBudgetItem: handleAddBudgetItem,
    onUpdateBudgetItem: handleUpdateBudgetItem,
    onDeleteBudgetItem: handleDeleteBudgetItem,
    onAddVendor: handleAddVendor,
    onUpdateVendor: handleUpdateVendor,
    onDeleteVendor: handleDeleteVendor,
    onResetData: handleResetData,
    onLogout: handleLogout,
    showToast,
  };

  return (
    <>
      <ToastContainer toasts={toasts} onClose={removeToast} />

      <Routes>
        {/* 1. LANDING PAGE */}
        <Route
          path="/"
          element={
            <LandingPage
              onNavigate={(v) => {
                if (v === 'invitation-demo') {
                  navigate('/invitation');
                } else if (v === 'login') {
                  navigate('/login');
                } else if (v === 'register') {
                  navigate('/register');
                } else if (v === 'dashboard') {
                  if (!currentUser) {
                    navigate('/login');
                    showToast('Silakan masuk terlebih dahulu.', 'info');
                  } else {
                    navigate('/dashboard');
                  }
                } else {
                  navigate('/');
                }
              }}
              isLoggedIn={!!currentUser}
              onLogout={handleLogout}
            />
          }
        />

        {/* 2. AUTHENTICATION (Login) */}
        <Route
          path="/login"
          element={
            currentUser ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <AuthView
                initialMode="login"
                onSuccess={handleAuthSuccess}
                onBackToLanding={() => navigate('/')}
                onShowToast={showToast}
                onModeChange={(m) => navigate(`/${m}`, { replace: true })}
              />
            )
          }
        />

        {/* 3. AUTHENTICATION (Register) */}
        <Route
          path="/register"
          element={
            currentUser ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <AuthView
                initialMode="register"
                onSuccess={handleAuthSuccess}
                onBackToLanding={() => navigate('/')}
                onShowToast={showToast}
                onModeChange={(m) => navigate(`/${m}`, { replace: true })}
              />
            )
          }
        />

        {/* 4. DIGITAL INVITATION */}
        <Route
          path="/invitation"
          element={
            <InvitationRoute
              wedding={wedding}
              invitation={invitation}
              currentUser={currentUser}
            />
          }
        />
        <Route
          path="/demo"
          element={
            <InvitationRoute
              wedding={wedding}
              invitation={invitation}
              currentUser={currentUser}
            />
          }
        />

        {/* 5. COUPLE MANAGEMENT DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              isAuthLoading={isAuthLoading}
              currentUser={currentUser}
              wedding={wedding}
            >
              <DashboardContent {...dashboardProps} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/:tab"
          element={
            <ProtectedRoute
              isAuthLoading={isAuthLoading}
              currentUser={currentUser}
              wedding={wedding}
            >
              <DashboardContent {...dashboardProps} />
            </ProtectedRoute>
          }
        />

        {/* 6. FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
