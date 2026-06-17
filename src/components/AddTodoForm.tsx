import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import clsx from 'clsx';
import type { Priority } from '@/types';

type AddTodoFormProps = {
  onAdd: (text: string, priority: Priority) => void;
};

const PRIORITIES: Priority[] = ['low', 'medium', 'high'];

const priorityColors: Record<Priority, string> = {
  low: 'bg-emerald-100 text-emerald-700 border-emerald-300',
  medium: 'bg-amber-100 text-amber-700 border-amber-300',
  high: 'bg-rose-100 text-rose-700 border-rose-300',
};

export default function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text, priority);
    setText('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-lg p-4 flex flex-col gap-3 mb-4"
    >
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-1 px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-slate-700 placeholder-slate-400 text-sm"
        />
        <button
          type="submit"
          className="flex items-center gap-1 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-xl font-semibold text-sm transition-colors shadow"
        >
          <PlusCircle size={16} />
          Add
        </button>
      </div>
      <div className="flex gap-2 items-center">
        <span className="text-xs text-slate-400 font-medium">Priority:</span>
        {PRIORITIES.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setPriority(p)}
            className={clsx(
              'px-3 py-1 rounded-full text-xs font-semibold border transition-all',
              priorityColors[p],
              priority === p ? 'ring-2 ring-offset-1 ring-indigo-400 scale-105' : 'opacity-60 hover:opacity-90'
            )}
          >
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
      </div>
    </form>
  );
}
