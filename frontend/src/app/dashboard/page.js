'use client';

import Navbar from '../../components/Navbar';
import ProtectedRoute from '../../components/ProtectedRoute';
import { useAuthStore } from '../../store/authStore';

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);

  return (
    <ProtectedRoute>
      <main>
        <Navbar />
        <section className="mx-auto mt-8 max-w-6xl px-4">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="mt-2 text-slate-600">Secure area powered by JWT authentication.</p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border bg-white p-4">
              <p className="text-sm text-slate-500">Name</p>
              <p className="font-semibold">{user?.name || '-'}</p>
            </div>
            <div className="rounded-lg border bg-white p-4">
              <p className="text-sm text-slate-500">Email</p>
              <p className="font-semibold">{user?.email || '-'}</p>
            </div>
            <div className="rounded-lg border bg-white p-4">
              <p className="text-sm text-slate-500">Role</p>
              <p className="font-semibold">{user?.role || '-'}</p>
            </div>
          </div>
        </section>
      </main>
    </ProtectedRoute>
  );
}
