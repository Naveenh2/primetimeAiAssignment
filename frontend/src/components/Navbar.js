'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../store/authStore';

export default function Navbar() {
  const router = useRouter();
  const { user, token, logout } = useAuthStore();

  const onLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header className="border-b bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-semibold text-brand-700">
          PrimeTrade Task Manager
        </Link>
        <div className="flex items-center gap-3 text-sm">
          <Link href="/" className="text-slate-600 hover:text-slate-900">
            Home
          </Link>
          {token ? (
            <>
              <Link href="/dashboard" className="text-slate-600 hover:text-slate-900">
                Dashboard
              </Link>
              <Link href="/tasks" className="text-slate-600 hover:text-slate-900">
                Tasks
              </Link>
              <span className="rounded bg-indigo-50 px-2 py-1 text-indigo-700">
                {user?.role || 'USER'}
              </span>
              <button
                type="button"
                onClick={onLogout}
                className="rounded bg-slate-900 px-3 py-1.5 text-white"
              >
                Logout!
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-slate-600 hover:text-slate-900">
                Login
              </Link>
              <Link href="/register" className="rounded bg-brand-600 px-3 py-1.5 text-white">
                Register!
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
