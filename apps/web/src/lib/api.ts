import { User } from '@/types/user';
import { Wedding } from '@/types/wedding';
import { Invitation } from '@/types/invitation';
import { Guest, RSVP, GuestbookEntry } from '@/types/guest';
import { PlannerTask, WeddingMilestone } from '@/types/planner';
import { BudgetItem } from '@/types/budget';
import { Vendor } from '@/types/vendor';
import { SeserahanBox, SeserahanItem } from '@/types/seserahan';

async function fetchApi<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ error: 'Permintaan gagal' }));
    throw new Error(errorData.error || errorData.message || `Error ${res.status}`);
  }

  return res.json();
}

export const api = {
  // Auth
  async getCurrentUser(): Promise<{ user: User | null; wedding: Wedding | null }> {
    return fetchApi('/api/auth/me');
  },
  async login(email: string, password?: string): Promise<{ user: User; wedding: Wedding | null }> {
    return fetchApi('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },
  async register(name: string, email: string, weddingSlug: string, password = 'password123'): Promise<{ user: User; wedding: Wedding }> {
    return fetchApi('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, weddingSlug, password }),
    });
  },
  async loginDemo(): Promise<{ user: User; wedding: Wedding }> {
    return fetchApi('/api/auth/demo', { method: 'POST' });
  },
  async resetDemoData(): Promise<{ user: User; wedding: Wedding }> {
    return fetchApi('/api/auth/reset', { method: 'POST' });
  },
  async logout(): Promise<void> {
    await fetchApi('/api/auth/logout', { method: 'POST' });
  },

  // Weddings
  async getWeddings(): Promise<Wedding[]> {
    return fetchApi('/api/weddings');
  },
  async getWedding(weddingId: string): Promise<Wedding> {
    return fetchApi(`/api/weddings/${weddingId}`);
  },
  async updateWedding(weddingId: string, payload: Partial<Wedding>): Promise<Wedding> {
    return fetchApi(`/api/weddings/${weddingId}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
  },

  // Invitations
  async getInvitation(weddingId: string): Promise<Invitation> {
    return fetchApi(`/api/weddings/${weddingId}/invitation`);
  },
  async updateInvitation(weddingId: string, payload: Partial<Invitation>): Promise<Invitation> {
    return fetchApi(`/api/weddings/${weddingId}/invitation`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
  },

  // Guests
  async getGuests(weddingId: string): Promise<Guest[]> {
    return fetchApi(`/api/guests/${weddingId}`);
  },
  async addGuest(weddingId: string, payload: Partial<Guest>): Promise<Guest> {
    return fetchApi(`/api/guests/${weddingId}`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
  async updateGuest(weddingId: string, guestId: string, payload: Partial<Guest>): Promise<Guest> {
    return fetchApi(`/api/guests/${weddingId}/${guestId}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
  },
  async deleteGuest(weddingId: string, guestId: string): Promise<void> {
    await fetchApi(`/api/guests/${weddingId}/${guestId}`, { method: 'DELETE' });
  },

  // RSVPs & Guestbook
  async getRSVPs(weddingId: string): Promise<RSVP[]> {
    return fetchApi(`/api/weddings/${weddingId}/rsvps`);
  },
  async getGuestbook(weddingId: string): Promise<GuestbookEntry[]> {
    return fetchApi(`/api/weddings/${weddingId}/guestbook`);
  },
  async deleteGuestbook(weddingId: string, id: string): Promise<void> {
    await fetchApi(`/api/weddings/${weddingId}/guestbook/${id}`, { method: 'DELETE' });
  },

  // Planner
  async getTasks(weddingId: string): Promise<PlannerTask[]> {
    return fetchApi(`/api/planner/${weddingId}`);
  },
  async addTask(weddingId: string, payload: Partial<PlannerTask>): Promise<PlannerTask> {
    return fetchApi(`/api/planner/${weddingId}/tasks`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
  async updateTask(weddingId: string, taskId: string, payload: Partial<PlannerTask>): Promise<PlannerTask> {
    return fetchApi(`/api/planner/${weddingId}/tasks/${taskId}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
  },
  async deleteTask(weddingId: string, taskId: string): Promise<void> {
    await fetchApi(`/api/planner/${weddingId}/tasks/${taskId}`, { method: 'DELETE' });
  },

  // Budget
  async getBudget(weddingId: string): Promise<BudgetItem[]> {
    return fetchApi(`/api/budget/${weddingId}`);
  },
  async addBudgetItem(weddingId: string, payload: Partial<BudgetItem>): Promise<BudgetItem> {
    return fetchApi(`/api/budget/${weddingId}`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
  async updateBudgetItem(weddingId: string, itemId: string, payload: Partial<BudgetItem>): Promise<BudgetItem> {
    return fetchApi(`/api/budget/${weddingId}/${itemId}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
  },
  async deleteBudgetItem(weddingId: string, itemId: string): Promise<void> {
    await fetchApi(`/api/budget/${weddingId}/${itemId}`, { method: 'DELETE' });
  },

  // Vendors
  async getVendors(weddingId: string): Promise<Vendor[]> {
    return fetchApi(`/api/vendors/${weddingId}`);
  },
  async addVendor(weddingId: string, payload: Partial<Vendor>): Promise<Vendor> {
    return fetchApi(`/api/vendors/${weddingId}`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
  async updateVendor(weddingId: string, vendorId: string, payload: Partial<Vendor>): Promise<Vendor> {
    return fetchApi(`/api/vendors/${weddingId}/${vendorId}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
  },
  async deleteVendor(weddingId: string, vendorId: string): Promise<void> {
    await fetchApi(`/api/vendors/${weddingId}/${vendorId}`, { method: 'DELETE' });
  },

  // Milestones
  async getMilestones(weddingId: string): Promise<WeddingMilestone[]> {
    return fetchApi(`/api/milestones/${weddingId}`);
  },
  async addMilestone(weddingId: string, payload: Partial<WeddingMilestone>): Promise<WeddingMilestone> {
    return fetchApi(`/api/milestones/${weddingId}`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
  async updateMilestone(weddingId: string, milestoneId: string, payload: Partial<WeddingMilestone>): Promise<WeddingMilestone> {
    return fetchApi(`/api/milestones/${weddingId}/${milestoneId}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
  },
  async deleteMilestone(weddingId: string, milestoneId: string): Promise<void> {
    await fetchApi(`/api/milestones/${weddingId}/${milestoneId}`, { method: 'DELETE' });
  },

  // Seserahan
  async getSeserahanBoxes(weddingId: string): Promise<SeserahanBox[]> {
    return fetchApi(`/api/seserahan/${weddingId}`);
  },
  async addSeserahanBox(weddingId: string, payload: Partial<SeserahanBox>): Promise<SeserahanBox> {
    return fetchApi(`/api/seserahan/${weddingId}/boxes`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
  async updateSeserahanBox(weddingId: string, boxId: string, payload: Partial<SeserahanBox>): Promise<SeserahanBox> {
    return fetchApi(`/api/seserahan/${weddingId}/boxes/${boxId}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
  },
  async deleteSeserahanBox(weddingId: string, boxId: string): Promise<void> {
    await fetchApi(`/api/seserahan/${weddingId}/boxes/${boxId}`, { method: 'DELETE' });
  },
  async addSeserahanItem(weddingId: string, payload: Partial<SeserahanItem>): Promise<SeserahanItem> {
    return fetchApi(`/api/seserahan/${weddingId}/items`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
  async updateSeserahanItem(weddingId: string, itemId: string, payload: Partial<SeserahanItem>): Promise<SeserahanItem> {
    return fetchApi(`/api/seserahan/${weddingId}/items/${itemId}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
  },
  async deleteSeserahanItem(weddingId: string, itemId: string): Promise<void> {
    await fetchApi(`/api/seserahan/${weddingId}/items/${itemId}`, { method: 'DELETE' });
  },

  // Public Invitation
  async getPublicInvitation(slug: string, token?: string): Promise<{
    wedding: Wedding;
    invitation: Invitation | null;
    guest: Guest | null;
    guestbook: GuestbookEntry[];
    rsvps: RSVP[];
  }> {
    const url = token ? `/api/public/invitation/${slug}?to=${encodeURIComponent(token)}` : `/api/public/invitation/${slug}`;
    return fetchApi(url);
  },
  async submitRSVP(payload: {
    weddingId: string | number;
    guestToken?: string;
    name: string;
    attendance: 'attending' | 'declined';
    guestCount: number;
    message?: string;
  }): Promise<{ message: string; rsvp: RSVP }> {
    return fetchApi('/api/public/rsvp', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  // Media
  async uploadMedia(file: File): Promise<{ url: string }> {
    const formData = new FormData();
    formData.append('file', file);
    
    // We cannot use fetchApi directly because it sets Content-Type to application/json
    // For FormData, the browser must set the Content-Type automatically with the boundary
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    
    if (!res.ok) {
      throw new Error(`Failed to upload file: ${res.statusText}`);
    }
    
    return res.json();
  },

  // Themes
  async getThemes(): Promise<any[]> {
    return fetchApi('/api/themes');
  },
  async getPackages(): Promise<any[]> {
    return fetchApi('/api/themes/packages');
  },
};
