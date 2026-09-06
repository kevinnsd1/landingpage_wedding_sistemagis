import { useState } from "react"
import { Link } from "react-router-dom"
import Navbar from "@/components/Navbar"
import SEO from "@/components/SEO"
import { 
  Wallet, 
  Plus, 
  CheckCircle2, 
  Trash2, 
  TrendingUp, 
  PieChart as PieChartIcon, 
  Clock, 
  Coins,
  Pencil,
  Circle,
  AlertTriangle
} from "lucide-react"

interface ExpenseItem {
  id: string
  category: string
  name: string
  estimatedCost: number
  actualCost: number
  status: "Belum" | "DP" | "Lunas"
}

interface SavingsItem {
  id: string
  source: "CPP (Pria)" | "CPW (Wanita)" | "Bersama"
  note: string
  amount: number
  date: string
}

const defaultExpenses: ExpenseItem[] = [
  { id: "1", category: "Venue & Catering", name: "Sewa Gedung Resepsi", estimatedCost: 25000000, actualCost: 25000000, status: "DP" },
  { id: "2", category: "Venue & Catering", name: "Catering 500 Porsi", estimatedCost: 35000000, actualCost: 35000000, status: "Belum" },
  { id: "3", category: "Dekorasi & MUA", name: "Dekorasi Pelaminan & Florist", estimatedCost: 15000000, actualCost: 15000000, status: "DP" },
  { id: "4", category: "Dekorasi & MUA", name: "MUA Pengantin & Busana Resepsi", estimatedCost: 10000000, actualCost: 10000000, status: "Lunas" },
  { id: "5", category: "Dokumentasi", name: "Foto & Video Film Hari-H", estimatedCost: 8000000, actualCost: 8000000, status: "Belum" },
  { id: "6", category: "Undangan & Souvenir", name: "Undangan Digital Magis Premium", estimatedCost: 150000, actualCost: 150000, status: "Lunas" },
  { id: "7", category: "Undangan & Souvenir", name: "Souvenir Tamu 300 pcs", estimatedCost: 3000000, actualCost: 3000000, status: "Belum" },
  { id: "8", category: "Cincin & Mahar", name: "Cincin Nikah Emas Putih Pair", estimatedCost: 7000000, actualCost: 7000000, status: "Lunas" },
]

const defaultSavings: SavingsItem[] = [
  { id: "s1", source: "CPP (Pria)", note: "Tabungan Bulanan Pria", amount: 35000000, date: "2026-01-15" },
  { id: "s2", source: "CPW (Wanita)", note: "Tabungan Bulanan Wanita", amount: 30000000, date: "2026-01-20" },
  { id: "s3", source: "Bersama", note: "Bonus Tahunan Kerja", amount: 10000000, date: "2026-02-01" },
]

const initialChecklists = [
  { id: "c1", period: "H-12 Bulan", task: "Tentukan Budget & Konsep Pernikahan", done: true },
  { id: "c2", period: "H-12 Bulan", task: "Booking Tanggal Gedung / Venue", done: true },
  { id: "c3", period: "H-6 Bulan", task: "Pilih MUA, Busana, & Dekorasi", done: true },
  { id: "c4", period: "H-3 Bulan", task: "Urus Berkas Nikah di KUA", done: false },
  { id: "c5", period: "H-1 Bulan", task: "Buat & Sebar Undangan Digital Magis", done: false },
  { id: "c6", period: "H-2 Minggu", task: "Technical Meeting Vendor & Gladi Resik", done: false }
]

export default function WeddingPlannerPage() {
  const [targetBudget, setTargetBudget] = useState<number>(100000000)
  const [isEditingBudget, setIsEditingBudget] = useState<boolean>(false)
  const [tempBudget, setTempBudget] = useState<string>("100000000")

  const [expenses, setExpenses] = useState<ExpenseItem[]>(defaultExpenses)
  const [savings, setSavings] = useState<SavingsItem[]>(defaultSavings)
  const [checklists, setChecklists] = useState(initialChecklists)

  // New Expense Form State
  const [newExpName, setNewExpName] = useState("")
  const [newExpCategory, setNewExpCategory] = useState("Venue & Catering")
  const [newExpCost, setNewExpCost] = useState("")

  // New Savings Form State
  const [newSavSource, setNewSavSource] = useState<"CPP (Pria)" | "CPW (Wanita)" | "Bersama">("CPP (Pria)")
  const [newSavNote, setNewSavNote] = useState("")
  const [newSavAmount, setNewSavAmount] = useState("")

  // Calculations
  const totalSavings = savings.reduce((acc, curr) => acc + curr.amount, 0)
  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.estimatedCost, 0)
  const totalPaid = expenses.filter(e => e.status === "Lunas").reduce((acc, curr) => acc + curr.actualCost, 0)
  const totalDP = expenses.filter(e => e.status === "DP").reduce((acc, curr) => acc + curr.actualCost, 0)
  
  const remainingBudget = targetBudget - totalExpenses
  const savingsProgress = Math.min(Math.round((totalSavings / targetBudget) * 100), 100)

  const formatRp = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(num)
  }

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newExpName || !newExpCost) return
    const costNum = Number(newExpCost)
    if (isNaN(costNum)) return

    const newItem: ExpenseItem = {
      id: Date.now().toString(),
      category: newExpCategory,
      name: newExpName,
      estimatedCost: costNum,
      actualCost: costNum,
      status: "Belum"
    }

    setExpenses([...expenses, newItem])
    setNewExpName("")
    setNewExpCost("")
  }

  const handleAddSavings = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newSavNote || !newSavAmount) return
    const amtNum = Number(newSavAmount)
    if (isNaN(amtNum)) return

    const newItem: SavingsItem = {
      id: Date.now().toString(),
      source: newSavSource,
      note: newSavNote,
      amount: amtNum,
      date: new Date().toISOString().split("T")[0]
    }

    setSavings([...savings, newItem])
    setNewSavNote("")
    setNewSavAmount("")
  }

  const toggleExpenseStatus = (id: string) => {
    setExpenses(expenses.map(exp => {
      if (exp.id === id) {
        const nextStatus: ExpenseItem["status"] = 
          exp.status === "Belum" ? "DP" : exp.status === "DP" ? "Lunas" : "Belum"
        return { ...exp, status: nextStatus }
      }
      return exp
    }))
  }

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter(exp => exp.id !== id))
  }

  const deleteSavings = (id: string) => {
    setSavings(savings.filter(sav => sav.id !== id))
  }

  const toggleChecklist = (id: string) => {
    setChecklists(checklists.map(c => c.id === id ? { ...c, done: !c.done } : c))
  }

  const handleSaveTargetBudget = () => {
    const val = Number(tempBudget)
    if (!isNaN(val) && val > 0) {
      setTargetBudget(val)
    }
    setIsEditingBudget(false)
  }

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#2A2421] font-sans flex flex-col justify-between relative overflow-hidden">
      <SEO 
        title="Wedding Budget Tracker & Tabungan Pernikahan | Magis Planner"
        description="Hitung estimasi pengeluaran vendor nikah & kelola tabungan pernikahan bersama pasangan dengan aplikasi Wedding Planner & Budget Tracker Magis."
        keywords="wedding budget planner, kalkulator budget nikah, tabungan pernikahan bersama, manajemen vendor pernikahan, rincian biaya nikah"
        canonicalUrl="https://digitalinvitationmagis.com/wedding-planner"
      />
      
      {/* ================= 1. HEADER & HERO BANNER (BLUSH GRADIENT) ================= */}
      <div className="blush-gradient border-b border-[#EBE5DA]">
        <Navbar activePage="wedding-planner" />

        <section className="py-16 sm:py-24 px-6 text-center relative">
          <div className="max-w-4xl mx-auto space-y-4 relative z-10">

            <h1 className="font-serif-display text-4xl sm:text-6xl font-extrabold tracking-tight text-[#2A2421] leading-tight">
              Wedding Budget &amp; Savings Planner
            </h1>

            <p className="text-sm sm:text-base text-[#5A504A] max-w-2xl mx-auto font-light leading-relaxed">
              Kelola target budget pernikahan, lacak kontribusi tabungan bersama pasangan, dan hitung estimasi pengeluaran vendor secara akurat dalam 1 aplikasi praktis.
            </p>
          </div>
        </section>
      </div>

      {/* ================= 3. KPI SUMMARY CARDS ================= */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 -mt-8 relative z-30">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Target Budget Card */}
          <div className="bg-white p-6 rounded-3xl border border-[#EBE5DA] shadow-md space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-semibold tracking-wider text-[#78736A] uppercase">
                Target Total Budget
              </span>
              <div className="flex items-center gap-2">
                {!isEditingBudget && (
                  <button 
                    onClick={() => { setTempBudget(targetBudget.toString()); setIsEditingBudget(true); }}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#8C5B00] hover:text-[#2A2421] bg-[#FBF3DB] hover:bg-[#F5E5B8] border border-[#F5E5B8] px-2.5 py-1 rounded-full transition-colors cursor-pointer"
                  >
                    <Pencil className="w-3 h-3" /> Ubah
                  </button>
                )}
                <div className="w-8 h-8 rounded-xl bg-[#FBF3DB] text-[#8C5B00] flex items-center justify-center shrink-0">
                  <Wallet className="w-4 h-4" />
                </div>
              </div>
            </div>
            <div>
              {isEditingBudget ? (
                <div className="flex items-center gap-2 pt-1">
                  <input 
                    type="number"
                    value={tempBudget}
                    onChange={(e) => setTempBudget(e.target.value)}
                    className="w-full text-base font-bold border border-[#2A2421] rounded-md px-2 py-1 focus:outline-none"
                  />
                  <button 
                    onClick={handleSaveTargetBudget}
                    className="bg-[#2A2421] text-white text-xs px-3 py-1.5 rounded-md font-semibold shrink-0 cursor-pointer"
                  >
                    Simpan
                  </button>
                </div>
              ) : (
                <p className="font-serif-display text-2xl font-extrabold text-[#2A2421] pt-1">
                  {formatRp(targetBudget)}
                </p>
              )}
            </div>
            <p className="text-[11px] text-[#78736A]">Total anggaran impian Anda &amp; pasangan.</p>
          </div>

          {/* Tabungan Terkumpul Card */}
          <div className="bg-white p-6 rounded-3xl border border-[#EBE5DA] shadow-md space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-semibold tracking-wider text-[#78736A] uppercase">
                Tabungan Terkumpul
              </span>
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <p className="font-serif-display text-2xl font-extrabold text-[#2A2421]">
              {formatRp(totalSavings)}
            </p>
            {/* Progress Bar */}
            <div className="space-y-1">
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full transition-all duration-500" 
                  style={{ width: `${savingsProgress}%` }}
                />
              </div>
              <span className="text-[10px] font-mono text-emerald-700 font-semibold block text-right">
                {savingsProgress}% dari Target
              </span>
            </div>
          </div>

          {/* Total Pengeluaran Vendor Card */}
          <div className="bg-white p-6 rounded-3xl border border-[#EBE5DA] shadow-md space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-semibold tracking-wider text-[#78736A] uppercase">
                Total Estimasi Rincian
              </span>
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <PieChartIcon className="w-4 h-4" />
              </div>
            </div>
            <p className="font-serif-display text-2xl font-extrabold text-[#2A2421]">
              {formatRp(totalExpenses)}
            </p>
            <div className="text-[11px] text-[#78736A] flex justify-between">
              <span>Lunas: <strong className="text-emerald-700">{formatRp(totalPaid)}</strong></span>
              <span>DP: <strong className="text-amber-700">{formatRp(totalDP)}</strong></span>
            </div>
          </div>

          {/* Sisa Budget Card */}
          <div className="bg-white p-6 rounded-3xl border border-[#EBE5DA] shadow-md space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-semibold tracking-wider text-[#78736A] uppercase">
                Sisa Budget / Margin
              </span>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${remainingBudget >= 0 ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-700"}`}>
                <Coins className="w-4 h-4" />
              </div>
            </div>
            <p className={`font-serif-display text-2xl font-extrabold ${remainingBudget >= 0 ? "text-blue-700" : "text-red-600"}`}>
              {formatRp(remainingBudget)}
            </p>
            <span className="text-[11px] font-medium text-[#78736A] flex items-center gap-1.5">
              {remainingBudget >= 0 ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 inline shrink-0" />
                  <span>Anggaran Masih Aman</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-3.5 h-3.5 text-red-600 inline shrink-0" />
                  <span className="text-red-600 font-semibold">Melebihi Target Budget!</span>
                </>
              )}
            </span>
          </div>

        </div>
      </section>

      {/* ================= 4. TABUNGAN PASANGAN SECTION ================= */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Form Tambah Tabungan */}
          <div className="bg-white p-8 rounded-3xl border border-[#EBE5DA] shadow-xs space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-mono font-semibold tracking-widest text-[#8C5B00] uppercase">
                Input Catatan
              </span>
              <h3 className="font-serif-display text-2xl font-bold text-[#2A2421]">
                + Tambah Tabungan Nikah
              </h3>
            </div>

            <form onSubmit={handleAddSavings} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-[#5A504A] block mb-1">
                  Kontributor / Sumber Dana
                </label>
                <select 
                  value={newSavSource}
                  onChange={(e) => setNewSavSource(e.target.value as any)}
                  className="w-full text-xs border border-[#EBE5DA] rounded-xl px-4 py-3 bg-[#FBF9F5] focus:outline-none focus:border-[#2A2421]"
                >
                  <option value="CPP (Pria)">CPP (Calon Pengantin Pria)</option>
                  <option value="CPW (Wanita)">CPW (Calon Pengantin Wanita)</option>
                  <option value="Bersama">Tabungan Bersama / Bonus</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-[#5A504A] block mb-1">
                  Keterangan / Catatan
                </label>
                <input 
                  type="text" 
                  placeholder="Contoh: Gaji Bulan Jan / Bonus THR"
                  value={newSavNote}
                  onChange={(e) => setNewSavNote(e.target.value)}
                  className="w-full text-xs border border-[#EBE5DA] rounded-xl px-4 py-3 bg-[#FBF9F5] focus:outline-none focus:border-[#2A2421]"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-[#5A504A] block mb-1">
                  Nominal (Rp)
                </label>
                <input 
                  type="number" 
                  placeholder="Contoh: 5000000"
                  value={newSavAmount}
                  onChange={(e) => setNewSavAmount(e.target.value)}
                  className="w-full text-xs border border-[#EBE5DA] rounded-xl px-4 py-3 bg-[#FBF9F5] focus:outline-none focus:border-[#2A2421]"
                />
              </div>

              <button 
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#2A2421] text-white text-xs font-bold tracking-[0.15em] uppercase py-3.5 rounded-xl hover:bg-[#3D332F] transition-all shadow-xs cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Simpan Setoran Tabungan
              </button>
            </form>
          </div>

          {/* List Riwayat Tabungan */}
          <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-[#EBE5DA] shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-mono font-semibold tracking-widest text-[#8C5B00] uppercase">
                  Riwayat Kontribusi
                </span>
                <h3 className="font-serif-display text-2xl font-bold text-[#2A2421]">
                  Catatan Tabungan Pasangan
                </h3>
              </div>
              <span className="text-xs font-mono font-bold bg-[#FBF3DB] px-3.5 py-1 rounded-full text-[#8C5B00]">
                Total: {formatRp(totalSavings)}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#EBE5DA] text-[#78736A] font-mono uppercase">
                    <th className="pb-3 font-semibold">Sumber</th>
                    <th className="pb-3 font-semibold">Keterangan</th>
                    <th className="pb-3 font-semibold">Tanggal</th>
                    <th className="pb-3 font-semibold text-right">Nominal</th>
                    <th className="pb-3 font-semibold text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F2ECE1]">
                  {savings.map((s) => (
                    <tr key={s.id} className="hover:bg-[#FBF9F5]">
                      <td className="py-3.5 font-bold text-[#2A2421]">
                        <span className={`inline-block px-2.5 py-0.5 rounded-md text-[10px] ${
                          s.source.includes("Pria") 
                            ? "bg-blue-50 text-blue-700 border border-blue-200" 
                            : s.source.includes("Wanita") 
                            ? "bg-rose-50 text-rose-700 border border-rose-200" 
                            : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        }`}>
                          {s.source}
                        </span>
                      </td>
                      <td className="py-3.5 text-[#5A504A] font-medium">{s.note}</td>
                      <td className="py-3.5 text-[#78736A] font-mono">{s.date}</td>
                      <td className="py-3.5 font-mono font-bold text-[#2A2421] text-right">
                        {formatRp(s.amount)}
                      </td>
                      <td className="py-3.5 text-center">
                        <button 
                          onClick={() => deleteSavings(s.id)}
                          className="text-gray-400 hover:text-red-600 transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>

      {/* ================= 5. RINCIAN ANGGARAN VENDOR & PENGELUARAN ================= */}
      <section className="bg-[#F3EFE6] py-16 sm:py-24 border-t border-b border-[#EBE5DA]">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 space-y-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-mono font-semibold tracking-widest text-[#8C5B00] uppercase">
                Manajemen Vendor &amp; Biaya
              </span>
              <h2 className="font-serif-display text-3xl sm:text-4xl font-extrabold text-[#2A2421]">
                Rincian Estimasi &amp; Pengeluaran Nikah
              </h2>
              <p className="text-xs text-[#78736A] font-light">
                Klik status pembayaran untuk mengubah antara <span className="font-semibold text-gray-700">Belum</span>, <span className="font-semibold text-amber-700">DP</span>, dan <span className="font-semibold text-emerald-700">Lunas</span>.
              </p>
            </div>

            {/* Quick Add Expense Trigger / Form Inline */}
            <form onSubmit={handleAddExpense} className="bg-white p-4 rounded-2xl border border-[#EBE5DA] flex flex-wrap gap-2 items-center">
              <input 
                type="text" 
                placeholder="Nama Pengeluaran / Vendor"
                value={newExpName}
                onChange={(e) => setNewExpName(e.target.value)}
                className="text-xs border border-[#EBE5DA] rounded-lg px-3 py-2 bg-[#FBF9F5] focus:outline-none"
              />
              <select 
                value={newExpCategory}
                onChange={(e) => setNewExpCategory(e.target.value)}
                className="text-xs border border-[#EBE5DA] rounded-lg px-3 py-2 bg-[#FBF9F5] focus:outline-none"
              >
                <option value="Venue & Catering">Venue &amp; Catering</option>
                <option value="Dekorasi & MUA">Dekorasi &amp; MUA</option>
                <option value="Dokumentasi">Dokumentasi</option>
                <option value="Undangan & Souvenir">Undangan &amp; Souvenir</option>
                <option value="Cincin & Mahar">Cincin &amp; Mahar</option>
                <option value="Lain-lain">Lain-lain</option>
              </select>
              <input 
                type="number" 
                placeholder="Biaya (Rp)"
                value={newExpCost}
                onChange={(e) => setNewExpCost(e.target.value)}
                className="text-xs border border-[#EBE5DA] rounded-lg px-3 py-2 bg-[#FBF9F5] w-32 focus:outline-none"
              />
              <button 
                type="submit" 
                className="bg-[#2A2421] text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-[#3D332F] transition-all"
              >
                + Tambah
              </button>
            </form>
          </div>

          {/* Table Expenses */}
          <div className="bg-white rounded-3xl border border-[#EBE5DA] shadow-sm overflow-hidden p-6 sm:p-8">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#EBE5DA] text-[#78736A] font-mono uppercase">
                    <th className="pb-3 font-semibold">Kategori</th>
                    <th className="pb-3 font-semibold">Item / Vendor</th>
                    <th className="pb-3 font-semibold text-right">Estimasi Biaya</th>
                    <th className="pb-3 font-semibold text-center">Status Bayar</th>
                    <th className="pb-3 font-semibold text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F2ECE1]">
                  {expenses.map((item) => (
                    <tr key={item.id} className="hover:bg-[#FBF9F5]">
                      <td className="py-4 text-[#8C5B00] font-semibold">
                        {item.category}
                      </td>
                      <td className="py-4 font-bold text-[#2A2421]">
                        {item.name}
                      </td>
                      <td className="py-4 font-mono font-bold text-[#2A2421] text-right">
                        {formatRp(item.estimatedCost)}
                      </td>
                      <td className="py-4 text-center">
                        <button
                          onClick={() => toggleExpenseStatus(item.id)}
                          className={`px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide cursor-pointer transition-all ${
                            item.status === "Lunas"
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200"
                              : item.status === "DP"
                              ? "bg-amber-100 text-amber-800 border border-amber-300 hover:bg-amber-200"
                              : "bg-gray-100 text-gray-600 border border-gray-300 hover:bg-gray-200"
                          }`}
                        >
                          {item.status === "Lunas" && (
                            <span className="inline-flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span>Lunas</span>
                            </span>
                          )}
                          {item.status === "DP" && (
                            <span className="inline-flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                              <span>Sudah DP</span>
                            </span>
                          )}
                          {item.status === "Belum" && (
                            <span className="inline-flex items-center gap-1.5">
                              <Circle className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                              <span>Belum Dibayar</span>
                            </span>
                          )}
                        </button>
                      </td>
                      <td className="py-4 text-center">
                        <button 
                          onClick={() => deleteExpense(item.id)}
                          className="text-gray-400 hover:text-red-600 transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>

      {/* ================= 6. PREPARATION TIMELINE CHECKLIST ================= */}
      <section className="max-w-6xl mx-auto px-6 sm:px-12 py-16 sm:py-24 space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-xs font-mono font-semibold tracking-widest text-[#8C5B00] uppercase">
            Persiapan Menuju Hari-H
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-extrabold text-[#2A2421]">
            Checklist Timeline Pernikahan
          </h2>
          <p className="text-xs text-[#78736A] font-light">
            Centang daftar tugas persiapan agar tidak ada detail penting yang terlewat.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {checklists.map((item) => (
            <div 
              key={item.id}
              onClick={() => toggleChecklist(item.id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                item.done 
                  ? "bg-[#FBF3DB]/60 border-[#F5E5B8] text-[#2A2421]" 
                  : "bg-white border-[#EBE5DA] hover:border-[#2A2421]/30"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                  item.done ? "bg-[#2A2421] text-white border-[#2A2421]" : "border-gray-300"
                }`}>
                  {item.done && <CheckCircle2 className="w-4 h-4" />}
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#8C5B00] font-bold block">
                    {item.period}
                  </span>
                  <span className={`text-xs font-medium ${item.done ? "line-through text-[#78736A]" : "text-[#2A2421]"}`}>
                    {item.task}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= 7. CTA UNDANGAN DIGITAL ================= */}
      <section className="blush-gradient py-20 px-6 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-6 relative z-10">

          <h2 className="font-serif-display text-3xl sm:text-5xl font-extrabold text-[#2A2421] tracking-tight">
            Sudah Siap Sebar Undangan Digital?
          </h2>

          <p className="text-xs sm:text-sm text-[#5A504A] leading-relaxed max-w-xl mx-auto font-light">
            Setelah merencanakan budget &amp; vendor, hemat pengeluaran cetak undangan fisik dengan membuat Undangan Digital Magis yang elegan dan ramah kantong.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link 
              to="/#template"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#2A2421] text-white text-xs font-bold tracking-[0.2em] uppercase px-8 py-4 rounded-xl hover:bg-[#3D332F] transition-all shadow-md active:scale-98"
            >
              Lihat Pilihan Templat
            </Link>
          </div>
        </div>
      </section>

      {/* ================= 8. FOOTER ================= */}
      <footer className="bg-[#FBF9F5] border-t border-[#EBE5DA] py-8 text-center text-xs text-[#78736A]">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/assets/transaparanlogo.png" alt="Logo" className="h-6 w-auto brightness-0" />
            <span className="font-serif-display font-bold text-sm text-[#2A2421]">Magis Wedding Planner &amp; Budget Tracker</span>
          </div>
          <p>© 2026 Magis Tech. Aplikasi Tabungan &amp; Budget Pernikahan.</p>
        </div>
      </footer>

    </div>
  )
}
