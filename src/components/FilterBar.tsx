import clsx from 'clsx';
import type { FilterType } from '@/types';

type FilterBarProps = {
  filter: FilterType;
  setFilter: (f: FilterType) => void;
};

const FILTERS: { label: string; value: FilterType }[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
];

export default function FilterBar({ filter, setFilter }: FilterBarProps) {
  return (
    <div className="flex gap-2 mb-4">
      {FILTERS.map((f) => (
        <button
          key={f.value}
          onClick={() => setFilter(f.value)}
          className={clsx(
            'px-4 py-1.5 rounded-full text-sm font-medium transition-all',
            filter === f.value
              ? 'bg-indigo-500 text-white shadow'
              : 'bg-white text-slate-500 hover:bg-indigo-50'
          )}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
