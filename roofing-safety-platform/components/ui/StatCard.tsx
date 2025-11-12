'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils/helpers';
import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  trend?: {
    value: number;
    label: string;
    positive: boolean;
  };
  color?: string;
  animate?: boolean;
  delay?: number;
}

export function StatCard({
  title,
  value,
  icon,
  trend,
  color = '#3B82F6',
  animate = true,
  delay = 0
}: StatCardProps) {
  const content = (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        {icon && (
          <div
            className="p-2 rounded-lg"
            style={{ backgroundColor: `${color}20` }}
          >
            <div style={{ color }}>{icon}</div>
          </div>
        )}
      </div>
      <div className="flex items-baseline justify-between">
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        {trend && (
          <div className={cn(
            'flex items-center text-sm font-medium',
            trend.positive ? 'text-green-600' : 'text-red-600'
          )}>
            <span className="mr-1">{trend.positive ? '↑' : '↓'}</span>
            <span>{trend.value}%</span>
          </div>
        )}
      </div>
      {trend && (
        <p className="mt-2 text-xs text-gray-500">{trend.label}</p>
      )}
    </div>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
}
