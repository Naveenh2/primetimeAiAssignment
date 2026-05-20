import Link from 'next/link';
import Navbar from '../components/Navbar';

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h1 className="text-4xl font-bold text-slate-900">PrimeTrade Task Manager</h1>
        <p className="mt-4 max-w-2xl text-slate-600">
          A production-ready full-stack task management platform with secure JWT authentication,
          role-based access control, and scalable backend architecture.
        </p>
        <div className="mt-8 flex gap-4">
          <Link href="/register" className="rounded bg-brand-600 px-5 py-3 text-white">
            Get Started
          </Link>
          <Link href="/login" className="rounded border border-slate-300 px-5 py-3 text-slate-700">
            Login
          </Link>
        </div>
      </section>
    </main>
  );
}
