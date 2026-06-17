import { CheckCircle2, Circle } from 'lucide-react';

type StatsBarProps = {
  activeCount: number;
  completedCount: number;
};

export default function StatsBar({ activeCount, completedCount }: StatsBarProps) {
  return (
    <div className="flex gap-4 mb-4">
      <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2 shadow-sm text-sm text-slate-600">
        <Circle size={16} className="text-indigo-400" />
        <span><strong>{activeCount}</strong> active</span>
      </div>
      <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2 shadow-sm text-sm text-slate-600">
        <CheckCircle2 size={16} className="text-emerald-400" />
        <span><strong>{completedCount}</strong> completed</span>
      </div>
    </div>
  );
}
