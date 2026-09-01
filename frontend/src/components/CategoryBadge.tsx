import React from 'react';
import { Tag } from 'lucide-react';

interface CategoryBadgeProps {
  category: string;
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category }) => {
  return (
    <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-950 text-white border border-cyan-500/30">
      <Tag className="w-3 h-3 text-cyan-400" />
      <span>{category}</span>
    </span>
  );
};
