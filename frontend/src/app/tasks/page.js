'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import Navbar from '../../components/Navbar';
import ProtectedRoute from '../../components/ProtectedRoute';
import { createTask, deleteTask, getTasks, updateTask } from '../../services/taskService';

const defaultValues = {
  title: '',
  description: '',
  status: 'TODO',
  priority: 'MEDIUM'
};

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const { register, handleSubmit, reset, formState } = useForm({ defaultValues });

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await getTasks();
      setTasks(data);
    } catch (_error) {
      toast.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const onSubmit = async (values) => {
    try {
      if (editingTaskId) {
        await updateTask(editingTaskId, values);
        toast.success('Task updated');
      } else {
        await createTask(values);
        toast.success('Task created');
      }
      setEditingTaskId(null);
      reset(defaultValues);
      fetchTasks();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Task operation failed');
    }
  };

  const onEdit = (task) => {
    setEditingTaskId(task.id);
    reset({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority
    });
  };

  const onDelete = async (id) => {
    try {
      await deleteTask(id);
      toast.success('Task deleted');
      fetchTasks();
    } catch (_error) {
      toast.error('Failed to delete task');
    }
  };

  return (
    <ProtectedRoute>
      <main>
        <Navbar />
        <section className="mx-auto mt-8 grid max-w-6xl gap-6 px-4 md:grid-cols-2">
          <div className="rounded-xl border bg-white p-5">
            <h2 className="text-xl font-semibold">{editingTaskId ? 'Edit Task' : 'Create Task'}</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-3">
              <input
                className="w-full rounded border px-3 py-2"
                placeholder="Task title"
                {...register('title', { required: true })}
              />
              <textarea
                className="w-full rounded border px-3 py-2"
                placeholder="Description"
                {...register('description', { required: true })}
              />
              <div className="grid grid-cols-2 gap-3">
                <select className="rounded border px-3 py-2" {...register('status')}>
                  <option value="TODO">TODO</option>
                  <option value="IN_PROGRESS">IN_PROGRESS</option>
                  <option value="DONE">DONE</option>
                </select>
                <select className="rounded border px-3 py-2" {...register('priority')}>
                  <option value="LOW">LOW</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="HIGH">HIGH</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={formState.isSubmitting}
                className="w-full rounded bg-brand-600 px-4 py-2 text-white"
              >
                {formState.isSubmitting
                  ? 'Saving...'
                  : editingTaskId
                    ? 'Update Task'
                    : 'Create Task'}
              </button>
            </form>
          </div>
          <div className="rounded-xl border bg-white p-5">
            <h2 className="text-xl font-semibold">Task List</h2>
            {loading ? (
              <p className="mt-4 text-slate-600">Loading tasks...</p>
            ) : tasks.length === 0 ? (
              <p className="mt-4 text-slate-600">No tasks available.</p>
            ) : (
              <div className="mt-4 space-y-3">
                {tasks.map((task) => (
                  <div key={task.id} className="rounded border p-3">
                    <p className="font-semibold">{task.title}</p>
                    <p className="text-sm text-slate-600">{task.description}</p>
                    <p className="mt-2 text-xs text-slate-500">
                      {task.status} | {task.priority}
                    </p>
                    <div className="mt-3 flex gap-2">
                      <button
                        type="button"
                        className="rounded border px-3 py-1 text-sm"
                        onClick={() => onEdit(task)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="rounded bg-red-600 px-3 py-1 text-sm text-white"
                        onClick={() => onDelete(task.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </ProtectedRoute>
  );
}
