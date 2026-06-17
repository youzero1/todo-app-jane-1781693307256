import { useState } from 'react';
import { Trash2, Pencil, Check, X } from 'lucide-react';
import clsx from 'clsx';
import type { Todo, Priority } from '@/types';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
};

const priorityDot: Record<Priority, string> = {
  low: 'bg-emerald-400',
  medium: 'bg-amber-400',
  high: 'bg-rose-400',
};

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText);
    }
    setEditing(false);
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') handleCancel();
  };

  return (
    <li
      className={clsx(
        'bg-white rounded-2xl shadow-sm px-4 py-3 flex items-center gap-3 group transition-all hover:shadow-md',
        todo.completed && 'opacity-60'
      )}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className={clsx(
          'w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors',
          todo.completed
            ? 'bg-indigo-500 border-indigo-500'
            : 'border-slate-300 hover:border-indigo-400'
        )}
      >
        {todo.completed && <Check size={12} color="white" strokeWidth={3} />}
      </button>

      {/* Priority dot */}
      <span
        className={clsx('w-2 h-2 rounded-full flex-shrink-0', priorityDot[todo.priority])}
        title={`Priority: ${todo.priority}`}
      />

      {/* Text / Edit */}
      {editing ? (
        <input
          autoFocus
          value={editText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 px-2 py-1 rounded-lg border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm text-slate-700"
        />
      ) : (
        <span
          className={clsx(
            'flex-1 text-sm text-slate-700',
            todo.completed && 'line-through text-slate-400'
          )}
        >
          {todo.text}
        </span>
      )}

      {/* Actions */}
      <div className="flex items-center gap-1 ml-auto">
        {editing ? (
          <>
            <button
              onClick={handleSave}
              className="p-1.5 rounded-lg text-emerald-500 hover:bg-emerald-50 transition-colors"
              title="Save"
            >
              <Check size={15} />
            </button>
            <button
              onClick={handleCancel}
              className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 transition-colors"
              title="Cancel"
            >
              <X size={15} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setEditing(true)}
              className="p-1.5 rounded-lg text-slate-300 hover:text-indigo-500 hover:bg-indigo-50 opacity-0 group-hover:opacity-100 transition-all"
              title="Edit"
            >
              <Pencil size={15} />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="p-1.5 rounded-lg text-slate-300 hover:text-rose-500 hover:bg-rose-50 opacity-0 group-hover:opacity-100 transition-all"
              title="Delete"
            >
              <Trash2 size={15} />
            </button>
          </>
        )}
      </div>
    </li>
  );
}
