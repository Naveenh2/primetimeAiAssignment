'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import Navbar from '../../components/Navbar';
import { loginUser } from '../../services/authService';
import { useAuthStore } from '../../store/authStore';

export default function LoginPage() {
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm();
  const setAuth = useAuthStore((state) => state.setAuth);

  const onSubmit = async (values) => {
    try {
      const data = await loginUser(values);
      setAuth(data);
      toast.success('Welcome back');
      router.push('/dashboard');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Login failed');
    }
  };

  return (
    <main>
      <Navbar />
      <section className="mx-auto mt-10 max-w-md rounded-xl border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4">
          <input
            className="w-full rounded border px-3 py-2"
            placeholder="Email"
            {...register('email', { required: true })}
          />
          <input
            type="password"
            className="w-full rounded border px-3 py-2"
            placeholder="Password"
            {...register('password', { required: true })}
          />
          <button
            type="submit"
            disabled={formState.isSubmitting}
            className="w-full rounded bg-brand-600 px-4 py-2 text-white disabled:opacity-70"
          >
            {formState.isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </section>
    </main>
  );
}
