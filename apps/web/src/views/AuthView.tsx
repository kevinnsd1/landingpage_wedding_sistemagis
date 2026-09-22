import React, { useState } from 'react';
import { Lock, Mail, User, ArrowLeft, Eye, EyeOff, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { loginSchema, registerSchema } from '@/schemas/validation';
import { api } from '@/lib/api';

export interface AuthViewProps {
  initialMode?: 'login' | 'register';
  onSuccess: () => void;
  onBackToLanding: () => void;
  onShowToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  onModeChange?: (mode: 'login' | 'register') => void;
}

export function AuthView({
  initialMode = 'login',
  onSuccess,
  onBackToLanding,
  onShowToast,
  onModeChange,
}: AuthViewProps) {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);

  React.useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  // Login form
  const [loginEmail, setLoginEmail] = useState('andi@kisahmagis.id');
  const [loginPassword, setLoginPassword] = useState('rahasia123');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Register form
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [regSlug, setRegSlug] = useState('');

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const validation = loginSchema.safeParse({
      email: loginEmail,
      password: loginPassword,
    });

    if (!validation.success) {
      setError(validation.error.errors[0]?.message || 'Email atau password tidak valid');
      return;
    }

    setIsLoading(true);
    try {
      await api.login(loginEmail, loginPassword);
      setIsLoading(false);
      onShowToast('Berhasil masuk! Selamat datang kembali.', 'success');
      onSuccess();
    } catch (err: any) {
      setIsLoading(false);
      setError(err.message || 'Gagal masuk. Periksa kembali email Anda.');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const validation = registerSchema.safeParse({
      name: regName,
      email: regEmail,
      password: regPassword,
      weddingSlug: regSlug,
    });

    if (!validation.success) {
      setError(validation.error.errors[0]?.message || 'Input tidak valid');
      return;
    }

    setIsLoading(true);
    try {
      await api.register(regName, regEmail, regSlug, regPassword);
      setIsLoading(false);
      onShowToast('Akun pernikahan Anda berhasil dibuat!', 'success');
      onSuccess();
    } catch (err: any) {
      setIsLoading(false);
      setError(err.message || 'Gagal mendaftar. Silakan coba kembali.');
    }
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    try {
      await api.loginDemo();
      setIsLoading(false);
      onShowToast('Masuk dengan akun demo Andi & Sari!', 'info');
      onSuccess();
    } catch (err: any) {
      setIsLoading(false);
      setError(err.message || 'Gagal masuk ke akun demo.');
    }
  };

  return (
    <div className="min-h-screen bg-soft-gradient flex flex-col justify-center items-center p-4 sm:p-6 relative">
      {/* Back button */}
      <button
        onClick={onBackToLanding}
        className="absolute top-6 left-6 flex items-center gap-2 text-xs font-medium text-slate-600 hover:text-slate-950 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:-translate-x-0.5 transition-transform" />
        <span>Kembali ke Beranda</span>
      </button>

      {/* Brand logo */}
      <div
        onClick={onBackToLanding}
        className="flex flex-col items-center mb-8 text-center cursor-pointer group"
      >
        <BrandLogo
          variant="horizontal"
          imgClassName="h-12 group-hover:scale-105 transition-transform duration-200"
          subtitle="Sistemagis Wedding Platform"
          className="items-center text-center"
        />
      </div>

      {/* Card Form */}
      <Card className="w-full max-w-md p-6 sm:p-8 bg-white border border-neutral-200/80 shadow-sm rounded-2xl">
        {/* Mode switcher tabs */}
        <div className="flex items-center gap-1 p-1 bg-neutral-100 rounded-xl mb-6 text-xs font-semibold">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setError('');
              onModeChange?.('login');
            }}
            className={`flex-1 py-2 rounded-lg transition-all ${
              mode === 'login'
                ? 'bg-white text-neutral-900 shadow-2xs font-semibold'
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            Masuk ke Akun
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setError('');
              onModeChange?.('register');
            }}
            className={`flex-1 py-2 rounded-lg transition-all ${
              mode === 'register'
                ? 'bg-white text-neutral-900 shadow-2xs font-semibold'
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            Daftar Baru
          </button>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg mb-5 animate-in fade-in">
            {error}
          </div>
        )}

        {mode === 'login' ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="Email Terdaftar"
              type="email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              placeholder="andi@kisahmagis.id"
              leftIcon={<Mail className="w-4 h-4" />}
              required
            />

            <Input
              label="Kata Sandi"
              type={showLoginPassword ? 'text' : 'password'}
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              placeholder="••••••••"
              leftIcon={<Lock className="w-4 h-4" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  className="p-1 text-neutral-400 hover:text-neutral-600 focus:outline-none"
                  tabIndex={-1}
                >
                  {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
              required
            />

            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isLoading}
              className="w-full mt-2 h-11 text-sm font-medium"
            >
              Masuk
            </Button>

            {/* Quick Demo Login Option */}
            <div className="pt-4 border-t border-neutral-100">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleDemoLogin}
                icon={<Sparkles className="w-4 h-4 text-slate-500" />}
                className="w-full text-xs text-slate-700"
              >
                Masuk Cepat Demo (Andi & Sari)
              </Button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            <Input
              label="Nama Pasangan (Mempelai)"
              value={regName}
              onChange={(e) => setRegName(e.target.value)}
              placeholder="Contoh: Dimas & Arini"
              leftIcon={<User className="w-4 h-4" />}
              required
            />

            <Input
              label="Alamat Email"
              type="email"
              value={regEmail}
              onChange={(e) => setRegEmail(e.target.value)}
              placeholder="dimas.arini@example.com"
              leftIcon={<Mail className="w-4 h-4" />}
              required
            />

            <Input
              label="Kata Sandi (Minimal 8 Karakter)"
              type={showRegPassword ? 'text' : 'password'}
              value={regPassword}
              onChange={(e) => setRegPassword(e.target.value)}
              placeholder="••••••••"
              leftIcon={<Lock className="w-4 h-4" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowRegPassword(!showRegPassword)}
                  className="p-1 text-neutral-400 hover:text-neutral-600 focus:outline-none"
                  tabIndex={-1}
                >
                  {showRegPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
              required
            />

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Alamat Web Undangan (Slug)
              </label>
              <div className="flex items-center">
                <input
                  type="text"
                  value={regSlug}
                  onChange={(e) =>
                    setRegSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))
                  }
                  placeholder="dimas-arini"
                  className="w-full bg-white border border-r-0 border-neutral-200 text-sm px-3.5 py-2.5 rounded-l-md text-neutral-900 focus:outline-none focus:border-neutral-900"
                  required
                />
                <span className="bg-neutral-100 border border-l-0 border-neutral-200 text-xs text-neutral-500 px-3 py-2.5 rounded-r-md select-none">
                  .kisahmagis.id
                </span>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isLoading}
              className="w-full mt-2 h-11 text-sm font-medium"
            >
              Daftar & Buat Pernikahan
            </Button>
          </form>
        )}
      </Card>
    </div>
  );
}
